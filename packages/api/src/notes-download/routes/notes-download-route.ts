import { adminProcedure, createTRPCRouter } from "../../trpc";
import { notesDownloadRepository } from "../repositories/notes-download-repositary";

export const notesDownloadRouter = createTRPCRouter({
	getAllCounts: adminProcedure.query(async ({ ctx }) => {
		return await notesDownloadRepository.getAllResourceCounts(ctx.db);
	}),
});
