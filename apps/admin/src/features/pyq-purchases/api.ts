import { api } from "~/trpc/react";

export const usePyqAllPurchases = () => {
	return api.pyqPurchases.getAllPurchases.useQuery();
};

export const usePyqPurchaseById = (id: string) => {
	return api.pyqPurchases.purchaseDetailsId.useQuery({ id });
};
