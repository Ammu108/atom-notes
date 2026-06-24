import { relations } from "drizzle-orm";
import { pgTableCreator, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers";
import { courses } from "./courses";
import { subjects } from "./subjects";

export const createTable = pgTableCreator((name) => `${name}`);

export const semesters = createTable("semesters", {
	id: uuid("id").defaultRandom().primaryKey(),
	courseId: uuid("course_id")
		.references(() => courses.id, { onDelete: "cascade" })
		.notNull(),
	number: varchar("number").notNull(), // e.g., 1, 2, 3, 4, etc.
	...timestamps,
});

export const semestersRelations = relations(semesters, ({ one, many }) => ({
	course: one(courses, {
		fields: [semesters.courseId],
		references: [courses.id],
	}),
	subjects: many(subjects),
}));
