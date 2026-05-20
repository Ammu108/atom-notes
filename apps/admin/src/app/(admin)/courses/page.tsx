import Link from "next/link";
import { Suspense } from "react";
import { SiteHeader } from "~/components/site-header";
import { buttonVariants } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { CoursesTable } from "~/features/courses/components/courses-table";
import { CoursesTableSkeleton } from "~/features/courses/components/courses-table-skeleton";
import { api } from "~/trpc/server";

async function CoursesTableAsync() {
	const courses = await api.courses.getAllCourses();
	return <CoursesTable courses={courses} />;
}

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
					<Card>
						<CardHeader className="gap-3">
							<CardTitle>Courses Directory</CardTitle>
						</CardHeader>
						<CardContent>
							<Suspense fallback={<CoursesTableSkeleton />}>
								<CoursesTableAsync />
							</Suspense>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
};

export default Courses;
