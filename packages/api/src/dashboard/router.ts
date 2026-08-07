import { adminProcedure, createTRPCRouter } from "../trpc";
import { dashboardService } from "./service";
import { revenueAnalyticsSchema } from "./types";

export const dashboardRouter = createTRPCRouter({
	getRevenueAnalytics: adminProcedure
		.input(revenueAnalyticsSchema)
		.query(async ({ input, ctx }) => {
			return dashboardService.getRevenueAnalytics(ctx.db, input.period);
		}),
});
