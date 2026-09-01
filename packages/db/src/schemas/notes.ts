import type { EditorContent } from "@repo/shared";
import { relations } from "drizzle-orm";
import {
	boolean,
	index,
	jsonb,
	numeric,
	pgTableCreator,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { timestamps } from "../helpers";
import { unit } from "./unit";

const createTable = pgTableCreator((name) => `${name}`);

export const notes = createTable(
	"notes",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		unitId: uuid("unit_id")
			.references(() => unit.id, { onDelete: "cascade" })
			.notNull(),
		title: varchar("title", { length: 255 }).notNull(),
		slug: varchar("slug", { length: 500 }).notNull().unique(),
		content: jsonb("content").$type<EditorContent>().notNull(),
		metaTitle: varchar("meta_title", { length: 70 }),
		metaDescription: varchar("meta_description", { length: 160 }),
		pdfUrl: varchar("pdf_url", { length: 2048 }),
		pdfKey: varchar("pdf_key", { length: 255 }),
		isPaid: boolean("is_paid").default(false).notNull(),
		price: numeric("price", { precision: 10, scale: 2 })
			.default("0.00")
			.notNull(), // Supports INR perfectly
		...timestamps,
	},
	(table) => ({
		unitIdIdx: index("notes_unit_id_idx").on(table.unitId),
	}),
);

export const notesRelations = relations(notes, ({ one }) => ({
	unit: one(unit, {
		fields: [notes.unitId],
		references: [unit.id],
	}),
}));
