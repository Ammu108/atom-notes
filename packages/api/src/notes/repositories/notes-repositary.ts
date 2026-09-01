import {
	courses,
	type DB,
	notes,
	notesPurchases,
	semesters,
	subjects,
	unit,
} from "@repo/db";
import { generateSlug } from "@repo/shared";
import { TRPCError } from "@trpc/server";
import { and, desc, eq, ilike, or, sql } from "drizzle-orm";
import { notesPaymentRepository } from "../../notes-payment/repositories/notes-payment-repository";
import type { NoteType } from "../types";

export const notesRepository = {
	async findNoteBySlugAndUnitId(db: DB, slug: string, unitId: string) {
		const [note] = await db
			.select()
			.from(notes)
			.where(and(eq(notes.slug, slug), eq(notes.unitId, unitId)))
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
				unitId: notes.unitId,
				unitName: unit.name,
				content: notes.content,
				pdfUrl: notes.pdfUrl,
				pdfKey: notes.pdfKey,
				pdfPrice: notes.price,
				isPaid: notes.isPaid,
				price: notes.price,
				course: courses.name,
				semester: semesters.number,
				subject: subjects.name,
				createdAt: notes.createdAt,
				updatedAt: notes.updatedAt,
			})
			.from(notes)
			.where(eq(notes.id, id))
			.innerJoin(unit, eq(notes.unitId, unit.id))
			.innerJoin(subjects, eq(unit.subjectId, subjects.id))
			.innerJoin(semesters, eq(subjects.semesterId, semesters.id))
			.innerJoin(courses, eq(semesters.courseId, courses.id))
			.limit(1);

		return note;
	},

	async getPurchasedNotesByUserId(db: DB, id?: string) {
		const result = await db
			.select({
				id: notesPurchases.id,
				title: notes.title,
				course: courses.name,
				semester: semesters.number,
				subject: subjects.name,
				amountPaid: notesPurchases.amount,
				purchasesAt: notesPurchases.createdAt,
				status: notesPurchases.status,
				price: notes.price,
				slug: notes.slug,
			})
			.from(notesPurchases)
			.innerJoin(notes, eq(notesPurchases.noteId, notes.id))
			.leftJoin(unit, eq(notes.unitId, unit.id))
			.leftJoin(subjects, eq(unit.subjectId, subjects.id))
			.leftJoin(semesters, eq(subjects.semesterId, semesters.id))
			.leftJoin(courses, eq(semesters.courseId, courses.id))
			.where(id ? eq(notesPurchases.userId, id) : undefined);

		return result;
	},

	async getNotesBySlug(db: DB, userId: string | undefined, slug: string) {
		const [note] = await db
			.select({
				id: notes.id,
				semester: semesters.number,
				subject: subjects.name,
				title: notes.title,
				metaTitle: notes.metaTitle,
				metaDescription: notes.metaDescription,
				unitId: notes.unitId,
				unitName: unit.name,
				content: notes.content,
				pdfUrl: notes.pdfUrl,
				pdfKey: notes.pdfKey,
				pdfPrice: notes.price,
				isPaid: notes.isPaid,
			})
			.from(notes)
			.where(eq(notes.slug, slug))
			.innerJoin(unit, eq(notes.unitId, unit.id))
			.innerJoin(subjects, eq(unit.subjectId, subjects.id))
			.innerJoin(semesters, eq(subjects.semesterId, semesters.id))
			.limit(1);

		const hasPurchased =
			note?.isPaid && userId
				? await notesPaymentRepository.hasPurchased(userId, note.id, db)
				: false;

		if (!note) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "Note not found!",
			});
		}

		return {
			...note,
			hasPurchased,
		};
	},

	async getAllNotesAdmin(db: DB) {
		const result = await db
			.select({
				id: notes.id,
				slug: notes.slug,
				title: notes.title,
				description: notes.metaDescription,
				chapter: unit.name,
				subject: subjects.name,
				semester: semesters.number,
				UpdatedAt: notes.updatedAt,
			})
			.from(notes)
			.innerJoin(unit, eq(notes.unitId, unit.id))
			.innerJoin(subjects, eq(unit.subjectId, subjects.id))
			.innerJoin(semesters, eq(subjects.semesterId, semesters.id))
			.orderBy(desc(notes.updatedAt));

		return result;
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
				chapter: unit.name,
				subject: subjects.name,
				semester: semesters.number,
				UpdatedAt: notes.updatedAt,
			})
			.from(notes)
			.innerJoin(unit, eq(notes.unitId, unit.id))
			.innerJoin(subjects, eq(unit.subjectId, subjects.id))
			.innerJoin(semesters, eq(subjects.semesterId, semesters.id))
			.innerJoin(courses, eq(courses.id, semesters.courseId))
			.where(conditions.length > 0 ? and(...conditions) : undefined)
			.orderBy(desc(notes.updatedAt));

		return result;
	},

	async getStats(db: DB, noteId: string) {
		const [stats] = await db
			.select({
				revenue: sql<number>`COALESCE(SUM(${notesPurchases.amount}),0)`,
				totalPurchases: sql<number>`COUNT(*)`,
			})
			.from(notesPurchases)
			.where(
				and(
					eq(notesPurchases.noteId, noteId),
					eq(notesPurchases.status, "PAID"),
				),
			);

		return stats;
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
