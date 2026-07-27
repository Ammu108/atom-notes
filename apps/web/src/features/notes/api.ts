import { api } from "~/trpc/react";

export const useGetNotesBySlug = (slug: string) => {
	return api.notes.getNoteBySlug.useQuery({ slug: slug });
};

export const useDownloadNotePdf = (
	options?: Parameters<typeof api.payment.downloadNote.useMutation>[0],
) => {
	return api.payment.downloadNote.useMutation(options);
};
