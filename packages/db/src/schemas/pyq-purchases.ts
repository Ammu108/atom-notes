import { numeric, pgTable, text, uuid, index } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers";
import { pyqs } from "./pyqs";
import { user } from "./users";

export const pyqPurchases = pgTable("pyqPurchases", {
	id: uuid("id").defaultRandom().primaryKey(),
	userId: text("user_id").references(() => user.id),
	pyqId: uuid("pyq_id").references(() => pyqs.id),
	amount: numeric("amount").notNull(),
	status: text("status").$type<"PENDING" | "PAID" | "FAILED">(),
	paymentMethod: text("payment_method"),
	razorPayOrderId: text("razorpay_order_id"),
	razorPayPaymentId: text("razorpay_payment_id"),
	...timestamps,
}, (table) => ({
	userIdIdx: index("pyq_purchases_user_id_idx").on(table.userId),
	pyqIdIdx: index("pyq_purchases_pyq_id_idx").on(table.pyqId),
}));
