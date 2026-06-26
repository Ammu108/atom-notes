import { Suspense } from "react";
import FilterBar from "./components/filter-bar";
import NoteCardRepo from "./components/note-card-repo";
import { NoteCardSkeleton } from "./components/note-card-skeleton";

const browsePage = () => {
	return (
		<div className="w-full pt-24">
			{/* Search & Filters */}
			<Suspense fallback={<div>loading...</div>}>
				<FilterBar />
			</Suspense>

			{/* Grid */}
			<Suspense fallback={<NoteCardSkeleton />}>
				<NoteCardRepo />
			</Suspense>
		</div>
	);
};

export default browsePage;
