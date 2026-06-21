import { pgTableCreator, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers";
import { users } from "./users";

const createTable = pgTableCreator((name) => `${name}`);

export const sessions = createTable("sessions", {
	id: uuid("id").defaultRandom().primaryKey(),
	userId: uuid("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	refreshToken: text("refresh_token").notNull().unique(),
	expiresAt: timestamp("expires_at").notNull(),
	...timestamps,
});
