"use client";

import { CloudUpload, FileText, Layers3 } from "lucide-react";
import { useState } from "react";
import Tiptap from "~/components/tiptap";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";
import {
	useGetAllCourses,
	useGetAllSemesters,
	useGetAllSubjects,
	useGetAllUnits,
} from "../api";

const CreateNotesForm = () => {
	const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
	const [selectedSemesterId, setSelectedSemesterId] = useState<string | null>(
		null,
	);
	const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(
		null,
	);
	const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);

	const { data: courses, isPending, isError } = useGetAllCourses();
	const selectedCourseName = courses?.find(
		(course) => course.id === selectedCourseId,
	)?.name;

	const {
		data: selectedCourse,
		isPending: isSmestersPending,
		isError: isSemestersError,
	} = useGetAllSemesters(selectedCourseId ?? undefined);
	const semesters = selectedCourse?.semesters ?? [];
	const selectedSemesterName = semesters.find(
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

	const {
		data: unitsData,
		isPending: isUnitsPending,
		isError: isUnitsError,
	} = useGetAllUnits(selectedSubjectId ?? undefined);
	const unitsName = unitsData?.find((unit) => unit.id === selectedUnitId)?.name;

	return (
		<>
			<Card>
				<CardContent className="grid gap-5 p-5 lg:grid-cols-2">
					<div className="space-y-2">
						<Field>
							<FieldLabel htmlFor="input-field-title">Title</FieldLabel>
							<Input
								id="input-field-title"
								placeholder="Enter note title"
								type="text"
							/>
						</Field>
					</div>

					<div className="space-y-2">
						<Field>
							<FieldLabel htmlFor="input-field-title">Meta Title</FieldLabel>
							<Input
								id="input-field-title"
								placeholder="Enter note title"
								type="text"
							/>
							<FieldDescription>70 characters max</FieldDescription>
						</Field>
					</div>

					<div className="space-y-2">
						<Field>
							<FieldLabel htmlFor="input-field-title">
								Meta Description
							</FieldLabel>
							<Input
								id="input-field-title"
								placeholder="Enter note title"
								type="text"
							/>
							<FieldDescription>160 characters max</FieldDescription>
						</Field>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="px-5 py-4">
					<div className="flex items-center gap-2">
						<Layers3 className="h-4 w-4" />
						<CardTitle className="font-semibold text-sm">
							Academic Classification
						</CardTitle>
					</div>
				</CardHeader>
				<CardContent className="grid gap-5 p-5 lg:grid-cols-4">
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
									<div>
										<p>loading..</p>
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
									<div>
										<p>loading..</p>
									</div>
								) : isSemestersError ? (
									<div>
										<p>error fetching semesters</p>
									</div>
								) : (
									semesters.map((item) => (
										<SelectItem key={item.id} value={item.id}>
											Semester {item.number}
										</SelectItem>
									))
								)}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<FieldLabel htmlFor="input-field-slug">Subject</FieldLabel>
						<Select
							onValueChange={(value) => setSelectedSubjectId(value)}
							value={selectedSubjectId}
						>
							<SelectTrigger className="w-full">
								<SelectValue>
									{() => subjectsName ?? "Select a subject"}
								</SelectValue>
							</SelectTrigger>
							<SelectContent>
								{isSubjectsPending ? (
									<div>
										<p>loading...</p>
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
					</div>

					<div className="space-y-2 lg:col-span-1">
						<FieldLabel htmlFor="input-field-slug">Unit / Chapter</FieldLabel>
						<Select
							onValueChange={(value) => setSelectedUnitId(value)}
							value={selectedUnitId}
						>
							<SelectTrigger className="w-full">
								<SelectValue>{() => unitsName ?? "Select a unit"}</SelectValue>
							</SelectTrigger>
							<SelectContent>
								{isUnitsPending ? (
									<div>
										<p>loading...</p>
									</div>
								) : isUnitsError ? (
									<div>
										<p>error fetching units</p>
									</div>
								) : (
									unitsData?.map((item) => (
										<SelectItem key={item.id} value={item.id}>
											{item.name}
										</SelectItem>
									))
								)}
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card>

			{/*Rich  Text Editor */}

			<Card>
				<Tiptap />
			</Card>

			<Card>
				<CardHeader className="px-5 py-4">
					<div className="flex items-center gap-2">
						<FileText className="h-4 w-4" />
						<CardTitle className="font-semibold text-sm">
							PDF & Monetization
						</CardTitle>
					</div>
				</CardHeader>

				<CardContent className="grid gap-5 p-5 lg:grid-cols-[1.2fr_0.8fr]">
					<div className="flex flex-col justify-between rounded-lg border border-input border-dashed p-4 dark:bg-input/30">
						<div className="mb-3 flex flex-row items-center justify-between">
							<Label className="font-medium text-muted-foreground text-sm">
								PDF Upload (Optional)
							</Label>
							<Badge className="rounded-full bg-background" variant="secondary">
								DOC
							</Badge>
						</div>
						<div className="flex min-h-32 items-center justify-center rounded-lg border border-input border-dashed p-4 text-center">
							<div className="flex flex-col items-center gap-2">
								<div className="flex h-11 w-11 items-center justify-center rounded-full bg-background">
									<CloudUpload className="h-5 w-5" />
								</div>
								<div className="font-medium text-muted-foreground text-sm">
									upload-notes.pdf
								</div>
								<div className="text-muted-foreground text-xs">24.2 MB</div>
								<div className="text-muted-foreground text-xs">Complete</div>
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-4">
						<div className="flex items-center justify-between rounded-lg border border-input px-4 py-3 dark:bg-input/30">
							<div>
								<p className="font-medium text-muted-foreground text-sm">
									Paid?
								</p>
							</div>
							<Switch id="airplane-mode" />
						</div>

						<div className="flex flex-col gap-4">
							<div className="rounded-lg border border-input p-4 dark:bg-input/30">
								<p className="mb-2 font-medium text-muted-foreground text-sm">
									Price (INR)
								</p>
								<Input
									className="h-11 rounded-lg border border-input px-4 text-sm dark:bg-input/30"
									defaultValue="49"
								/>
							</div>
						</div>

						<div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 text-sm">
							Automatic watermark protection will be applied to the PDF.
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Submit Button */}
			<div className="space-y-2">
				<div className="flex gap-3">
					<Button className="w-full" type="submit">
						Create Notes
					</Button>
				</div>
			</div>
		</>
	);
};

export default CreateNotesForm;
