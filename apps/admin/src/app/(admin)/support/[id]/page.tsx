import { SiteHeader } from "~/components/site-header";
import SupportDetailsById from "~/features/contacts/_components/support-details";
import { BackButton } from "~/lib/back-button";

interface PageProps {
	params: Promise<{
		id: string;
	}>;
}

const page = async ({ params }: PageProps) => {
	const { id } = await params;

	return (
		<div className="flex flex-col gap-1">
			<SiteHeader title="Support Details" />
			<div className="flex flex-row items-center justify-start p-4">
				<BackButton />
			</div>
			<div>
				<SupportDetailsById id={id} />
			</div>
		</div>
	);
};

export default page;
