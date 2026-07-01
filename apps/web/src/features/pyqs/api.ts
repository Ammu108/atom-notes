import { api } from "~/trpc/react";

export const useGetAllPyqs = () => {
	return api.pyqs.getAllPyqs.useQuery();
};
