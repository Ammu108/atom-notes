import { relations } from "drizzle-orm";
import { pgTableCreator, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers";
import { semesters } from "./semesters";

const createTable = pgTableCreator((name) => `${name}`);

export const courses = createTable("courses", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: varchar("name", { length: 256 }).notNull(), // e.g., "Computer Science", "Mathematics"
	slug: varchar("slug", { length: 50 }).notNull().unique(), // e.g., "cs", "math"
	...timestamps,
});

export const coursesRelations = relations(courses, ({ many }) => ({
	semesters: many(semesters),
}));
