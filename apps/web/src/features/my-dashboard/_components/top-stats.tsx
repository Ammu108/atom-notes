import { Card, CardContent } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import type { USER_STATS_TYPE } from "../types";

interface TopStatsProps {
	isLoading: boolean;
	userStats: USER_STATS_TYPE | undefined;
}

const TopStats = ({ isLoading, userStats }: TopStatsProps) => {
	return (
		<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
			<Card className="border-[#E5E1D8] bg-[#FCFBF8] shadow-none">
				<CardContent className="flex flex-col gap-1 p-4">
					<span className="text-[#8B8474] text-xs uppercase tracking-wide">
						Total Spent
					</span>

					{isLoading ? (
						<Skeleton className="mt-1 h-8 w-24" />
					) : (
						<span className="font-mono font-semibold text-2xl">
							₹{userStats?.totalSpent ?? 0}
						</span>
					)}
				</CardContent>
			</Card>

			<Card className="border-[#E5E1D8] bg-[#FCFBF8] shadow-none">
				<CardContent className="flex flex-col gap-1 p-4">
					<span className="text-[#8B8474] text-xs uppercase tracking-wide">
						Paid
					</span>

					{isLoading ? (
						<Skeleton className="mt-1 h-8 w-20" />
					) : (
						<span className="font-mono font-semibold text-2xl">
							{userStats?.totalPurchases ?? 0}
						</span>
					)}
				</CardContent>
			</Card>

			<Card className="border-[#E5E1D8] bg-[#FCFBF8] shadow-none">
				<CardContent className="flex flex-col gap-1 p-4">
					<span className="text-[#8B8474] text-xs uppercase tracking-wide">
						Pending
					</span>

					{isLoading ? (
						<Skeleton className="mt-1 h-8 w-20" />
					) : (
						<span className="font-mono font-semibold text-2xl">
							{userStats?.totalPendingPurchases ?? 0}
						</span>
					)}
				</CardContent>
			</Card>

			<Card className="border-[#E5E1D8] bg-[#FCFBF8] shadow-none">
				<CardContent className="flex flex-col gap-1 p-4">
					<span className="text-[#8B8474] text-xs uppercase tracking-wide">
						Failed
					</span>

					{isLoading ? (
						<Skeleton className="mt-1 h-8 w-20" />
					) : (
						<span className="font-mono font-semibold text-2xl">
							{userStats?.totalFailedPurchases ?? 0}
						</span>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default TopStats;
