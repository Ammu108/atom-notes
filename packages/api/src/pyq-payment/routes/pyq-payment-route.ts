import crypto from "node:crypto";
import { pyqDownloads } from "@repo/db";
import { createOrderSchema } from "@repo/validators";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { pyqRepository } from "../../pyqs/repositories/pyqs-repository";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { razorPay } from "../lib/razorpay";
import { pyqPaymentRepository } from "../repositories/pyq-payment-repository";
import { pyqPaymentService } from "../services/pyq-payment-service";

export const pyqPaymentRouter = createTRPCRouter({
	createOrder: protectedProcedure
		.input(createOrderSchema)
		.mutation(async ({ input, ctx }) => {
			// pyq exist or not
			const isPyqExist = await ctx.db.query.pyqs.findFirst({
				where: (note, { eq }) => eq(note.id, input.id),
			});

			if (!isPyqExist) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Pyq not found!",
				});
			}

			if (!isPyqExist.isPaid) {
				throw new TRPCError({
					code: "CONFLICT",
					message: "Pyq is free.",
				});
			}

			const userId = ctx.session.user.id;

			// Already purchased?
			const alreadyPurchased = await pyqPaymentRepository.hasPurchased(
				userId,
				input.id,
				ctx.db,
			);

			if (alreadyPurchased) {
				throw new TRPCError({
					code: "CONFLICT",
					message: "Pyq is already purchased!",
				});
			}

			const order = await pyqPaymentService.createOrder({
				amount: isPyqExist.price,
			});

			await pyqPaymentRepository.createPendingPurchase(ctx.db, {
				userId: userId,
				pyqId: input.id,
				amount: isPyqExist.price,
				orderId: order.id,
			});

			return {
				orderId: order.id,
				amount: order.amount,
				currency: order.currency,
				message: "Order created successfully.",
			};
		}),

	verifyPayment: protectedProcedure
		.input(
			z.object({
				razorpay_order_id: z.string(),
				razorpay_payment_id: z.string(),
				razorpay_signature: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const body = `${input.razorpay_order_id}|${input.razorpay_payment_id}`;

			const purchase = await pyqPaymentRepository.findByOrderId(
				input.razorpay_order_id,
				ctx.db,
			);

			if (!purchase) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Purchase not found",
				});
			}

			if (purchase.userId !== ctx.session.user.id) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "Unauthorized",
				});
			}

			if (purchase.status === "PAID") {
				throw new TRPCError({
					code: "CONFLICT",
					message: "Already verified",
				});
			}

			const razorPayKeySecret = process.env.RAZORPAY_KEY_SECRET;

			if (!razorPayKeySecret) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Razorpay key secret is not set in environment variables",
				});
			}

			const expectedSignature = crypto
				.createHmac("sha256", razorPayKeySecret)
				.update(body)
				.digest("hex");

			const isValid = expectedSignature === input.razorpay_signature;

			if (!isValid) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Payment verification failed",
				});
			}

			const payment = await razorPay.payments.fetch(input.razorpay_payment_id);

			if (
				payment.status !== "captured" ||
				payment.order_id !== input.razorpay_order_id
			) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Payment could not be verified.",
				});
			}

			await pyqPaymentRepository.markAsPaid(
				{
					orderId: input.razorpay_order_id,
					paymentId: input.razorpay_payment_id,
					paymentMethod: payment.method,
				},
				ctx.db,
			);

			return {
				Success: true,
				message: "Payment verified successfully",
			};
		}),

	downloadPyq: protectedProcedure
		.input(z.object({ pyqId: z.string() }))
		.mutation(async ({ input, ctx }) => {
			const userId = ctx.session.user.id;
			const pyq = await pyqRepository.getPyqsById(ctx.db, userId, input.pyqId);

			if (!pyq) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Pyq not found",
				});
			}

			// Free note
			if (!pyq.isPaid) {
				return {
					url: pyq.pdfUrl,
				};
			}

			const purchased = await pyqPaymentRepository.hasPurchased(
				ctx.session.user.id,
				pyq.id,
				ctx.db,
			);

			if (!purchased) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "Purchase required",
				});
			}

			// Record first download only
			await ctx.db
				.insert(pyqDownloads)
				.values({
					pyqId: input.pyqId,
					userId: ctx.session.user.id,
				})
				.onConflictDoNothing({
					target: [pyqDownloads.userId, pyqDownloads.pyqId],
				});

			return {
				url: pyq.pdfUrl,
				message: "Pyq downloaded successfully",
			};
		}),
});
