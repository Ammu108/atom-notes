import FilterBar from "./components/filter-bar";
import NoteCardRepo from "./components/note-card-repo";

const browsePage = () => {
	return (
		<div className="w-full pt-24">
			{/* Search & Filters */}
			<FilterBar />

			{/* Grid */}
			<NoteCardRepo />
		</div>
	);
};

export default browsePage;
