import { boolean, pgTableCreator, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers";

const createTable = pgTableCreator((name) => `${name}`);

export const users = createTable("users", {
	id: uuid("id").defaultRandom().primaryKey(),
	role: varchar("role", { length: 50 }).default("user").notNull(),
	name: varchar("name", { length: 256 }).notNull(),
	email: varchar("email", { length: 256 }).notNull(),
	password: varchar("password", { length: 256 }).notNull(),
	isDeleted: boolean("is_deleted").default(false),
	...timestamps,
});
