import { SiteHeader } from "~/components/site-header";
import NotesDetails from "~/features/notes/_components/notes-details";
import { BackButton } from "~/lib/back-button";

interface RowProps {
	params: Promise<{
		id: string;
	}>;
}

const NotesDetailsPage = async ({ params }: RowProps) => {
	const { id } = await params;

	return (
		<div className="flex flex-col gap-1">
			<SiteHeader title="Notes Detail" />
			<div className="flex flex-row items-center justify-start p-4">
				<BackButton />
			</div>
			<div>
				<NotesDetails id={id} />
			</div>
		</div>
	);
};

export default NotesDetailsPage;
