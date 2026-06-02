import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "~/components/site-header";
import { buttonVariants } from "~/components/ui/button";
import EditNotesWrapper from "~/features/notes/components/edit-notes-wrapper";

interface PageProps {
	params: Promise<{ noteId: string }>;
}

const page = async ({ params }: PageProps) => {
	const { noteId } = await params;

	return (
		<>
			<SiteHeader title="Edit Notes" />
			<div className="flex flex-row items-center justify-start p-4">
				<Link
					className={buttonVariants({ variant: "default", size: "lg" })}
					href="/notes"
				>
					<ArrowLeft className="size-4" />
					Back
				</Link>
			</div>

			<div className="p-4 lg:p-6">
				<div className="flex flex-col gap-4">
					<EditNotesWrapper noteId={noteId} />
				</div>
			</div>
		</>
	);
};

export default page;
