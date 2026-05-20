import { relations } from "drizzle-orm";
import { pgTableCreator, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers";
import { notes } from "./notes";
import { subjects } from "./subjects";

const createTable = pgTableCreator((name) => `${name}`);

export const chapters = createTable("chapters", {
	id: uuid("id").defaultRandom().primaryKey(),
	subjectId: uuid("subject_id")
		.references(() => subjects.id, { onDelete: "cascade" })
		.notNull(),
	name: varchar("name", { length: 256 }).notNull(),
	...timestamps,
});

export const chaptersRelations = relations(chapters, ({ one, many }) => ({
	subject: one(subjects, {
		fields: [chapters.subjectId],
		references: [subjects.id],
	}),
	notes: many(notes),
}));
