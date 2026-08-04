import { pgTableCreator, text, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers";
import { user } from "./users";

const createTable = pgTableCreator((name) => `${name}`);

// TODO: CHNAGE CONTACTS TO SUPPORT

export const contacts = createTable("contacts", {
	id: uuid("id").defaultRandom().primaryKey(),
	userId: text("user_id").references(() => user.id),
	name: varchar("name", { length: 256 }).notNull(),
	email: varchar("email", { length: 256 }).notNull(),
	subject: varchar("subject", { length: 256 }).notNull(),
	message: varchar("message", { length: 1024 }).notNull(),
	...timestamps,
});
