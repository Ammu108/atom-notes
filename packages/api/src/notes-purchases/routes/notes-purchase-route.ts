import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
	adminProcedure,
	createTRPCRouter,
	protectedProcedure,
} from "../../trpc";
import { notesPurchaseRepository } from "../repositories/notes-purchase-repository";

export const notesPurchaseRouter = createTRPCRouter({
	getAllPurchases: adminProcedure.query(async ({ ctx }) => {
		return await notesPurchaseRepository.getPurchases(ctx.db);
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

			const purchaseDetails = await notesPurchaseRepository.purchaseDetailsId(
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

			const purchases = await notesPurchaseRepository.getAllPurchasesByNote(
				input.id,
				ctx.db,
			);

			return purchases;
		}),

	getAllPurchasesByUserId: adminProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ input, ctx }) => {
			const isUserExist = await ctx.db.query.user.findFirst({
				where: (currentUser, { eq }) => eq(currentUser.id, input.id),
			});

			if (!isUserExist) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "User not found!",
				});
			}

			const purchases = await notesPurchaseRepository.getAllPurchasesByUserId(
				input.id,
				ctx.db,
			);

			return purchases;
		}),

	// get all purchases by user id for user on web
	getAllPurchasesByUser: protectedProcedure.query(async ({ ctx }) => {
		// user exist or not
		const userId = ctx.session.user.id;
		const isUserExist = await ctx.db.query.user.findFirst({
			where: (user, { eq }) => eq(user.id, userId),
		});

		if (!isUserExist) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "User not found!",
			});
		}

		const purchases = await notesPurchaseRepository.getAllPurchasesByUser(
			userId,
			ctx.db,
		);

		return purchases;
	}),
});
