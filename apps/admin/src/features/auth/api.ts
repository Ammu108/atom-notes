import { api } from "~/trpc/react";

export const useUserDetailById = (id: string) => {
	return api.auth.getUserDetails.useQuery({ id });
};

export const useUserStatsById = (id: string) => {
	return api.auth.getUserStats.useQuery({ id });
};

export const useFilterNotes = (id?: string, enabled = true) => {
	return api.notesPurchases.getAllPurchasesByUserId.useQuery(
		{ id: id ?? "" },
		{ enabled: !!id && enabled },
	);
};

export const useFilterPyq = (id?: string, enabled = true) => {
	return api.pyqPurchases.getAllPurchasesByUserId.useQuery(
		{ id: id ?? "" },
		{ enabled: !!id && enabled },
	);
};

export const useUserSupportById = (id?: string, enabled = true) => {
	return api.auth.getUserSupportById.useQuery(
		{ id: id ?? "" },
		{ enabled: !!id && enabled },
	);
};
