import Link from "next/link";
import { SiteHeader } from "~/components/site-header";
import { buttonVariants } from "~/components/ui/button";
import { CoursesTable } from "~/features/courses/components/courses-table";

const Courses = () => {
	return (
		<>
			<SiteHeader title="All Courses" />
			<div className="flex flex-row items-center justify-end p-4">
				<Link
					className={buttonVariants({ variant: "default", size: "lg" })}
					href="/courses/create"
				>
					Create Course
				</Link>
			</div>
			<div className="p-4 lg:p-6">
				<div className="flex flex-col gap-4">
					<CoursesTable />
				</div>
			</div>
		</>
	);
};

export default Courses;
