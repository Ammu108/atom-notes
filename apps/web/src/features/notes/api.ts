import { api } from "~/trpc/react";

export const useGetNotesBySlug = (slug: string) => {
	return api.notes.getNoteBySlug.useQuery({ slug: slug });
};

export const useDownloadNotePdf = (
	options?: Parameters<typeof api.notesPayment.downloadNote.useMutation>[0],
) => {
	return api.notesPayment.downloadNote.useMutation(options);
};
