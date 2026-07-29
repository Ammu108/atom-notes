import { type DB, purchases } from "@repo/db";
import { and, eq } from "drizzle-orm";

export const paymentRepository = {
	createPendingPurchase: async (
		db: DB,
		data: {
			userId: string;
			noteId: string;
			amount: string;
			orderId: string;
		},
	) => {
		return db.insert(purchases).values({
			userId: data.userId,
			noteId: data.noteId,
			amount: data.amount,
			status: "PENDING",
			razorPayOrderId: data.orderId,
		});
	},

	hasPurchased: async (userId: string, noteId: string, db: DB) => {
		const purchase = await db.query.purchases.findFirst({
			where: and(
				eq(purchases.userId, userId),
				eq(purchases.noteId, noteId),
				eq(purchases.status, "PAID"),
			),
		});

		return !!purchase;
	},

	async findByOrderId(orderId: string, db: DB) {
		return await db.query.purchases.findFirst({
			where: eq(purchases.razorPayOrderId, orderId),
		});
	},

	async markAsPaid(
		data: { orderId: string; paymentId: string; paymentMethod?: string | null },
		db: DB,
	) {
		return await db
			.update(purchases)
			.set({
				status: "PAID",
				paymentMethod: data.paymentMethod,
				razorPayPaymentId: data.paymentId,
			})
			.where(eq(purchases.razorPayOrderId, data.orderId));
	},
};
