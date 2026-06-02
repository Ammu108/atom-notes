import { toast } from "sonner";
import { api } from "~/trpc/react";

export const useUpdateNotes = () => {
	const utils = api.useUtils();

	return api.notes.UpdateNote.useMutation({
		onSuccess: async (data) => {
			await utils.notes.getAllNotes.invalidate();
			await utils.notes.getNoteById.invalidate();
			toast.success(data.message);
		},
		onError: (error) => {
			console.error("Error updating note:", error);
		},
	});
};
