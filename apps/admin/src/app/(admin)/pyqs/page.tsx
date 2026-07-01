import Link from "next/link";
import { SiteHeader } from "~/components/site-header";
import { buttonVariants } from "~/components/ui/button";
import PyqTable from "~/features/pyqs/_components/pyq-table";

const page = () => {
	return (
		<>
			<SiteHeader title="All Pyqs" />
			<div className="flex flex-row items-center justify-end p-4">
				<Link
					className={buttonVariants({ variant: "default", size: "lg" })}
					href="/pyqs/create"
				>
					Create Pyqs
				</Link>
			</div>
			<div className="p-4 lg:p-6">
				<div className="flex flex-col gap-4">
					<PyqTable />
				</div>
			</div>
		</>
	);
};

export default page;
