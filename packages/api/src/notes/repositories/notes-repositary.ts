import { type DB, notes } from "@repo/db";
import { and, eq } from "drizzle-orm";
import type { NoteType } from "../types";

export const notesRepository = {
	async findNoteBySlugAndChapterId(db: DB, slug: string, chapterId: string) {
		const [note] = await db
			.select()
			.from(notes)
			.where(and(eq(notes.slug, slug), eq(notes.chapterId, chapterId)))
			.limit(1);

		return note;
	},

	async create(db: DB, data: NoteType) {
		return await db.transaction(async (tx) => {
			const [createNotes] = await tx.insert(notes).values(data).returning();

			if (!createNotes) {
				throw new Error("Failed to create note");
			}

			return createNotes;
		});
	},
};
