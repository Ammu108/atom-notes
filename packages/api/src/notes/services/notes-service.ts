import type { DB } from "@repo/db";
import { generateSlug } from "@repo/shared";
import type { z } from "zod";
import { notesRepository } from "../repositories/notes-repositary";
import type { notesSchema } from "../validators/notes-validators";

export const notesService = {
	async createNotes(input: z.infer<typeof notesSchema>, db: DB) {
		const generatedSlug = generateSlug(input.title);

		const notes = await notesRepository.create(db, {
			chapterId: input.chapterId,
			slug: generatedSlug,
			title: input.title,
			metaTitle: input.metaTitle,
			metaDescription: input.metaDescription,
			content: input.editorContent,
			pdfUrl: input.pdfUrl,
			pdfKey: input.pdfKey,
			isPaid: input.isPaid,
			price: input.price.toString(),
		});

		return notes;
	},

	async updateNote(input: z.infer<typeof notesSchema>, db: DB, id: string) {
		const generatedSlug = generateSlug(input.title);

		const notes = await notesRepository.update(db, id, {
			chapterId: input.chapterId,
			slug: generatedSlug,
			title: input.title,
			metaTitle: input.metaTitle,
			metaDescription: input.metaDescription,
			content: input.editorContent,
			pdfUrl: input.pdfUrl,
			pdfKey: input.pdfKey,
			isPaid: input.isPaid,
			price: input.price.toString(),
		});

		console.log("DB update complete");

		return notes;
	},
};
