import { api } from "~/trpc/react";

export const useGetAllTotalRevenue = () => {
	return api.notesPayment.totalSpent.useQuery();
};

export const useGetAllUsersCount = () => {
	return api.auth.getAllUsersCount.useQuery();
};

export const useGetAllPurchasesCount = () => {
	return api.notesPurchases.getAllPurchasesCount.useQuery();
};

export const useGetAllDownloadsCount = () => {
	return api.notesDownload.getAllCounts.useQuery();
};
