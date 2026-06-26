import Categories from "~/features/home/category-section";
import HeroSection from "~/features/home/hero-section";
import RecentlyAddedNotes from "~/features/home/recently-added-notes";

const Page = () => {
	return (
		<main>
			<HeroSection />
			<div className="flex flex-col gap-24">
				<Categories />
				<RecentlyAddedNotes />
			</div>
		</main>
	);
};

export default Page;
