import { api } from "~/trpc/react";

export const useGetAllNotesPurchased = (options?: { enabled?: boolean }) => {
	return api.notesPurchases.getAllPurchasesByUser.useQuery(undefined, {
		enabled: options?.enabled,
	});
};

export const useGetAllPyqsPurchased = (options?: { enabled?: boolean }) => {
	return api.pyqPurchases.getAllPurchasesByUser.useQuery(undefined, {
		enabled: options?.enabled,
	});
};

export const useUserStats = () => {
	return api.auth.getStatsByUser.useQuery();
};
