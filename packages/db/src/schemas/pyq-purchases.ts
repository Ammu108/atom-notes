import { numeric, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers";
import { notes } from "./notes";
import { user } from "./users";

export const pyqPurchases = pgTable("pyqPurchases", {
	id: uuid("id").defaultRandom().primaryKey(),
	userId: text("user_id").references(() => user.id),
	noteId: uuid("note_id").references(() => notes.id),
	amount: numeric("amount").notNull(),
	status: text("status").$type<"PENDING" | "PAID" | "FAILED">(),
	paymentMethod: text("payment_method"),
	razorPayOrderId: text("razorpay_order_id"),
	razorPayPaymentId: text("razorpay_payment_id"),
	...timestamps,
});
