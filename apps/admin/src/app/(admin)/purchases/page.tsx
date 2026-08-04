import { SiteHeader } from "~/components/site-header";
import { PurchasesTable } from "~/features/purchases/_components/purchases-table";

const page = () => {
	return (
		<>
			<SiteHeader title="Purchases" />

			<div className="p-4 lg:p-6">
				<div className="flex flex-col gap-4">
					<PurchasesTable />
				</div>
			</div>
		</>
	);
};

export default page;
