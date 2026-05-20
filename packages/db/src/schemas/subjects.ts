import { relations } from "drizzle-orm";
import { pgTableCreator, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers";
import { chapters } from "./chapters";
import { semesters } from "./semesters";

const createTable = pgTableCreator((name) => `${name}`);

export const subjects = createTable("subjects", {
	id: uuid("id").defaultRandom().primaryKey(),
	semesterId: uuid("semester_id")
		.references(() => semesters.id, { onDelete: "cascade" })
		.notNull(),
	name: varchar("name", { length: 256 }).notNull(),
	code: varchar("code", { length: 50 }),
	...timestamps,
});

export const subjectsRelations = relations(subjects, ({ one, many }) => ({
	semester: one(semesters, {
		fields: [subjects.semesterId],
		references: [semesters.id],
	}),
	chapters: many(chapters),
}));
