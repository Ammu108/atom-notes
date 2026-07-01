"use client";

import type { PyqsFormValues } from "@repo/validators";
import { Layers3 } from "lucide-react";
import { useState } from "react";
import { type Control, Controller } from "react-hook-form";
import { CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Field, FieldLabel } from "~/components/ui/field";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import {
	useGetAllCourses,
	useGetAllSemesters,
	useGetAllSubjects,
} from "../api";

interface AcademicClassificationProps {
	control: Control<PyqsFormValues>;
	selectedSubjectId: string | null;
}

const AcademicPyqClassification = ({
	control,
	selectedSubjectId,
}: AcademicClassificationProps) => {
	const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
	const [selectedSemesterId, setSelectedSemesterId] = useState<string | null>(
		null,
	);

	const { data: courses, isPending, isError } = useGetAllCourses();

	const selectedCourseName = courses?.find(
		(course) => course.id === selectedCourseId,
	)?.name;

	const {
		data: semestersData,
		isPending: isSmestersPending,
		isError: isSemestersError,
	} = useGetAllSemesters(selectedCourseId ?? undefined);
	const selectedSemesterName = semestersData?.find(
		(sem) => sem.id === selectedSemesterId,
	)?.number;

	const {
		data: subjectsData,
		isPending: isSubjectsPending,
		isError: isSubjectsError,
	} = useGetAllSubjects(selectedSemesterId ?? undefined);
	const subjectsName = subjectsData?.find(
		(sub) => sub.id === selectedSubjectId,
	)?.name;

	return (
		<div>
			<CardHeader className="px-5 py-4">
				<div className="flex items-center gap-2">
					<Layers3 className="h-4 w-4 text-muted-foreground" />
					<CardTitle className="font-semibold text-sm">
						Academic Classification
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="grid gap-5 p-5 lg:grid-cols-3">
				<div className="space-y-2">
					<FieldLabel htmlFor="input-field-slug">Course</FieldLabel>
					<Select
						onValueChange={(value) => setSelectedCourseId(value)}
						value={selectedCourseId}
					>
						<SelectTrigger className="w-full">
							<SelectValue>
								{() => selectedCourseName ?? "Select a course"}
							</SelectValue>
						</SelectTrigger>
						<SelectContent>
							{isPending ? (
								<div className="py-2">
									<p className="text-muted-foreground">Loading...</p>
								</div>
							) : isError ? (
								<div>
									<p>error fetching courses</p>
								</div>
							) : (
								courses?.map((item) => (
									<SelectItem key={item.id} value={item.id}>
										{item.name}
									</SelectItem>
								))
							)}
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2">
					<FieldLabel htmlFor="input-field-slug">Semester</FieldLabel>
					<Select
						onValueChange={(value) => setSelectedSemesterId(value)}
						value={selectedSemesterId}
					>
						<SelectTrigger className="w-full">
							<SelectValue>
								{() => selectedSemesterName ?? "Select a semester"}
							</SelectValue>
						</SelectTrigger>
						<SelectContent>
							{isSmestersPending ? (
								<div className="py-2">
									<p className="text-muted-foreground">
										Please select a course first.
									</p>
								</div>
							) : isSemestersError ? (
								<div>
									<p>error fetching semesters</p>
								</div>
							) : (
								semestersData?.map((item) => (
									<SelectItem key={item.id} value={item.id}>
										Semester {item.number}
									</SelectItem>
								))
							)}
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2">
					<Controller
						control={control}
						name="subjectId"
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="input-field-slug">Subject</FieldLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger className="w-full">
										<SelectValue>
											{() => subjectsName ?? "Select a subject"}
										</SelectValue>
									</SelectTrigger>
									<SelectContent>
										{isSubjectsPending ? (
											<div className="py-2">
												<p className="text-muted-foreground">
													Please select a semester first.
												</p>
											</div>
										) : isSubjectsError ? (
											<div>
												<p>error fetching subjects</p>
											</div>
										) : (
											subjectsData?.map((item) => (
												<SelectItem key={item.id} value={item.id}>
													{item.name}
												</SelectItem>
											))
										)}
									</SelectContent>
								</Select>
							</Field>
						)}
					/>
				</div>
			</CardContent>
		</div>
	);
};

export default AcademicPyqClassification;
