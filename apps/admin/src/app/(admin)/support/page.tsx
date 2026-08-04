"use client";

import { SiteHeader } from "~/components/site-header";
import { SupportTable } from "~/features/contacts/_components/support-table";
import { api } from "~/trpc/react";

const ContactPage = () => {
	const { data: contactData, isPending: isContactPending } =
		api.contact.getAllContacts.useQuery();

	return (
		<>
			<SiteHeader title="Support" />
			<div className="flex flex-1 flex-col">
				<div className="@container/main flex flex-1 flex-col gap-2">
					<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
						<div className="px-4 lg:px-6">
							<SupportTable
								contactData={contactData}
								isPending={isContactPending}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ContactPage;
