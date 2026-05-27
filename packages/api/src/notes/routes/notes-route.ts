import { normalizeString } from "@repo/shared";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { notesRepository } from "../repositories/notes-repositary";
import { notesService } from "../services/notes-service";
import { notesSchema } from "../validators/notes-validators";

export const notesRouter = createTRPCRouter({
	createNote: publicProcedure
		.input(notesSchema)
		.mutation(async ({ input, ctx }) => {
			const normalizedName = normalizeString(input.title);

			const isSlugExist = await notesRepository.findBySlug(
				ctx.db,
				normalizedName,
			);

			if (isSlugExist.length > 0) {
				throw new Error("Notes with this name Or Slug already exists!");
			}

			const notes = await notesService.createNotes(input, ctx.db);

			return notes;
		}),
});
