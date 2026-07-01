import {
	boolean,
	numeric,
	pgTable,
	text,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { timestamps } from "../helpers";
import { subjects } from "./subjects";

export const pyqs = pgTable("pyqs", {
	id: uuid("id").defaultRandom().primaryKey(),
	title: varchar("title", { length: 255 }).notNull(),
	year: varchar("year", { length: 4 }).notNull(),
	subjectId: uuid("subject_id")
		.references(() => subjects.id, { onDelete: "cascade" })
		.notNull(),
	pdfUrl: varchar("pdf_url", { length: 2048 }),
	pdfKey: varchar("pdf_key", { length: 255 }),
	isPaid: boolean("is_paid").default(false).notNull(),
	price: numeric("price", { precision: 10, scale: 2 })
		.default("0.00")
		.notNull(),
	...timestamps,
});

export const pyqQuestions = pgTable("pyq_questions", {
	id: uuid("id").primaryKey().defaultRandom(),

	pyqId: uuid("pyq_id")
		.references(() => pyqs.id, {
			onDelete: "cascade",
		})
		.notNull(),

	question: text("question").notNull(),
	...timestamps,
});
