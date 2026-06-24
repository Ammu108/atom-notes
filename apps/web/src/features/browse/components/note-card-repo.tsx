"use client";
import { useGetAllNotes } from "../api";
import { NoteCardSkeleton } from "./note-card-skeleton";
import NoteCardView from "./note-card-view";

const NoteCardRepo = () => {
	const { data: allNotes, isError, isPending } = useGetAllNotes();

	if (isPending) {
		return <NoteCardSkeleton />;
	}

	if (!allNotes || isError) {
		return (
			<div className="rounded-xl border border-destructive bg-destructive/10 p-4">
				<p className="text-center font-medium text-base text-destructive">
					Note not found!.
				</p>
			</div>
		);
	}

	return <NoteCardView note={allNotes} />;
};

export default NoteCardRepo;
