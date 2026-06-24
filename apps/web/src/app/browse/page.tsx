import { Container } from "~/components/container";
import FilterBar from "~/features/browse/components/filter-bar";
import NoteCardRepo from "~/features/browse/components/note-card-repo";

const Browse = () => {
	return (
		<Container className="mx-auto">
			<div className="w-full pt-24">
				{/* Search & Filters */}
				<FilterBar />

				{/* Grid */}
				<NoteCardRepo />
			</div>
		</Container>
	);
};

export default Browse;
