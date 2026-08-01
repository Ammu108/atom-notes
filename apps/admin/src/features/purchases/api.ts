import { api } from "~/trpc/react";

export const usePurchases = () => {
	return api.notesPurchases.getAllPurchases.useQuery();
};

export const usePurchaseById = (id: string) => {
	return api.notesPurchases.purchaseDetailsId.useQuery({ id });
};
