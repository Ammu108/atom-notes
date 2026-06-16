import { chapters, type DB, notes, subjects } from "@repo/db";
import { and, desc, eq } from "drizzle-orm";
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

	async update(db: DB, id: string, data: NoteType) {
		return await db.transaction(async (tx) => {
			const [updateNotes] = await tx
				.update(notes)
				.set(data)
				.where(eq(notes.id, id))
				.returning();

			if (!updateNotes) {
				throw new Error("Failed to update note!");
			}

			return updateNotes;
		});
	},

	async getNotesById(db: DB, id: string) {
		const [note] = await db
			.select({
				id: notes.id,
				title: notes.title,
				metaTitle: notes.metaTitle,
				metaDescription: notes.metaDescription,
				chapterId: notes.chapterId,
				unitName: chapters.name,
				content: notes.content,
				pdfUrl: notes.pdfUrl,
				pdfKey: notes.pdfKey,
				pdfPrice: notes.price,
				isPaid: notes.isPaid,
			})
			.from(notes)
			.where(eq(notes.id, id))
			.innerJoin(chapters, eq(notes.chapterId, chapters.id))
			.limit(1);

		return note;
	},

	async getAllNotes(db: DB) {
		return await db
			.select({
				id: notes.id,
				title: notes.title,
				chapter: chapters.name,
				subject: subjects.name,
				UpdatedAt: notes.updatedAt,
			})
			.from(notes)
			.innerJoin(chapters, eq(notes.chapterId, chapters.id))
			.innerJoin(subjects, eq(chapters.subjectId, subjects.id))
			.orderBy(desc(notes.updatedAt));
	},

	async deleteNote(db: DB, id: string) {
		return await db.transaction(async (tx) => {
			const noteExist = await tx.query.notes.findFirst({
				where: (notes, { eq }) => eq(notes.id, id),
			});

			if (!noteExist) {
				throw new Error("Note not found");
			}

			const [deleteNote] = await tx
				.delete(notes)
				.where(eq(notes.id, id))
				.returning({ id: notes.id });

			if (!deleteNote) {
				throw new Error("Failed to delete note");
			}

			return {
				message: "Note deleted successfully!",
				note: deleteNote,
			};
		});
	},
};
