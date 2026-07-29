import { api } from "~/trpc/react";

export const ueUserDetailsById = (id: string) => {
	return api.auth.getUserDetails.useQuery({ id });
};
