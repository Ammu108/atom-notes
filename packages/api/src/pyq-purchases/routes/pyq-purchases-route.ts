import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { adminProcedure, createTRPCRouter } from "../../trpc";
import { pyqPurchaseRepository } from "../repositories/pyq-purchase-repository";

export const pyqPurchaseRouter = createTRPCRouter({
	getAllPurchases: adminProcedure.query(async ({ ctx }) => {
		return await pyqPurchaseRepository.getPurchases(ctx.db);
	}),

	purchaseDetailsId: adminProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ input, ctx }) => {
			// purchase exist or not
			const isPurchaseExist = await ctx.db.query.pyqPurchases.findFirst({
				where: (purchase, { eq }) => eq(purchase.id, input.id),
			});

			if (!isPurchaseExist) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Purchase not found!",
				});
			}

			const purchaseDetails = await pyqPurchaseRepository.purchaseDetailsId(
				input.id,
				ctx.db,
			);

			return purchaseDetails;
		}),

	getAllPurchasesByPyqId: adminProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ input, ctx }) => {
			// purchase exist or not
			const isPyqExist = await ctx.db.query.pyqs.findFirst({
				where: (pyq, { eq }) => eq(pyq.id, input.id),
			});

			if (!isPyqExist) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Pyq not found!",
				});
			}

			const purchases = await pyqPurchaseRepository.getAllPurchasesByPyq(
				input.id,
				ctx.db,
			);

			return purchases;
		}),

	getAllPurchasesByUserId: adminProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ input, ctx }) => {
			// purchase exist or not
			const isUserExist = await ctx.db.query.user.findFirst({
				where: (user, { eq }) => eq(user.id, input.id),
			});

			if (!isUserExist) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "User not found!",
				});
			}

			const purchases = await pyqPurchaseRepository.getAllPurchasesByUserId(
				input.id,
				ctx.db,
			);

			return purchases;
		}),
});
