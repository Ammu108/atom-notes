import { Container } from "~/components/container";
import SemesterOverview from "./semester-overview";

const SemesterOverViewSection = () => {
	return (
		<Container className="mx-auto">
			<section className="flex w-full flex-col gap-8">
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-3">
						<h2 className="font-bold text-3xl text-foreground sm:text-4xl">
							Semester Overview
						</h2>
						<p className="max-w-2xl text-muted-foreground text-sm sm:text-base">
							Explore the subjects and unit available for each semester,
							providing a comprehensive overview of the academic content.
						</p>
					</div>
				</div>

				<div className="w-full p-4">
					<SemesterOverview />
				</div>
			</section>
		</Container>
	);
};

export default SemesterOverViewSection;
