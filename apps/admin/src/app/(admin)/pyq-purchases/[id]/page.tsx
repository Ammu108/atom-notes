import { SiteHeader } from "~/components/site-header";
import PyqPurchasesDetails from "~/features/pyq-purchases/_components/pyq-purchases-details";
import { BackButton } from "~/lib/back-button";

interface RowProps {
	params: Promise<{
		id: string;
	}>;
}

const page = async ({ params }: RowProps) => {
	const { id } = await params;

	return (
		<div className="flex flex-col gap-1">
			<SiteHeader title="Edit PYQs" />
			<div className="flex flex-row items-center justify-start p-4">
				<BackButton />
			</div>
			<div>
				<PyqPurchasesDetails id={id} />
			</div>
		</div>
	);
};

export default page;
