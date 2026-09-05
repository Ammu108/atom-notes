import Faqs from "~/features/home/faqs";
import HeroSection from "~/features/home/hero-section";
import SemesterOverViewSection from "~/features/home/semester-overview-section";
import WhyStudentsLoveUs from "~/features/home/why-students-love-us";

const Page = () => {
	return (
		<main>
			<HeroSection />
			<div className="flex flex-col gap-24">
				<WhyStudentsLoveUs />
				<SemesterOverViewSection />
				<Faqs />
			</div>
		</main>
	);
};

export default Page;
