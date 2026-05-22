import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "~/components/site-header";
import { buttonVariants } from "~/components/ui/button";
import { getCourseById } from "~/features/courses/api";
import CreateCoursesForm from "~/features/courses/components/create-courses-form";

interface PageProps {
	params: Promise<{ couseId: string }>;
}

const page = async ({ params }: PageProps) => {
	const { couseId } = await params;
	const course = await getCourseById(couseId);

	if (!course) {
		notFound();
	}

	return (
		<>
			<SiteHeader title="Edit Course" />
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
					<CreateCoursesForm course={course} courseId={course.id} />
				</div>
			</div>
		</>
	);
};

export default page;
