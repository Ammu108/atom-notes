import TotalDownload from "~/features/dashboard/_components/total-download";
import TotalPurchases from "~/features/dashboard/_components/total-purchases";
import TotalRevenue from "~/features/dashboard/_components/total-revenue";
import TotalUsers from "~/features/dashboard/_components/total-users";

export function SectionCards() {
	return (
		<div className="grid @5xl/main:grid-cols-4 @xl/main:grid-cols-2 grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 dark:*:data-[slot=card]:bg-card">
			<TotalRevenue />
			<TotalUsers />
			<TotalPurchases />
			<TotalDownload />
		</div>
	);
}
