"use client";

import { useGetNotesById } from "../api";
import CreateNotesForm from "./create-notes-form";

interface EditNotesWrapperProps {
	noteId: string;
}

export default function EditNotesWrapper({ noteId }: EditNotesWrapperProps) {
	const { data: notes, isPending, isError } = useGetNotesById(noteId);

	if (isPending) return <div className="py-8 text-center">Loading note...</div>;
	if (isError)
		return (
			<div className="py-8 text-center text-red-500">Error loading note</div>
		);

	return <CreateNotesForm notes={notes} notesId={noteId} />;
}
