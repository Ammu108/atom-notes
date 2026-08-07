import type { DB } from "@repo/db";
import { dashboardRepository } from "./repository";
import type { RevenueAnalyticsPeriod } from "./types";

export const dashboardService = {
	async getRevenueAnalytics(db: DB, period: RevenueAnalyticsPeriod) {
		return dashboardRepository.getRevenueAnalytics(db, period);
	},
};
