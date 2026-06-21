import { z } from "zod";

export const notesSchema = z.object({
	id: z.string(),
	chapterId: z.string(),
	title: z
		.string()
		.min(1, "Title is required")
		.max(255, "Title must be at most 255 characters"),
	metaTitle: z.string().max(70, "Meta title must be at most 70 characters"),
	editorContent: z.any(),
	metaDescription: z
		.string()
		.max(160, "Meta description must be at most 160 characters"),
	content: z.any(),
	pdfUrl: z.string().url().optional().nullable(),
	pdfKey: z.string().optional().nullable(),
	isPaid: z.boolean(),
	price: z.number().min(0, "Price must be a positive number"),
});

export type NotesInput = z.infer<typeof notesSchema>;

export const noteIdSchema = z.object({
	id: z.string(),
});
