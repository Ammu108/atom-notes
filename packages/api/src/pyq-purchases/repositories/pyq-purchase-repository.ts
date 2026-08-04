import {
	courses,
	type DB,
	pyqPurchases,
	pyqs,
	semesters,
	subjects,
	user,
} from "@repo/db";
import { eq, sql } from "drizzle-orm";

export const pyqPurchaseRepository = {
	async getPurchases(db: DB) {
		return await db
			.select({
				id: pyqPurchases.id,
				userName: user.name,
				userEmail: user.email,
				title: pyqs.title,
				amount: pyqPurchases.amount,
				paymentMethod: pyqPurchases.paymentMethod,
				status: pyqPurchases.status,
				createdAt: pyqPurchases.createdAt,
			})
			.from(pyqPurchases)
			.leftJoin(user, eq(user.id, pyqPurchases.userId))
			.leftJoin(pyqs, eq(pyqs.id, pyqPurchases.pyqId));
	},

	async purchaseDetailsId(purchaseId: string, db: DB) {
		const [purchase] = await db
			.select({
				id: pyqPurchases.id,
				userName: user.name,
				userEmail: user.email,
				userId: user.id,
				type: sql<"pyq">`'pyq'`.as("type"),
				resourceId: pyqs.id,
				title: pyqs.title,
				course: courses.name,
				semester: semesters.number,
				subject: subjects.name,
				price: pyqs.price,
				amountPaid: pyqPurchases.amount,
				status: pyqPurchases.status,
				purchasesAt: pyqPurchases.createdAt,
				orderId: pyqPurchases.razorPayOrderId,
				paymentId: pyqPurchases.razorPayPaymentId,
				paymentMethod: pyqPurchases.paymentMethod,
			})
			.from(pyqPurchases)
			.leftJoin(user, eq(pyqPurchases.userId, user.id))
			.leftJoin(pyqs, eq(pyqPurchases.pyqId, pyqs.id))
			.leftJoin(subjects, eq(pyqs.subjectId, subjects.id))
			.leftJoin(semesters, eq(subjects.semesterId, semesters.id))
			.leftJoin(courses, eq(semesters.courseId, courses.id))
			.where(eq(pyqPurchases.id, purchaseId));

		return purchase;
	},

	async getAllPurchasesByPyq(pyqId: string, db: DB) {
		return await db
			.select({
				id: pyqPurchases.id,
				userId: user.id,
				userName: user.name,
				userEmail: user.email,
				amountPaid: pyqPurchases.amount,
				status: pyqPurchases.status,
				purchasesAt: pyqPurchases.createdAt,
			})
			.from(pyqPurchases)
			.innerJoin(user, eq(pyqPurchases.userId, user.id))
			.where(eq(pyqPurchases.pyqId, pyqId));
	},

	async getAllPurchasesByUserId(userId: string, db: DB) {
		return await db
			.select({
				id: pyqPurchases.id,
				userName: user.name,
				userEmail: user.email,
				title: pyqs.title,
				amountPaid: pyqPurchases.amount,
				status: pyqPurchases.status,
				purchasesAt: pyqPurchases.createdAt,
			})
			.from(pyqPurchases)
			.innerJoin(user, eq(pyqPurchases.userId, user.id))
			.innerJoin(pyqs, eq(pyqPurchases.pyqId, pyqs.id))
			.where(eq(pyqPurchases.userId, userId));
	},
};
