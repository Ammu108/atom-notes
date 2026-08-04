import { api } from "~/trpc/react";

export const useGetSupportDetailsById = (id: string) => {
	return api.contact.getContactById.useQuery(
		{ id },
		{
			enabled: !!id,
		},
	);
};
