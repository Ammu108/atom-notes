import { api } from "~/trpc/react";

export const useGetAllPyqs = () => {
	return api.pyqs.getAllPyqs.useQuery();
};

export const useGetPyqsById = (id: string) => {
	return api.pyqs.getPyqsById.useQuery({ id });
};
