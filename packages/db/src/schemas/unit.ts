import { relations } from "drizzle-orm";
import { index, pgTableCreator, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers";
import { notes } from "./notes";
import { subjects } from "./subjects";

const createTable = pgTableCreator((name) => `${name}`);

export const unit = createTable(
	"unit",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		subjectId: uuid("subject_id")
			.references(() => subjects.id, { onDelete: "cascade" })
			.notNull(),
		name: varchar("name", { length: 256 }).notNull(),
		...timestamps,
	},
	(table) => ({
		subjectIdIdx: index("units_subject_id_idx").on(table.subjectId),
	}),
);

export const unitRelations = relations(unit, ({ one, many }) => ({
	subject: one(subjects, {
		fields: [unit.subjectId],
		references: [subjects.id],
	}),
	notes: many(notes),
}));
