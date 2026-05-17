import { pgTableCreator, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers";
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
