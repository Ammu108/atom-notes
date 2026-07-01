import { Container } from "~/components/container";
import PyqsHeroSection from "~/features/pyqs/_components/pyqs-hero-section";
import PyqsPage from "~/features/pyqs/page";

const page = () => {
	return (
		<Container className="mx-auto">
			<div className="flex w-full flex-col gap-6 pt-24">
				<PyqsHeroSection />
				<PyqsPage />
			</div>
		</Container>
	);
};

export default page;
