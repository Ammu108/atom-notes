import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "~/components/site-header";
import { buttonVariants } from "~/components/ui/button";
import EditPyqWrapper from "~/features/pyqs/_components/edit-pyq-wrapper";

interface PageProps {
	params: Promise<{ pyqId: string }>;
}

const page = async ({ params }: PageProps) => {
	const { pyqId } = await params;

	return (
		<>
			<SiteHeader title="Edit Notes" />
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
					<EditPyqWrapper pyqId={pyqId} />
				</div>
			</div>
		</>
	);
};

export default page;
