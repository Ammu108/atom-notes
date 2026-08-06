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
import { useGetAllPurchasesCount } from "../api";

const TotalPurchases = () => {
	const { data: totalPurchases, isLoading: isLoadingPurchases } =
		useGetAllPurchasesCount();

	return (
		<Card className="@container/card">
			<CardHeader>
				<CardDescription>Total Purchases</CardDescription>
				<CardTitle className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">
					{isLoadingPurchases ? (
						<Skeleton className="h-9 w-12" />
					) : (
						totalPurchases?.total
					)}
				</CardTitle>
				<CardAction>
					<Badge className="flex flex-col gap-2" variant="outline">
						Notes :{" "}
						{isLoadingPurchases ? (
							<Skeleton className="h-4 w-8" />
						) : (
							totalPurchases?.notes
						)}
					</Badge>
					<Badge variant="outline">
						Pyqs :{" "}
						{isLoadingPurchases ? (
							<Skeleton className="h-4 w-8" />
						) : (
							totalPurchases?.pyq
						)}
					</Badge>
				</CardAction>
			</CardHeader>
			<CardFooter className="flex-col items-start gap-1.5 text-sm">
				<div className="text-muted-foreground">Total purchases made</div>
			</CardFooter>
		</Card>
	);
};

export default TotalPurchases;
