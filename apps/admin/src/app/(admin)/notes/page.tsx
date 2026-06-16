import Link from "next/link";
import { SiteHeader } from "~/components/site-header";
import { buttonVariants } from "~/components/ui/button";
import { NotesTable } from "~/features/notes/_components/notes-table";

const Notes = () => {
	return (
		<>
			<SiteHeader title="All Notes" />
			<div className="flex flex-row items-center justify-end p-4">
				<Link
					className={buttonVariants({ variant: "default", size: "lg" })}
					href="/notes/create"
				>
					Create Note
				</Link>
			</div>
			<div className="p-4 lg:p-6">
				<div className="flex flex-col gap-4">
					<NotesTable />
				</div>
			</div>
		</>
	);
};

export default Notes;
