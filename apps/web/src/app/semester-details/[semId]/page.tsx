import { Container } from "~/components/container";
import SemesterDetailsHeroSection from "~/features/semester-details/_components/semester-details-hero-section";
import SemesterDetailsSection from "~/features/semester-details/_components/semester-details-section";

interface PageProps {
	params: Promise<{
		semId: string;
	}>;
}

const SemesterDetails = async ({ params }: PageProps) => {
	const { semId } = await params;

	return (
		<Container className="mx-auto">
			<div className="flex w-full flex-col gap-12 pt-24">
				<SemesterDetailsHeroSection semId={semId} />
				<SemesterDetailsSection semId={semId} />
			</div>
		</Container>
	);
};

export default SemesterDetails;
