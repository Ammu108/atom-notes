import { z } from "zod";

export const revenueAnalyticsSchema = z.object({
	period: z.enum(["7d", "30d"]),
});

export type RevenueAnalyticsPeriod = z.infer<
	typeof revenueAnalyticsSchema
>["period"];

export type RevenueChartPoint = {
	date: string;
	revenue: number;
};

export type RevenueAnalyticsResponse = {
	totalRevenue: number;
	notesRevenue: number;
	pyqRevenue: number;
	notesChart: RevenueChartPoint[];
	pyqChart: RevenueChartPoint[];
};
