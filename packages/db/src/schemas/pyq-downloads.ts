import { index, pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers";
import { pyqs } from "./pyqs";
import { user } from "./users";

export const pyqDownloads = pgTable(
	"pyq_downloads",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		pyqId: uuid("pyq_id").references(() => pyqs.id, { onDelete: "cascade" }),
		userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
		...timestamps,
	},
	(table) => ({
		// One user can only have ONE record per note
		userPyqUnique: uniqueIndex("pyq_user_unique").on(table.userId, table.pyqId),

		pyqIndex: index("pyq_download_pyq_idx").on(table.pyqId),
		userIndex: index("pyq_download_user_idx").on(table.userId),
	}),
);
