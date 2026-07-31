import crypto from "node:crypto";
import { createOrderSchema } from "@repo/validators";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { notesRepository } from "../../notes/repositories/notes-repositary";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { razorPay } from "../lib/razorpay";
import { pyqPaymentRepository } from "../repositories/pyq-payment-repository";
import { pyqPaymentService } from "../services/pyq-payment-service";

export const pyqPaymentRouter = createTRPCRouter({
	createOrder: protectedProcedure
		.input(createOrderSchema)
		.mutation(async ({ input, ctx }) => {
			// pyq exist or not
			const isPyqExist = await ctx.db.query.notes.findFirst({
				where: (note, { eq }) => eq(note.id, input.noteId),
			});

			if (!isPyqExist) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Note not found!",
				});
			}

			if (!isPyqExist.isPaid) {
				throw new TRPCError({
					code: "CONFLICT",
					message: "Note is free.",
				});
			}

			const userId = ctx.session.user.id;

			// Already purchased?
			const alreadyPurchased = await pyqPaymentRepository.hasPurchased(
				userId,
				input.noteId,
				ctx.db,
			);

			if (alreadyPurchased) {
				throw new TRPCError({
					code: "CONFLICT",
					message: "Note is already purchased!",
				});
			}

			const order = await pyqPaymentService.createOrder({
				amount: isPyqExist.price,
			});

			await pyqPaymentRepository.createPendingPurchase(ctx.db, {
				userId: userId,
				noteId: input.noteId,
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

	downloadNote: protectedProcedure
		.input(z.object({ noteId: z.string() }))
		.mutation(async ({ input, ctx }) => {
			const note = await notesRepository.getNotesById(ctx.db, input.noteId);

			if (!note) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Note not found",
				});
			}

			// Free note
			if (!note.isPaid) {
				return {
					url: note.pdfUrl,
				};
			}

			const purchased = await pyqPaymentRepository.hasPurchased(
				ctx.session.user.id,
				note.id,
				ctx.db,
			);

			if (!purchased) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "Purchase required",
				});
			}

			return {
				url: note.pdfUrl,
				message: "Note downloaded successfully",
			};
		}),
});
