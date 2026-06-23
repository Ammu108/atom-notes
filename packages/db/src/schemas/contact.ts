import { pgTableCreator, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers";

const createTable = pgTableCreator((name) => `${name}`);

export const contacts = createTable("contacts", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: varchar("name", { length: 256 }).notNull(),
	email: varchar("email", { length: 256 }).notNull(),
	subject: varchar("subject", { length: 256 }).notNull(),
	message: varchar("message", { length: 1024 }).notNull(),
	...timestamps,
});
