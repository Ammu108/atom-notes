import { SiteHeader } from "~/components/site-header";
import { NotesPurchasesTable } from "~/features/notes-purchases/_components/notes-purchase-table";

const page = () => {
	return (
		<>
			<SiteHeader title="Notes Purchases" />

			<div className="p-4 lg:p-6">
				<div className="flex flex-col gap-4">
					<NotesPurchasesTable />
				</div>
			</div>
		</>
	);
};

export default page;
