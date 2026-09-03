import {
	boolean,
	index,
	numeric,
	pgTable,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { timestamps } from "../helpers";
import { subjects } from "./subjects";

export const pyqs = pgTable(
	"pyqs",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		title: varchar("title", { length: 255 }).notNull(),
		year: varchar("year", { length: 4 }).notNull(),
		subjectId: uuid("subject_id")
			.references(() => subjects.id, { onDelete: "cascade" })
			.notNull(),
		// Question paper PDF
		questionPdfUrl: varchar("question_pdf_url", { length: 2048 }),
		questionPdfKey: varchar("question_pdf_key", { length: 255 }),

		// Solution PDF
		solutionPdfUrl: varchar("solution_pdf_url", { length: 2048 }),
		solutionPdfKey: varchar("solution_pdf_key", { length: 255 }),
		isPaid: boolean("is_paid").default(false).notNull(),
		price: numeric("price", { precision: 10, scale: 2 })
			.default("0.00")
			.notNull(),
		...timestamps,
	},
	(table) => ({
		subjectIdIdx: index("pyqs_subject_id_idx").on(table.subjectId),
	}),
);
