"use client";

import { Badge } from "~/components/ui/badge";
import {
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { useGetAllTotalRevenue } from "../api";

const TotalRevenue = () => {
	const { data: totalRevenue, isLoading: isTotalRevenueLoading } =
		useGetAllTotalRevenue();

	return (
		<Card className="@container/card">
			<CardHeader>
				<CardDescription>Total Revenue</CardDescription>
				<CardTitle className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">
					{isTotalRevenueLoading ? (
						<Skeleton className="h-9 w-12" />
					) : (
						totalRevenue?.total
					)}
				</CardTitle>
				<CardAction>
					<Badge className="flex flex-col gap-2" variant="outline">
						Notes :{" "}
						{isTotalRevenueLoading ? (
							<Skeleton className="h-4 w-8" />
						) : (
							totalRevenue?.notes
						)}
					</Badge>
					<Badge variant="outline">
						Pyqs :{" "}
						{isTotalRevenueLoading ? (
							<Skeleton className="h-4 w-8" />
						) : (
							totalRevenue?.pyq
						)}
					</Badge>
				</CardAction>
			</CardHeader>
			<CardFooter className="flex-col items-start gap-1.5 text-sm">
				<div className="text-muted-foreground">
					Revenue generated from all purchases
				</div>
			</CardFooter>
		</Card>
	);
};

export default TotalRevenue;
