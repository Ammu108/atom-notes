import { generateSlug } from "@repo/shared";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { notesRepository } from "../repositories/notes-repositary";
import { notesService } from "../services/notes-service";
import { notesSchema } from "../validators/notes-validators";

export const notesRouter = createTRPCRouter({
	createNote: publicProcedure
		.input(notesSchema)
		.mutation(async ({ input, ctx }) => {
			// admin check
			if (!ctx.user || ctx.user.role !== "admin") {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "Only admins can create notes!",
				});
			}

			// check if unit exists
			const isUnitExist = await ctx.db.query.chapters.findFirst({
				where: (chapter, { eq }) => eq(chapter.id, input.chapterId),
			});

			if (!isUnitExist) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Unit not found!",
				});
			}

			const slug = generateSlug(input.title);

			// duplicate check by slug and chapterId
			const existingNote = await notesRepository.findNoteBySlugAndChapterId(
				ctx.db,
				slug,
				input.chapterId,
			);

			if (existingNote) {
				throw new TRPCError({
					code: "CONFLICT",
					message: "Note already exists!",
				});
			}

			const notes = await notesService.createNotes(input, ctx.db);

			return notes;
		}),

	getAllNotes: publicProcedure.query(async ({ ctx }) => {
		const notes = await notesRepository.getAllNotes(ctx.db);

		return notes;
	}),
});
