import { type DB, notesPurchases, pyqPurchases } from "@repo/db";
import { and, asc, eq, gte, sql } from "drizzle-orm";
import type {
	RevenueAnalyticsPeriod,
	RevenueAnalyticsResponse,
	RevenueChartPoint,
} from "./types";

const getStartDate = (period: RevenueAnalyticsPeriod) => {
	const now = new Date();
	const start = new Date(now);

	switch (period) {
		case "7d":
			start.setDate(now.getDate() - 6);
			break;

		case "30d":
			start.setDate(now.getDate() - 29);
			break;
	}

	start.setHours(0, 0, 0, 0);

	return start;
};

const aggregateRevenue = async (
	db: DB,
	startDate: Date,
	table: typeof notesPurchases | typeof pyqPurchases,
): Promise<RevenueChartPoint[]> => {
	const bucket = sql<string>`TO_CHAR(${table.createdAt}, 'YYYY-MM-DD')`;

	const rows = await db
		.select({
			bucket: bucket.as("bucket"),
			revenue:
				sql<number>`COALESCE(SUM(CAST(${table.amount} AS numeric)),0)`.as(
					"revenue",
				),
			orders: sql<number>`COUNT(*)`.as("orders"),
		})
		.from(table)
		.where(and(eq(table.status, "PAID"), gte(table.createdAt, startDate)))
		.groupBy(bucket)
		.orderBy(asc(bucket));

	return rows.map((row) => ({
		date: row.bucket,
		revenue: Number(row.revenue),
		orders: Number(row.orders),
	}));
};

export const dashboardRepository = {
	async getRevenueAnalytics(
		db: DB,
		period: RevenueAnalyticsPeriod,
	): Promise<RevenueAnalyticsResponse> {
		const startDate = getStartDate(period);

		const [notesChart, pyqChart] = await Promise.all([
			aggregateRevenue(db, startDate, notesPurchases),
			aggregateRevenue(db, startDate, pyqPurchases),
		]);

		const notesRevenue = notesChart.reduce(
			(sum, item) => sum + item.revenue,
			0,
		);

		const pyqRevenue = pyqChart.reduce((sum, item) => sum + item.revenue, 0);

		return {
			totalRevenue: notesRevenue + pyqRevenue,

			notesRevenue,

			pyqRevenue,

			notesChart,

			pyqChart,
		};
	},
};
