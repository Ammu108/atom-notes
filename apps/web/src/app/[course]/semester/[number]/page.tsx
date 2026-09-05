import { Container } from "~/components/container";
import SemesterDetailsHeroSection from "~/features/semester-details/_components/semester-details-hero-section";
import SemesterDetailsSection from "~/features/semester-details/_components/semester-details-section";

interface PageProps {
	params: Promise<{
		course: string;
		number: string;
	}>;
}

const page = async ({ params }: PageProps) => {
	const { course, number } = await params;

	const semesterNumberInt = Number(number);

	console.log("courseSlug:", course);
	console.log("semesterNumber:", semesterNumberInt);

	return (
		<Container className="mx-auto">
			<div className="flex w-full flex-col gap-12 pt-24">
				<SemesterDetailsHeroSection
					courseSlug={course}
					semesterNumber={semesterNumberInt}
				/>
				<SemesterDetailsSection
					courseSlug={course}
					semesterNumber={semesterNumberInt}
				/>
			</div>
		</Container>
	);
};

export default page;
