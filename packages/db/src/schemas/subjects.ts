import { pgTableCreator, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers";
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
