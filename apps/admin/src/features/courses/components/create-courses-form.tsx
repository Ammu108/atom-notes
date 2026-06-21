"use client";

import { BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { useCourseCreation, useCourseUpdate } from "../hooks/use-course";
import { initializeSemesters, type Semester } from "../utils/course-form-utils";
import CreateSemesterCard from "./create-semester-card";

type CreateCoursesFormProps = {
	course?: {
		id: string;
		name: string;
		slug: string;
		semesters?: Array<{
			id: string;
			number: number;
			subjects?: Array<{
				id: string;
				name: string;
				units?: Array<{ id: string; name: string }>;
				chapters?: Array<{ id: string; name: string }>;
			}>;
		}>;
	};

	courseId?: string;
};

const createSlug = (text: string) =>
	text
		.toLowerCase()
		.normalize("NFC")
		.replace(/[^a-z0-9\s-]/g, "")
		.trim()
		.replace(/[\s_]+/g, "-")
		.replace(/-+/g, "-");

const normalizeSemesters = (
	semesters?: CreateCoursesFormProps["course"] extends infer Course
		? Course extends { semesters?: infer CourseSemesters }
			? CourseSemesters
			: never
		: never,
): Semester[] => {
	if (!semesters) {
		return [];
	}

	return semesters.map((semester) => ({
		id: semester.id,
		number: semester.number,
		subjects: (semester.subjects ?? []).map((subject) => ({
			id: subject.id,
			name: subject.name,
			units: (subject.units ?? subject.chapters ?? []).map((unit) => ({
				id: unit.id,
				name: unit.name,
			})),
		})),
	}));
};

const CreateCoursesForm = ({ course }: CreateCoursesFormProps) => {
	const initialSemesters =
		course?.semesters && course.semesters.length > 0
			? normalizeSemesters(course.semesters)
			: [{ id: "sem-1", number: 1, subjects: [] }];

	const [courseName, setCourseName] = useState(course?.name ?? "");
	const [semesterCount, setSemesterCount] = useState<number | "">(
		initialSemesters.length,
	);
	const [submitError, setSubmitError] = useState("");
	const [semesters, setSemesters] = useState<Semester[]>(initialSemesters);
	const createCourseMutation = useCourseCreation();
	const updateCourseMutation = useCourseUpdate();
	const router = useRouter();
	const isEditMode = !!course?.id;

	const handleSemesterCountChange = (count: number) => {
		setSemesterCount(count);
		setSemesters((prev) => initializeSemesters(count, prev));
	};

	const coursePayload = useMemo(
		() => ({
			name: courseName.trim(),
			slug: createSlug(courseName),
			semesters: semesters.map((semester) => ({
				number: semester.number,
				subjects: (semester.subjects ?? []).map((subject) => ({
					name: subject.name.trim(),
					units: (subject.units ?? []).map((unit) => ({
						name: unit.name.trim(),
					})),
				})),
			})),
		}),
		[courseName, semesters],
	);

	const isFormComplete = useMemo(() => {
		return (
			courseName.trim().length > 0 &&
			semesters.length > 0 &&
			semesters.every(
				(semester) =>
					(semester.subjects ?? []).length > 0 &&
					(semester.subjects ?? []).every(
						(subject) =>
							subject.name.trim().length > 0 &&
							(subject.units ?? []).length > 0 &&
							(subject.units ?? []).every(
								(unit) => unit.name.trim().length > 0,
							),
					),
			)
		);
	}, [courseName, semesters]);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setSubmitError("");

		if (!isFormComplete) {
			toast.error(
				"Add at least one subject and one unit to every semester before saving.",
			);

			return;
		}

		try {
			if (isEditMode) {
				if (!course?.id) {
					toast.error("Course not found");
					return;
				}

				await updateCourseMutation.mutateAsync({
					courseId: course.id,
					...coursePayload,
				});

				router.push("/courses");
				return;
			}

			await createCourseMutation.mutateAsync(coursePayload);
			setCourseName("");
			setSemesterCount(1);
			setSemesters([
				{
					id: "sem-1",
					number: 1,
					subjects: [],
				},
			]);

			router.push("/courses");
		} catch {
			toast.error(
				isEditMode ? "Unable to update course." : "Unable to create course.",
			);
		}
	};

	return (
		<form className="space-y-5" onSubmit={handleSubmit}>
			{/* Basic Course Info */}
			<Card>
				<CardHeader className="px-5 py-4">
					<div className="flex items-center gap-2">
						<BookOpen className="h-4 w-4" />
						<CardTitle className="font-semibold text-sm">
							Course Information
						</CardTitle>
					</div>
				</CardHeader>
				<CardContent className="grid gap-5 p-5 lg:grid-cols-2">
					<div className="space-y-2">
						<Field>
							<FieldLabel htmlFor="course-name">Course Name</FieldLabel>
							<Input
								id="course-name"
								onChange={(e) => setCourseName(e.target.value)}
								placeholder="e.g., B.Tech, BCA, MCA"
								type="text"
								value={courseName}
							/>
						</Field>
					</div>

					<div className="space-y-2">
						<Field>
							<FieldLabel htmlFor="semester-count">
								Number of Semesters
							</FieldLabel>
							<Input
								id="semester-count"
								max="16"
								min="1"
								onChange={(e) =>
									handleSemesterCountChange(
										e.target.value ? parseInt(e.target.value, 10) : 1,
									)
								}
								placeholder="e.g., 8"
								type="number"
								value={semesterCount}
							/>
							<FieldDescription>Maximum 16 semesters</FieldDescription>
						</Field>
					</div>
				</CardContent>
			</Card>

			{/* Semesters and Subjects */}
			{semesters.map((semester) => (
				<CreateSemesterCard
					key={semester.id}
					semester={semester}
					setSemesters={setSemesters}
				/>
			))}

			{/* Submit Button */}
			<div className="space-y-2">
				{submitError ? (
					<p className="text-destructive text-sm">{submitError}</p>
				) : null}
				<div className="flex gap-3">
					<Button
						className="w-full"
						disabled={
							!isFormComplete ||
							createCourseMutation.isPending ||
							updateCourseMutation.isPending
						}
						type="submit"
					>
						{isEditMode
							? updateCourseMutation.isPending
								? "Updating..."
								: "Update Course"
							: createCourseMutation.isPending
								? "Saving..."
								: "Save Course"}
					</Button>
				</div>
			</div>
		</form>
	);
};

export default CreateCoursesForm;
