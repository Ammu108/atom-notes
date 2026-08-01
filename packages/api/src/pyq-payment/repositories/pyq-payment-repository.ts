import { type DB, pyqPurchases } from "@repo/db";
import { and, eq } from "drizzle-orm";

export const pyqPaymentRepository = {
	createPendingPurchase: async (
		db: DB,
		data: {
			userId: string;
			pyqId: string;
			amount: string;
			orderId: string;
		},
	) => {
		return db.insert(pyqPurchases).values({
			userId: data.userId,
			pyqId: data.pyqId,
			amount: data.amount,
			status: "PENDING",
			razorPayOrderId: data.orderId,
		});
	},

	hasPurchased: async (userId: string, pyqId: string, db: DB) => {
		const purchase = await db.query.pyqPurchases.findFirst({
			where: and(
				eq(pyqPurchases.userId, userId),
				eq(pyqPurchases.pyqId, pyqId),
				eq(pyqPurchases.status, "PAID"),
			),
		});

		return !!purchase;
	},

	async findByOrderId(orderId: string, db: DB) {
		return await db.query.pyqPurchases.findFirst({
			where: eq(pyqPurchases.razorPayOrderId, orderId),
		});
	},

	async markAsPaid(
		data: { orderId: string; paymentId: string; paymentMethod?: string | null },
		db: DB,
	) {
		return await db
			.update(pyqPurchases)
			.set({
				status: "PAID",
				paymentMethod: data.paymentMethod,
				razorPayPaymentId: data.paymentId,
			})
			.where(eq(pyqPurchases.razorPayOrderId, data.orderId));
	},
};
