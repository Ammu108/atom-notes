"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "~/components/ui/chart";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { Skeleton } from "~/components/ui/skeleton";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { useGetRevenueAnalytics } from "~/features/dashboard/api";
import { useIsMobile } from "~/hooks/use-mobile";

export const description = "Revenue analytics for paid purchases";

const chartConfig = {
	notes: {
		label: "Notes",
		color: "var(--chart-1)",
	},
	pyqs: {
		label: "PYQs",
		color: "var(--chart-2)",
	},
} satisfies ChartConfig;

const formatCurrency = (value: number) => {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0,
	}).format(value);
};

export function ChartAreaInteractive() {
	const isMobile = useIsMobile();
	const [timeRange, setTimeRange] = React.useState<"7d" | "30d">("30d");
	const { data, isLoading } = useGetRevenueAnalytics(timeRange);

	React.useEffect(() => {
		if (isMobile) {
			setTimeRange("7d");
		}
	}, [isMobile]);

	const notesChartData = data?.notesChart ?? [];
	const pyqChartData = data?.pyqChart ?? [];
	const summary = data;

	const chartData = React.useMemo(() => {
		const map = new Map<
			string,
			{
				date: string;
				notes: number;
				pyqs: number;
			}
		>();

		for (const row of notesChartData) {
			map.set(row.date, {
				date: row.date,
				notes: row.revenue,
				pyqs: 0,
			});
		}

		for (const row of pyqChartData) {
			const current = map.get(row.date);

			if (current) {
				current.pyqs = row.revenue;
			} else {
				map.set(row.date, {
					date: row.date,
					notes: 0,
					pyqs: row.revenue,
				});
			}
		}

		return [...map.values()].sort(
			(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
		);
	}, [notesChartData, pyqChartData]);

	return (
		<Card className="@container/card">
			<CardHeader>
				<CardTitle>Revenue Analytics</CardTitle>
				<CardDescription>
					{timeRange === "7d"
						? "Revenue for the last 7 days"
						: timeRange === "30d"
							? "Revenue for the last 30 days"
							: "Revenue for the last 3 months"}
				</CardDescription>
				<CardAction>
					<ToggleGroup
						className="@[767px]/card:flex hidden *:data-[slot=toggle-group-item]:px-4!"
						multiple={false}
						onValueChange={(value) => {
							setTimeRange((value[0] as "7d" | "30d") ?? "30d");
						}}
						value={[timeRange]}
						variant="outline"
					>
						<ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
						<ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
					</ToggleGroup>
					<Select
						onValueChange={(value) => {
							setTimeRange(value as "7d" | "30d");
						}}
						value={timeRange}
					>
						<SelectTrigger
							aria-label="Select a value"
							className="flex @[767px]/card:hidden w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
							size="sm"
						>
							<SelectValue placeholder="Last 3 months" />
						</SelectTrigger>
						<SelectContent className="rounded-xl">
							<SelectItem className="rounded-lg" value="30d">
								Last 30 days
							</SelectItem>
							<SelectItem className="rounded-lg" value="7d">
								Last 7 days
							</SelectItem>
						</SelectContent>
					</Select>
				</CardAction>
			</CardHeader>
			<CardContent className="space-y-6 px-2 pt-4 sm:px-6 sm:pt-6">
				<div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
					{[
						{
							label: "Total Revenue",
							value: formatCurrency(summary?.totalRevenue ?? 0),
						},
						{
							label: "Notes Revenue",
							value: formatCurrency(summary?.notesRevenue ?? 0),
						},
						{
							label: "PYQs Revenue",
							value: formatCurrency(summary?.pyqRevenue ?? 0),
						},
					].map((item) => (
						<div
							className="rounded-lg border bg-background/60 p-4"
							key={item.label}
						>
							<div className="text-muted-foreground text-sm">{item.label}</div>
							{isLoading ? (
								<Skeleton className="mt-2 h-7 w-24" />
							) : (
								<div className="mt-2 font-semibold text-lg">{item.value}</div>
							)}
						</div>
					))}
				</div>
				{isLoading ? (
					<div className="flex h-62.5 items-center justify-center rounded-lg border border-dashed">
						<Skeleton className="h-8 w-40" />
					</div>
				) : chartData.length === 0 ? (
					<div className="flex h-62.5 items-center justify-center rounded-lg border border-dashed text-muted-foreground text-sm">
						No paid purchases yet for this range.
					</div>
				) : (
					<ChartContainer
						className="aspect-auto h-62.5 w-full"
						config={chartConfig}
					>
						<AreaChart data={chartData}>
							<defs>
								<linearGradient id="fillNotes" x1="0" x2="0" y1="0" y2="1">
									<stop
										offset="5%"
										stopColor="var(--color-notes)"
										stopOpacity={0.4}
									/>
									<stop
										offset="95%"
										stopColor="var(--color-notes)"
										stopOpacity={0.05}
									/>
								</linearGradient>

								<linearGradient id="fillPyqs" x1="0" x2="0" y1="0" y2="1">
									<stop
										offset="5%"
										stopColor="var(--color-pyqs)"
										stopOpacity={0.4}
									/>
									<stop
										offset="95%"
										stopColor="var(--color-pyqs)"
										stopOpacity={0.05}
									/>
								</linearGradient>
							</defs>
							<CartesianGrid vertical={false} />
							<XAxis
								axisLine={false}
								dataKey="date"
								minTickGap={32}
								tickFormatter={(value) => {
									const date = new Date(value);
									return date.toLocaleDateString("en-US", {
										month: "short",
										day: "numeric",
									});
								}}
								tickLine={false}
								tickMargin={8}
							/>
							<ChartTooltip
								content={
									<ChartTooltipContent
										formatter={(value) => formatCurrency(Number(value))}
										indicator="dot"
										labelFormatter={(value) => {
											return new Date(value).toLocaleDateString("en-US", {
												month: "short",
												day: "numeric",
											});
										}}
									/>
								}
								cursor={false}
							/>
							<Area
								dataKey="notes"
								fill="url(#fillNotes)"
								stroke="var(--color-notes)"
								strokeWidth={2}
								type="monotone"
							/>

							<Area
								dataKey="pyqs"
								fill="url(#fillPyqs)"
								stroke="var(--color-pyqs)"
								strokeWidth={2}
								type="monotone"
							/>
						</AreaChart>
					</ChartContainer>
				)}
			</CardContent>
		</Card>
	);
}
