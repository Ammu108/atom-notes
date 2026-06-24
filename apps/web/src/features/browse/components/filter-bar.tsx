"use client";

import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { Input } from "~/components/ui/input";
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

const FilterBar = () => {
	const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
	const [selectedSemesterId, setSelectedSemesterId] = useState<string | null>(
		null,
	);
	const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(
		null,
	);

	const { data: courses, isPending, isError } = useGetAllCourses();

	console.log("courses :", courses);

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
		<div className="mb-6 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row">
			<div className="relative flex-1">
				<IconSearch className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
				<Input
					className="rounded-lg border-gray-200 bg-gray-50 pl-9 focus-visible:ring-1 focus-visible:ring-gray-300"
					placeholder="Search notes..."
				/>
			</div>

			<Select
				onValueChange={(value) => setSelectedCourseId(value)}
				value={selectedCourseId}
			>
				<SelectTrigger className="w-full rounded-lg border-gray-200 bg-white sm:w-28">
					<SelectValue>{() => selectedCourseName ?? "Course"}</SelectValue>
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
					) : courses.length > 0 ? (
						courses?.map((item) => (
							<SelectItem key={item.id} value={item.id}>
								{item.name}
							</SelectItem>
						))
					) : (
						<div>
							<p>course not found!</p>
						</div>
					)}
				</SelectContent>
			</Select>

			<Select
				onValueChange={(value) => setSelectedSemesterId(value)}
				value={selectedSemesterId}
			>
				<SelectTrigger className="w-full rounded-lg border-gray-200 bg-white sm:w-28">
					<SelectValue>{() => selectedSemesterName ?? "Semester"}</SelectValue>
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

			<Select
				onValueChange={(value) => setSelectedSubjectId(value)}
				value={selectedSubjectId}
			>
				<SelectTrigger className="w-full rounded-lg border-gray-200 bg-white sm:max-w-54">
					<SelectValue>{() => subjectsName ?? "Select a subject"}</SelectValue>
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
		</div>
	);
};

export default FilterBar;
