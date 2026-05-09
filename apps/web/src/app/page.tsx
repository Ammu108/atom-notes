import Categories from "~/features/home/category-section";
import HeroSection from "~/features/home/hero-section";
import RecentlyAddedNotes from "~/features/home/recently-added-notes";

const Page = () => {
	return (
		<main>
			<HeroSection />
			<div className="mx-auto flex max-w-6xl flex-col gap-16">
				<Categories />
				<RecentlyAddedNotes />
			</div>
		</main>
	);
};

export default Page;
