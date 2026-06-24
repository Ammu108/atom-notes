import {
	chapters,
	courses,
	type DB,
	notes,
	semesters,
	subjects,
} from "@repo/db";
import { generateSlug } from "@repo/shared";
import { and, desc, eq, ilike, or } from "drizzle-orm";
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

	async getNotesBySlug(db: DB, slug: string) {
		const [note] = await db
			.select({
				id: notes.id,
				semester: semesters.number,
				subject: subjects.name,
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
			.where(eq(notes.slug, slug))
			.innerJoin(chapters, eq(notes.chapterId, chapters.id))
			.innerJoin(subjects, eq(chapters.subjectId, subjects.id))
			.innerJoin(semesters, eq(subjects.semesterId, semesters.id))
			.limit(1);

		return note;
	},

	async getAllNotes(
		db: DB,
		input?: {
			search?: string;
			course?: string;
			semester?: string;
			subject?: string;
		},
	) {
		const conditions = [];

		if (input?.search?.trim()) {
			conditions.push(
				or(
					ilike(notes.title, `%${input.search.trim()}%`),
					ilike(notes.slug, `%${input.search.trim()}%`),
				),
			);
		}

		if (input?.course) {
			const normalizeCourseName = generateSlug(input.course);
			conditions.push(eq(courses.slug, normalizeCourseName));
		}

		if (input?.semester) {
			conditions.push(eq(semesters.number, input.semester));
		}

		if (input?.subject) {
			conditions.push(eq(subjects.name, input.subject));
		}

		const result = await db
			.select({
				id: notes.id,
				slug: notes.slug,
				title: notes.title,
				description: notes.metaDescription,
				chapter: chapters.name,
				subject: subjects.name,
				semester: semesters.number,
				UpdatedAt: notes.updatedAt,
			})
			.from(notes)
			.innerJoin(chapters, eq(notes.chapterId, chapters.id))
			.innerJoin(subjects, eq(chapters.subjectId, subjects.id))
			.innerJoin(semesters, eq(subjects.semesterId, semesters.id))
			.innerJoin(courses, eq(courses.id, semesters.courseId))
			.where(conditions.length > 0 ? and(...conditions) : undefined)
			.orderBy(desc(notes.updatedAt));

		return result;
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
