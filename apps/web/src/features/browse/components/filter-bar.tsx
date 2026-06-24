"use client";

import { IconXFilled } from "@tabler/icons-react";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "~/components/ui/input-group";
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
	const [search, setSearch] = useState("");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
	const [selectedSemesterId, setSelectedSemesterId] = useState<string | null>(
		null,
	);
	const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(
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

	const [debouncedSearch] = useDebounce(search, 500);

	useEffect(() => {
		const params = new URLSearchParams(searchParams);

		if (debouncedSearch.trim()) {
			params.set("search", debouncedSearch);
		} else {
			params.delete("search");
		}

		if (selectedCourseName) {
			params.set("course", selectedCourseName);
		} else {
			params.delete("course");
		}

		if (selectedSemesterName) {
			params.set("sem", selectedSemesterName.toString());
		} else {
			params.delete("sem");
		}

		if (subjectsName) {
			params.set("sub", subjectsName);
		} else {
			params.delete("sub");
		}

		router.replace(`${pathname}?${params.toString()}`);
	}, [
		debouncedSearch,
		pathname,
		router,
		searchParams,
		selectedCourseName,
		selectedSemesterName,
		subjectsName,
	]);

	const handleClearSearch = () => {
		const params = new URLSearchParams(searchParams);
		setSearch("");
		params.delete("search");
	};

	return (
		<div className="mb-6 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row">
			<div className="relative flex-1">
				<InputGroup>
					<InputGroupAddon align="inline-start">
						<SearchIcon className="text-muted-foreground" />
					</InputGroupAddon>
					<InputGroupInput
						id="inline-start-input"
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search..."
						value={search}
					/>
					{search && (
						<InputGroupAddon
							align="inline-end"
							className="hover:cursor-pointer"
							onClick={handleClearSearch}
						>
							<IconXFilled />
						</InputGroupAddon>
					)}
				</InputGroup>
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
					<SelectValue>{() => subjectsName ?? "Subject"}</SelectValue>
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
