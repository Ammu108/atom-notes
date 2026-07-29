import { api } from "~/trpc/react";

export const useAllPurchasedNotes = (id?: string) => {
	return api.notes.getPurchasedNotesByUserId.useQuery({ id });
};
