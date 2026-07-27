import { Container } from "~/components/container";
import GetRemainingSemester from "~/features/semester-details/_components/get-remaining-semesters";
import SemesterDetailsPage from "~/features/semester-details/page";

interface PageProps {
	params: Promise<{
		semId: string;
	}>;
}

const SemesterDetails = async ({ params }: PageProps) => {
	const { semId } = await params;

	return (
		<Container className="mx-auto">
			<div className="flex w-full flex-col gap-6 pt-24">
				<SemesterDetailsPage semId={semId} />
				<GetRemainingSemester semId={semId} />
			</div>
		</Container>
	);
};

export default SemesterDetails;
