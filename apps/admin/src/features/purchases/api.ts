import { api } from "~/trpc/react";

export const useGetAllNotesPurchases = (enabled = true) => {
	return api.notesPurchases.getAllPurchases.useQuery(undefined, { enabled });
};

export const useGetAllPyqPurchases = (enabled = true) => {
	return api.pyqPurchases.getAllPurchases.useQuery(undefined, { enabled });
};

export const useGetNotesPurchasesById = (id: string, enabled = true) => {
	return api.notesPurchases.purchaseDetailsId.useQuery({ id }, { enabled });
};

export const useGetPyqPurchasesById = (id: string, enabled = true) => {
	return api.pyqPurchases.purchaseDetailsId.useQuery({ id }, { enabled });
};
