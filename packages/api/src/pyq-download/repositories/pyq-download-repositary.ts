import { type DB, pyqDownloads } from "@repo/db";
import { count } from "drizzle-orm";

export const pyqDownloadRepository = {
	async getAllCounts(db: DB) {
		const result = await db.select({ total: count() }).from(pyqDownloads);

		return result[0]?.total ?? 0;
	},
};
