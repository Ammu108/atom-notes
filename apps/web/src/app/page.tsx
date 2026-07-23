import Faqs from "~/features/home/faqs";
import HeroSection from "~/features/home/hero-section";
import SemesterOverView from "~/features/home/semester-overview";
import WhyStudentsLoveUs from "~/features/home/why-students-love-us";

const Page = () => {
	return (
		<main>
			<HeroSection />
			<div className="flex flex-col gap-24">
				<WhyStudentsLoveUs />
				<SemesterOverView />
				<Faqs />
			</div>
		</main>
	);
};

export default Page;
