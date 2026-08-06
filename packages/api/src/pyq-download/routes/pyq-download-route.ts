import { adminProcedure, createTRPCRouter } from "../../trpc";
import { pyqDownloadRepository } from "../repositories/pyq-download-repositary";

export const pyqDownloadRouter = createTRPCRouter({
	getAllCounts: adminProcedure.query(async ({ ctx }) => {
		return await pyqDownloadRepository.getAllCounts(ctx.db);
	}),
});
