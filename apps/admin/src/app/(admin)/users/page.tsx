import { SiteHeader } from "~/components/site-header";
import { UsersTable } from "~/components/users-table";

export default async function UsersPageRoute() {
	return (
		<>
			<SiteHeader title="All Users" />
			<div className="flex flex-1 flex-col">
				<div className="@container/main flex flex-1 flex-col gap-2">
					<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
						<div className="px-4 lg:px-6">
							<UsersTable />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
