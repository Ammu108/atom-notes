"use client";

import { TrendingDownIcon } from "lucide-react";
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
import { useGetAllUsersCount } from "../api";

const TotalUsers = () => {
	const { data: totalUsers, isLoading: isLoadingUsers } = useGetAllUsersCount();

	return (
		<Card className="@container/card">
			<CardHeader>
				<CardDescription>New Customers</CardDescription>
				<CardTitle className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">
					{isLoadingUsers ? <Skeleton className="h-9 w-12" /> : totalUsers}
				</CardTitle>
				<CardAction>
					<Badge variant="outline">
						<TrendingDownIcon />
						-20%
					</Badge>
				</CardAction>
			</CardHeader>
			<CardFooter className="flex-col items-start gap-1.5 text-sm">
				<div className="text-muted-foreground">All unique users</div>
			</CardFooter>
		</Card>
	);
};

export default TotalUsers;
