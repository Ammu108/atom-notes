import {
	chapters,
	courses,
	type DB,
	notes,
	notesPurchases,
	semesters,
	subjects,
	user,
} from "@repo/db";
import { eq } from "drizzle-orm";

export const notesPurchaseRepository = {
	async getPurchases(db: DB) {
		return await db
			.select({
				id: notesPurchases.id,
				userName: user.name,
				userEmail: user.email,
				noteTitle: notes.title,
				amount: notesPurchases.amount,
				paymentMethod: notesPurchases.paymentMethod,
				status: notesPurchases.status,
				createdAt: notesPurchases.createdAt,
			})
			.from(notesPurchases)
			.leftJoin(user, eq(user.id, notesPurchases.userId))
			.leftJoin(notes, eq(notes.id, notesPurchases.noteId));
	},

	async purchaseDetailsId(purchaseId: string, db: DB) {
		const [purchase] = await db
			.select({
				id: notesPurchases.id,
				userName: user.name,
				userEmail: user.email,
				userId: user.id,
				noteId: notes.id,
				noteTitle: notes.title,
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
				chapter: chapters.name,
			})
			.from(notesPurchases)
			.leftJoin(user, eq(notesPurchases.userId, user.id))
			.leftJoin(notes, eq(notesPurchases.noteId, notes.id))
			.leftJoin(chapters, eq(notes.chapterId, chapters.id))
			.leftJoin(subjects, eq(chapters.subjectId, subjects.id))
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
};
