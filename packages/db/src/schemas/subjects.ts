import { relations } from "drizzle-orm";
import { index, pgTableCreator, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers";
import { semesters } from "./semesters";
import { unit } from "./unit";

const createTable = pgTableCreator((name) => `${name}`);

export const subjects = createTable(
	"subjects",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		semesterId: uuid("semester_id")
			.references(() => semesters.id, { onDelete: "cascade" })
			.notNull(),
		name: varchar("name", { length: 256 }).notNull(),
		code: varchar("code", { length: 50 }),
		...timestamps,
	},
	(table) => ({
		semesterIdIdx: index("subjects_semester_id_idx").on(table.semesterId),
	}),
);

export const subjectsRelations = relations(subjects, ({ one, many }) => ({
	semester: one(semesters, {
		fields: [subjects.semesterId],
		references: [semesters.id],
	}),
	units: many(unit),
}));
