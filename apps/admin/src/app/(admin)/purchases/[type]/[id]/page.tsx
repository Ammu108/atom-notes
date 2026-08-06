import { SiteHeader } from "~/components/site-header";
import PurchasesDetails from "~/features/purchases/_components/purchases-details";
import { BackButton } from "~/lib/back-button";

interface Props {
	params: Promise<{
		type: "notes" | "pyq";
		id: string;
	}>;
}

const page = async ({ params }: Props) => {
	const { id, type } = await params;

	return (
		<div className="flex flex-col gap-1">
			<SiteHeader
				title={`${type === "notes" ? "Notes" : "PYQs"} Purchases Details`}
			/>
			<div className="flex flex-row items-center justify-start p-4">
				<BackButton />
			</div>
			<div>
				<PurchasesDetails id={id} type={type} />
			</div>
		</div>
	);
};

export default page;
