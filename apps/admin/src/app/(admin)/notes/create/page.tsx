import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "~/components/site-header";
import { buttonVariants } from "~/components/ui/button";
import CreateNotesForm from "~/features/notes/_components/create-notes-form";

const CreateNotes = () => {
	return (
		<>
			<SiteHeader title="Create Notes" />
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
					<CreateNotesForm />
				</div>
			</div>
		</>
	);
};

export default CreateNotes;
