import { SiteHeader } from "~/components/site-header";
import PurchasesDetails from "~/features/purchases/_components/purchases-details";
import { BackButton } from "~/lib/back-button";

interface RowProps {
	params: Promise<{
		id: string;
	}>;
}

const PurchasesIdPage = async ({ params }: RowProps) => {
	const { id } = await params;

	return (
		<div className="flex flex-col gap-1">
			<SiteHeader title="Edit Notes" />
			<div className="flex flex-row items-center justify-start p-4">
				<BackButton />
			</div>
			<div>
				<PurchasesDetails id={id} />
			</div>
		</div>
	);
};

export default PurchasesIdPage;
