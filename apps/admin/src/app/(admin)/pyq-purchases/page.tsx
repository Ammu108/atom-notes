import { SiteHeader } from "~/components/site-header";
import { PyqPurchasesTable } from "~/features/pyq-purchases/_components/pyq-purchase-table";

const page = () => {
	return (
		<>
			<SiteHeader title="PYQ Purchases" />

			<div className="p-4 lg:p-6">
				<div className="flex flex-col gap-4">
					<PyqPurchasesTable />
				</div>
			</div>
		</>
	);
};

export default page;
