import type { DB } from "@repo/db";
import { generateSlug } from "@repo/shared";
import type { z } from "zod";
import { notesRepository } from "../repositories/notes-repositary";
import type { notesSchema } from "../validators/notes-validators";

export const notesService = {
	async createNotes(input: z.infer<typeof notesSchema>, db: DB) {
		const generatedSlug = generateSlug(input.slug);

		const notes = await notesRepository.create(db, {
			title: input.title,
			slug: generatedSlug,
			metaTitle: input.metaTitle,
			metaDescription: input.metaDescription,
			chapterId: input.chapterId,
		});

		return notes;
	},
};
