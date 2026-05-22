"use client";

import { EllipsisVerticalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ConfirmActionDialog } from "~/components/confirm-action-dialog";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import { useDeleteCourse } from "../hooks/use-course";
import type { COURSE_TYPE } from "../types";

interface CoursesTableProps {
	courses: COURSE_TYPE[];
}

export function CoursesTable({ courses }: CoursesTableProps) {
	const router = useRouter();
	const deleteCourseMutaion = useDeleteCourse();
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [selectedCourse, setSelectedCourse] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleNavigateToCourse = (courseId: string) => {
		router.push(`/courses/${courseId}`);
	};

	const handleDeleteCourse = (courseId: string, courseName: string) => {
		setSelectedCourse({ id: courseId, name: courseName });
		setDeleteDialogOpen(true);
	};

	const handleDeleteConfirm = async () => {
		if (!selectedCourse) return;

		try {
			await deleteCourseMutaion.mutateAsync({ id: selectedCourse.id });
			router.refresh();
			setSelectedCourse(null);
			setDeleteDialogOpen(false);
		} catch {
			// Error toast is handled by the mutation hook.
		}
	};

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Total Semesters</TableHead>
					<TableHead>Total Subjects</TableHead>
					<TableHead>Created At</TableHead>
					<TableHead className="text-right">Action</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{courses.length === 0 ? (
					<TableRow>
						<TableCell className="text-center" colSpan={5}>
							No courses found.
						</TableCell>
					</TableRow>
				) : (
					courses.map((course) => (
						<TableRow key={course.id}>
							<TableCell className="font-medium">{course.name}</TableCell>
							<TableCell>{course.totalSemesters}</TableCell>
							<TableCell>{course.totalSubjects}</TableCell>
							<TableCell>
								{course.createdAt.toLocaleDateString("en-US", {
									year: "numeric",
									month: "short",
									day: "numeric",
								})}
							</TableCell>
							<TableCell className="text-right">
								<DropdownMenu>
									<DropdownMenuTrigger
										render={
											<Button size="icon" variant="ghost">
												<EllipsisVerticalIcon className="size-4" />
												<span className="sr-only">Open actions</span>
											</Button>
										}
									></DropdownMenuTrigger>
									<DropdownMenuContent align="end" className="w-40">
										<DropdownMenuItem
											onClick={() => handleNavigateToCourse(course.id)}
										>
											Edit Course
										</DropdownMenuItem>
										<DropdownMenuItem
											className="text-destructive"
											onClick={() => handleDeleteCourse(course.id, course.name)}
										>
											Delete Course
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>

			<ConfirmActionDialog
				cancelText="Cancel"
				confirmDisabled={!selectedCourse}
				confirmLoading={deleteCourseMutaion.isPending}
				confirmText="Continue"
				description={`This action is permanent and cannot be undone. ${deleteCourseMutaion.data?.course.name ?? "This course"} will be deleted from the system.`}
				onCancel={() => setSelectedCourse(null)}
				onConfirm={handleDeleteConfirm}
				onOpenChange={setDeleteDialogOpen}
				open={deleteDialogOpen}
				title="Delete course permanently?"
			/>
		</Table>
	);
}
