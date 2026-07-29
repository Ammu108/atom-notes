import { SiteHeader } from "~/components/site-header";
import { PurchasesTable } from "~/features/purchases/_components/purchase-table";

const Purchases = () => {
	return (
		<>
			<SiteHeader title="All Purchases" />

			<div className="p-4 lg:p-6">
				<div className="flex flex-col gap-4">
					<PurchasesTable />
				</div>
			</div>
		</>
	);
};

export default Purchases;
