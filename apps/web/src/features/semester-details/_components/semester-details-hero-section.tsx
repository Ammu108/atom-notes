"use client";

import {
	BookOpen,
	Boxes,
	ChevronRight,
	FileCheck2,
	Home,
	Settings2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetAllSemestersByCourse, useGetSemesterOverview } from "../api";
import SemesterDetailsHeroSectionSkeleton from "./semester-details-hero-section-skeleton";

const SemesterDetailsHeroSection = ({
	courseSlug,
	semesterNumber,
}: {
	courseSlug: string;
	semesterNumber: number;
}) => {
	const router = useRouter();
	const {
		data: semesterOverview,
		isLoading: isOverviewLoading,
		isError: isOverviewError,
	} = useGetSemesterOverview({ courseSlug, semesterNumber });

	const {
		data: semesters,
		isLoading: isSemestersLoading,
		isError: isSemestersError,
	} = useGetAllSemestersByCourse();

	if (
		!semesterOverview ||
		!semesters ||
		isOverviewLoading ||
		isSemestersLoading
	) {
		return <SemesterDetailsHeroSectionSkeleton />;
	}

	if (isOverviewError || isSemestersError) {
		return <div>Error loading data</div>;
	}

	return (
		<div>
			{/* Breadcrumb */}
			<nav className="flex flex-wrap items-center gap-1.5 text-slate-500 text-sm">
				<Link
					className="flex flex-row items-center gap-1 hover:cursor-pointer hover:underline"
					href="/"
				>
					<Home className="h-4 w-4" />
					<p>Home</p>
				</Link>
				<ChevronRight className="h-3.5 w-3.5" />
				<span className="font-semibold">
					{" "}
					Semester {semesterOverview.activeSemester}
				</span>
			</nav>

			{/* Title + description + CTA */}
			<div className="flex flex-col gap-8">
				<div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
					<div className="flex max-w-2xl flex-col items-start justify-center gap-3">
						<h1 className="font-extrabold text-3xl text-slate-900 leading-tight sm:text-4xl">
							BCA — Semester {semesterOverview.activeSemester}
						</h1>
						<p className="text-slate-600 text-sm leading-relaxed sm:text-base">
							Complete syllabus breakdown, module units, past year question
							papers (PYQs), and high-yield examination question banks mapped to
							official university curricula.
						</p>
					</div>
				</div>

				{/* Navigate pills */}
				<div className="flex flex-wrap items-center gap-2">
					<span className="mr-1 font-semibold text-slate-400 text-xs tracking-wide">
						NAVIGATE:
					</span>
					{semesters.map((sem) => (
						<button
							className={`rounded-full px-4 py-2 font-semibold text-sm transition hover:cursor-pointer ${
								semesterNumber === sem.semesterNumber
									? "bg-[hsl(7,82%,45%)] text-white shadow-sm"
									: "border border-slate-200 bg-white text-slate-600 hover:border-slate-300"
							}`}
							key={sem.semesterNumber}
							onClick={() => router.push(`/semester-details/${sem.id}`)}
							type="button"
						>
							Sem{" "}
							{semesterNumber === sem.semesterNumber
								? `${sem.semesterNumber}`
								: sem.semesterNumber}
						</button>
					))}
				</div>

				{/* Stats row */}
				<div className="grid grid-cols-1 divide-y divide-slate-100 rounded-2xl bg-white shadow-sm sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
					<div className="flex items-center gap-3 p-4">
						<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[hsl(7,82%,94%)]">
							<BookOpen className="h-5 w-5 text-[hsl(7,82%,45%)]" />
						</span>
						<div className="flex flex-row items-center gap-2">
							<p className="font-bold text-base text-slate-900">
								{semesterOverview.totalSubjects}
							</p>
							<p className="font-bold text-base text-slate-900">Subjects</p>
						</div>
					</div>
					<div className="flex items-center gap-3 p-4">
						<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100">
							<Boxes className="h-5 w-5 text-[hsl(7,82%,45%)]" />
						</span>
						<div className="flex flex-row items-center gap-2">
							<p className="font-bold text-base text-slate-900">
								{semesterOverview.totalNotes}
							</p>
							<p className="font-bold text-base text-slate-900">Notes</p>
						</div>
					</div>
					<div className="flex items-center gap-3 p-4">
						<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100">
							<FileCheck2 className="h-5 w-5 text-[hsl(7,82%,45%)]" />
						</span>
						<div className="flex flex-row items-center gap-2">
							<p className="font-bold text-base text-slate-900">
								{semesterOverview.totalPyqs}
							</p>
							<p className="font-bold text-base text-slate-900">PYQs</p>
						</div>
					</div>
					<div className="flex items-center gap-3 p-4">
						<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-200">
							<Settings2 className="h-5 w-5 text-slate-600" />
						</span>
						<div className="flex flex-row items-center gap-2">
							<p className="font-bold text-base text-slate-400">Comming Soon</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SemesterDetailsHeroSection;
