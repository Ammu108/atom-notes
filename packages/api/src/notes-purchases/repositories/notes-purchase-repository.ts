import {
	courses,
	type DB,
	notes,
	notesPurchases,
	pyqPurchases,
	semesters,
	subjects,
	unit,
	user,
} from "@repo/db";
import { count, eq, sql } from "drizzle-orm";

export const notesPurchaseRepository = {
	async getPurchases(db: DB) {
		return await db
			.select({
				id: notesPurchases.id,
				userName: user.name,
				userEmail: user.email,
				title: notes.title,
				amount: notesPurchases.amount,
				paymentMethod: notesPurchases.paymentMethod,
				status: notesPurchases.status,
				createdAt: notesPurchases.createdAt,
			})
			.from(notesPurchases)
			.leftJoin(user, eq(user.id, notesPurchases.userId))
			.leftJoin(notes, eq(notes.id, notesPurchases.noteId));
	},

	async getAllPurchasesCount(db: DB) {
		const [notesResult, pyqResult] = await Promise.all([
			db.select({ total: count() }).from(notesPurchases),
			db.select({ total: count() }).from(pyqPurchases),
		]);

		const notesTotal = notesResult[0]?.total ?? 0;
		const pyqTotal = pyqResult[0]?.total ?? 0;

		return {
			notes: notesTotal,
			pyq: pyqTotal,
			total: notesTotal + pyqTotal,
		};
	},

	async purchaseDetailsId(purchaseId: string, db: DB) {
		const [purchase] = await db
			.select({
				id: notesPurchases.id,
				userName: user.name,
				userEmail: user.email,
				userId: user.id,
				type: sql<"notes">`'notes'`.as("type"),
				resourceId: notes.id,
				title: notes.title,
				course: courses.name,
				semester: semesters.number,
				subject: subjects.name,
				price: notes.price,
				amountPaid: notesPurchases.amount,
				status: notesPurchases.status,
				purchasesAt: notesPurchases.createdAt,
				orderId: notesPurchases.razorPayOrderId,
				paymentId: notesPurchases.razorPayPaymentId,
				paymentMethod: notesPurchases.paymentMethod,
				chapter: unit.name,
			})
			.from(notesPurchases)
			.leftJoin(user, eq(notesPurchases.userId, user.id))
			.leftJoin(notes, eq(notesPurchases.noteId, notes.id))
			.leftJoin(unit, eq(notes.unitId, unit.id))
			.leftJoin(subjects, eq(unit.subjectId, subjects.id))
			.leftJoin(semesters, eq(subjects.semesterId, semesters.id))
			.leftJoin(courses, eq(semesters.courseId, courses.id))
			.where(eq(notesPurchases.id, purchaseId));

		return purchase;
	},

	async getAllPurchasesByNote(noteId: string, db: DB) {
		return await db
			.select({
				id: notesPurchases.id,
				userId: user.id,
				userName: user.name,
				userEmail: user.email,
				amountPaid: notesPurchases.amount,
				status: notesPurchases.status,
				purchasesAt: notesPurchases.createdAt,
			})
			.from(notesPurchases)
			.innerJoin(user, eq(notesPurchases.userId, user.id))
			.where(eq(notesPurchases.noteId, noteId));
	},

	async getAllPurchasesByUserId(userId: string, db: DB) {
		return await db
			.select({
				id: notesPurchases.id,
				userName: user.name,
				userEmail: user.email,
				title: notes.title,
				type: sql<"notes">`'notes'`.as("type"),
				amountPaid: notesPurchases.amount,
				status: notesPurchases.status,
				purchasesAt: notesPurchases.createdAt,
			})
			.from(notesPurchases)
			.innerJoin(user, eq(notesPurchases.userId, user.id))
			.innerJoin(notes, eq(notesPurchases.noteId, notes.id))
			.where(eq(notesPurchases.userId, userId));
	},

	async getAllPurchasesByUser(userId: string, db: DB) {
		return await db
			.select({
				id: notesPurchases.id,
				slug: notes.slug,
				resourceId: notes.id,
				title: notes.title,
				amountPaid: notesPurchases.amount,
				status: notesPurchases.status,
				price: notes.price,
				purchasesAt: notesPurchases.createdAt,
				orderId: notesPurchases.razorPayOrderId,
			})
			.from(notesPurchases)
			.innerJoin(notes, eq(notesPurchases.noteId, notes.id))
			.where(eq(notesPurchases.userId, userId));
	},
};
