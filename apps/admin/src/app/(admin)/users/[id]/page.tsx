import { SiteHeader } from "~/components/site-header";

import UserDetails from "~/features/auth/components/user-details";
import { BackButton } from "~/lib/back-button";

interface RowProps {
	params: Promise<{
		id: string;
	}>;
}

const UserPage = async ({ params }: RowProps) => {
	const { id } = await params;

	return (
		<div className="flex flex-col gap-1">
			<SiteHeader title="User Details" />
			<div className="flex flex-row items-center justify-start p-4">
				<BackButton />
			</div>
			<div>
				<UserDetails id={id} />
			</div>
		</div>
	);
};

export default UserPage;
