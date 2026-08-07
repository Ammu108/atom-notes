import { api } from "~/trpc/react";

export const useGetAllTotalRevenue = () => {
	return api.notesPayment.totalSpent.useQuery();
};

export const useGetRevenueAnalytics = (period: "7d" | "30d") => {
	return api.dashboard.getRevenueAnalytics.useQuery({ period });
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
