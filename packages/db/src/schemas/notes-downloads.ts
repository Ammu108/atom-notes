import { index, pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers";
import { notes } from "./notes";
import { user } from "./users";

export const noteDownloads = pgTable(
	"note_downloads",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		noteId: uuid("note_id").references(() => notes.id, { onDelete: "cascade" }),
		userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
		...timestamps,
	},
	(table) => ({
		// One user can only have ONE record per note
		userNoteUnique: uniqueIndex("note_user_unique").on(
			table.userId,
			table.noteId,
		),

		noteIndex: index("note_download_note_idx").on(table.noteId),
		userIndex: index("note_download_user_idx").on(table.userId),
	}),
);
