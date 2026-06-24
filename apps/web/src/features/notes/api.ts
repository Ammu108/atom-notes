import { api } from "~/trpc/react";

export const useGetNotesBySlug = (slug: string) => {
	return api.notes.getNoteBySlug.useQuery({ slug: slug });
};
