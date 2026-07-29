import { api } from "~/trpc/react";

export const usePurchases = () => {
	return api.purchases.getAllPurchases.useQuery();
};

export const usePurchaseById = (id: string) => {
	return api.purchases.purchaseDetailsId.useQuery({ id });
};
