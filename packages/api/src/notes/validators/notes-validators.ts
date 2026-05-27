import { z } from "zod";

export const notesSchema = z.object({
	chapterId: z.string(),
	title: z
		.string()
		.min(1, "Title is required")
		.max(255, "Title must be at most 255 characters"),
	slug: z
		.string()
		.min(1, "Slug is required")
		.max(500, "Slug must be at most 500 characters"),
	metaTitle: z.string().max(70, "Meta title must be at most 70 characters"),
	metaDescription: z
		.string()
		.max(160, "Meta description must be at most 160 characters"),
});
