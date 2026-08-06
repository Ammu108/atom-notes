import { type DB, noteDownloads, pyqDownloads } from "@repo/db";
import { count } from "drizzle-orm";

export const notesDownloadRepository = {
	async getAllResourceCounts(db: DB) {
		const notesDownloads = await db
			.select({ total: count() })
			.from(noteDownloads);

		const pyqsDownloads = await db
			.select({ total: count() })
			.from(pyqDownloads);

		return {
			notes: notesDownloads[0]?.total ?? 0,
			pyqs: pyqsDownloads[0]?.total ?? 0,
			total: (notesDownloads[0]?.total ?? 0) + (pyqsDownloads[0]?.total ?? 0),
		};
	},
};
