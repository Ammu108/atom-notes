import { type DB, notesPurchases, pyqPurchases } from "@repo/db";
import { and, eq, sum } from "drizzle-orm";

export const notesPaymentRepository = {
	createPendingPurchase: async (
		db: DB,
		data: {
			userId: string;
			noteId: string;
			amount: string;
			orderId: string;
		},
	) => {
		return db.insert(notesPurchases).values({
			userId: data.userId,
			noteId: data.noteId,
			amount: data.amount,
			status: "PENDING",
			razorPayOrderId: data.orderId,
		});
	},

	hasPurchased: async (userId: string, noteId: string, db: DB) => {
		const purchase = await db.query.notesPurchases.findFirst({
			where: and(
				eq(notesPurchases.userId, userId),
				eq(notesPurchases.noteId, noteId),
				eq(notesPurchases.status, "PAID"),
			),
		});

		return !!purchase;
	},

	async findByOrderId(orderId: string, db: DB) {
		return await db.query.notesPurchases.findFirst({
			where: eq(notesPurchases.razorPayOrderId, orderId),
		});
	},

	async markAsPaid(
		data: { orderId: string; paymentId: string; paymentMethod?: string | null },
		db: DB,
	) {
		return await db
			.update(notesPurchases)
			.set({
				status: "PAID",
				paymentMethod: data.paymentMethod,
				razorPayPaymentId: data.paymentId,
			})
			.where(eq(notesPurchases.razorPayOrderId, data.orderId));
	},

	async getTotalSpent(db: DB) {
		const [notesResult, pyqResult] = await Promise.all([
			db
				.select({ total: sum(notesPurchases.amount) })
				.from(notesPurchases)
				.where(eq(notesPurchases.status, "PAID")),
			db
				.select({ total: sum(pyqPurchases.amount) })
				.from(pyqPurchases)
				.where(eq(pyqPurchases.status, "PAID")),
		]);

		const notesTotal = Number(notesResult[0]?.total ?? 0);
		const pyqTotal = Number(pyqResult[0]?.total ?? 0);

		return {
			notes: notesTotal,
			pyq: pyqTotal,
			total: notesTotal + pyqTotal,
		};
	},
};
