import { integer, pgTableCreator, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers";
import { courses } from "./courses";

export const createTable = pgTableCreator((name) => `${name}`);

export const semesters = createTable("semesters", {
	id: uuid("id").defaultRandom().primaryKey(),
	courseId: uuid("course_id")
		.references(() => courses.id, { onDelete: "cascade" })
		.notNull(),
	semesters: integer("semesters").notNull(), // e.g., 1, 2, 3, 4, etc.
	...timestamps,
});
