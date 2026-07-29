import {
	chapters,
	courses,
	type DB,
	notes,
	purchases,
	semesters,
	subjects,
	user,
} from "@repo/db";
import { eq } from "drizzle-orm";

export const purchaseRepository = {
	async getPurchases(db: DB) {
		return await db
			.select({
				id: purchases.id,
				userName: user.name,
				userEmail: user.email,
				noteTitle: notes.title,
				amount: purchases.amount,
				paymentMethod: purchases.paymentMethod,
				status: purchases.status,
				createdAt: purchases.createdAt,
			})
			.from(purchases)
			.leftJoin(user, eq(user.id, purchases.userId))
			.leftJoin(notes, eq(notes.id, purchases.noteId));
	},

	async purchaseDetailsId(purchaseId: string, db: DB) {
		const [purchase] = await db
			.select({
				id: purchases.id,
				userName: user.name,
				userEmail: user.email,
				userId: user.id,
				noteId: notes.id,
				noteTitle: notes.title,
				course: courses.name,
				semester: semesters.number,
				subject: subjects.name,
				price: notes.price,
				amountPaid: purchases.amount,
				status: purchases.status,
				purchasesAt: purchases.createdAt,
				orderId: purchases.razorPayOrderId,
				paymentId: purchases.razorPayPaymentId,
				paymentMethod: purchases.paymentMethod,
				chapter: chapters.name,
			})
			.from(purchases)
			.leftJoin(user, eq(purchases.userId, user.id))
			.leftJoin(notes, eq(purchases.noteId, notes.id))
			.leftJoin(chapters, eq(notes.chapterId, chapters.id))
			.leftJoin(subjects, eq(chapters.subjectId, subjects.id))
			.leftJoin(semesters, eq(subjects.semesterId, semesters.id))
			.leftJoin(courses, eq(semesters.courseId, courses.id))
			.where(eq(purchases.id, purchaseId));

		return purchase;
	},

	async getAllPurchasesByNote(noteId: string, db: DB) {
		return await db
			.select({
				id: purchases.id,
				userId: user.id,
				userName: user.name,
				userEmail: user.email,
				amountPaid: purchases.amount,
				status: purchases.status,
				purchasesAt: purchases.createdAt,
			})
			.from(purchases)
			.innerJoin(user, eq(purchases.userId, user.id))
			.where(eq(purchases.noteId, noteId));
	},
};
