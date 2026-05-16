import {
	boolean,
	numeric,
	pgTableCreator,
	text,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { timestamps } from "../helpers";
import { chapters } from "./chapters";

const createTable = pgTableCreator((name) => `${name}`);

export const notes = createTable("notes", {
	id: uuid("id").defaultRandom().primaryKey(),
	chapterId: uuid("chapter_id")
		.references(() => chapters.id, { onDelete: "cascade" })
		.notNull(),
	title: varchar("title", { length: 255 }).notNull(),
	slug: varchar("slug", { length: 500 }).notNull().unique(),
	thumbnail: varchar("thumbnail", { length: 2048 }),
	content: text("content").notNull(),
	searchKeywords: text("search_keywords"), // Store comma-separated values or words
	metaTitle: varchar("meta_title", { length: 70 }),
	metaDescription: varchar("meta_description", { length: 160 }),
	pdfUrl: varchar("pdf_url", { length: 2048 }),
	isPaid: boolean("is_paid").default(false).notNull(),
	price: numeric("price", { precision: 10, scale: 2 })
		.default("0.00")
		.notNull(), // Supports INR perfectly
	...timestamps,
});
