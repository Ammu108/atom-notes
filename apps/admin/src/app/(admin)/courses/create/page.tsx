import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "~/components/site-header";
import { buttonVariants } from "~/components/ui/button";
import CreateCoursesForm from "~/features/courses/components/create-courses-form";

const Courses = () => {
	return (
		<>
			<SiteHeader title="Create Courses" />
			<div className="flex flex-row items-center justify-start p-4">
				<Link
					className={buttonVariants({ variant: "default", size: "lg" })}
					href="/courses"
				>
					<ArrowLeft className="size-4" />
					Back
				</Link>
			</div>
			<div className="p-4 lg:p-6">
				<div className="flex flex-col gap-4">
					<CreateCoursesForm />
				</div>
			</div>
		</>
	);
};

export default Courses;
