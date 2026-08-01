import { api } from "~/trpc/react";

export const useGetAllPyqs = () => {
	return api.pyqs.getAllPyqs.useQuery();
};

export const useGetPyqsById = (id: string) => {
	return api.pyqs.getPyqsById.useQuery({ id });
};

export const useDownloadPyqPdf = (
	options?: Parameters<typeof api.pyqPayment.downloadPyq.useMutation>[0],
) => {
	return api.pyqPayment.downloadPyq.useMutation(options);
};
