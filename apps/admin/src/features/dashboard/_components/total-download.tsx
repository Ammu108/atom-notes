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
import { useGetAllDownloadsCount } from "../api";

const TotalDownload = () => {
	const { data: totalDownloads, isLoading: isLoadingDownloads } =
		useGetAllDownloadsCount();

	return (
		<Card className="@container/card">
			<CardHeader>
				<CardDescription>Total Downloads</CardDescription>
				<CardTitle className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">
					{isLoadingDownloads ? (
						<Skeleton className="h-9 w-12" />
					) : (
						totalDownloads?.total
					)}
				</CardTitle>
				<CardAction>
					<Badge className="flex flex-col gap-2" variant="outline">
						Notes :{" "}
						{isLoadingDownloads ? (
							<Skeleton className="h-4 w-8" />
						) : (
							totalDownloads?.notes
						)}
					</Badge>
					<Badge variant="outline">
						Pyqs :{" "}
						{isLoadingDownloads ? (
							<Skeleton className="h-4 w-8" />
						) : (
							totalDownloads?.pyqs
						)}
					</Badge>
				</CardAction>
			</CardHeader>
			<CardFooter className="flex-col items-start gap-1.5 text-sm">
				<div className="text-muted-foreground">Unique downloads recorded</div>
			</CardFooter>
		</Card>
	);
};

export default TotalDownload;
