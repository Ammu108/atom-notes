"use client";
import { useSearchParams } from "next/navigation";
import { useGetAllNotes } from "../api";
import { NoteCardSkeleton } from "./note-card-skeleton";
import NoteCardView from "./note-card-view";

const NoteCardRepo = () => {
	const searchParams = useSearchParams();
	const search = searchParams.get("search") ?? "";
	const course = searchParams.get("course") ?? "";
	const sem = searchParams.get("sem") ?? "";
	const sub = searchParams.get("sub") ?? "";

	const {
		data: allNotes,
		isError,
		isPending,
	} = useGetAllNotes({ search, course, sem, sub });

	if (isPending || isError) {
		return <NoteCardSkeleton />;
	}

	if (allNotes.length <= 0) {
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
