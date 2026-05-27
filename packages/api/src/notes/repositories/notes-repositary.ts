import { type DB, notes } from "@repo/db";
import { eq } from "drizzle-orm";
import type { NoteType } from "../types";

export const notesRepository = {
	async findBySlug(db: DB, slug: string) {
		return await db.select().from(notes).where(eq(notes.slug, slug)).limit(1);
	},

	async create(db: DB, data: NoteType) {
		return await db.transaction(async (tx) => {
			const [createNotes] = await tx.insert(notes).values(data).returning({
				id: notes.id,
				slug: notes.slug,
				title: notes.title,
				metaTitle: notes.metaTitle,
				metaDescription: notes.metaDescription,
			});

			if (!createNotes) {
				throw new Error("Failed to create note");
			}
		});
	},
};
