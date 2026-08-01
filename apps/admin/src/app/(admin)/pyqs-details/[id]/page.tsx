import { SiteHeader } from "~/components/site-header";
import PyqDetails from "~/features/pyqs/_components/pyq-details";
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
			<SiteHeader title="PYQ Details" />
			<div className="flex flex-row items-center justify-start p-4">
				<BackButton />
			</div>
			<div>
				<PyqDetails id={id} />
			</div>
		</div>
	);
};

export default page;
