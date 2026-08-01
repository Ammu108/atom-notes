import { SiteHeader } from "~/components/site-header";
import NotesPurchasesDetails from "~/features/notes-purchases/_components/notes-purchases-details";
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
			<SiteHeader title="Edit Notes" />
			<div className="flex flex-row items-center justify-start p-4">
				<BackButton />
			</div>
			<div>
				<NotesPurchasesDetails id={id} />
			</div>
		</div>
	);
};

export default page;
