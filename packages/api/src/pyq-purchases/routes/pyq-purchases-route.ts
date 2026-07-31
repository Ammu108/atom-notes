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
			const isPurchaseExist = await ctx.db.query.notesPurchases.findFirst({
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

	getAllPurchasesByNoteId: adminProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ input, ctx }) => {
			// purchase exist or not
			const isNoteExist = await ctx.db.query.notes.findFirst({
				where: (note, { eq }) => eq(note.id, input.id),
			});

			if (!isNoteExist) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Note not found!",
				});
			}

			const purchases = await pyqPurchaseRepository.getAllPurchasesByNote(
				input.id,
				ctx.db,
			);

			return purchases;
		}),
});
