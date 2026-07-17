"use client";

import DetailedNoteSkeleton from "./_components/detailed-notes-skeleton";
import NoteSidebar from "./_components/note-sidebar";
import { NoteViewer } from "./_components/note-viewer";
import NotesHeaderView from "./_components/notes-header-view";
import NotesTagView from "./_components/notes-tag-view";
import { useGetNotesBySlug } from "./api";

interface NoteDetailPageProps {
	slug: string;
}

const NoteDetailPage = ({ slug }: NoteDetailPageProps) => {
	const { data: notes, isError, isPending } = useGetNotesBySlug(slug);

	if (isPending || isError) {
		return <DetailedNoteSkeleton />;
	}

	if (!notes) {
		return (
			<div className="rounded-xl border border-destructive bg-destructive/10 p-4">
				<p className="text-center font-medium text-base text-destructive">
					Note not found!.
				</p>
			</div>
		);
	}

	return (
		<div className="w-full pt-20 md:pt-24">
			<div className="flex flex-col gap-10 pb-16 md:flex-row md:px-6">
				{/* Main Content */}
				<div>
					{/* Tags */}
					<NotesTagView
						semester={notes.semester}
						subject={notes.subject}
						unit={notes.unitName}
					/>

					{/* Title */}
					<NotesHeaderView price={notes.pdfPrice} title={notes.title} />

					{/* Introduction */}
					<div>
						<NoteViewer content={notes.content} />
					</div>
				</div>

				{/* Sidebar */}
				<div className="scroll-mt-24 md:w-1/3" id="buyPdf">
					<NoteSidebar price={notes.pdfPrice} unitName={notes.unitName} />
				</div>
			</div>
		</div>
	);
};

export default NoteDetailPage;
