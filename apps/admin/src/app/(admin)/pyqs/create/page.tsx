import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "~/components/site-header";
import { buttonVariants } from "~/components/ui/button";
import CreatePyqForm from "~/features/pyqs/_components/create-pyq-form";

const CreatePyqs = () => {
	return (
		<>
			<SiteHeader title="Create Pyqs" />
			<div className="flex flex-row items-center justify-start p-4">
				<Link
					className={buttonVariants({ variant: "default", size: "lg" })}
					href="/pyqs"
				>
					<ArrowLeft className="size-4" />
					Back
				</Link>
			</div>
			<div className="p-4 lg:p-6">
				<div className="flex flex-col gap-4">
					<CreatePyqForm />
				</div>
			</div>
		</>
	);
};

export default CreatePyqs;
