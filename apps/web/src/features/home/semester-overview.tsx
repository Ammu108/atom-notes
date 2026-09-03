"use client";

import { ArrowRight, GraduationCap } from "lucide-react";
import { Container } from "~/components/container";
import { useGetAllSemesterDetails, useGetAllSemesters } from "./api";

function SemesterCard({
	semesterNumber,
	subjects,
	totalResources,
}: {
	semesterNumber: number | null;
	subjects: number;
	totalResources: number;
}) {
	const active = totalResources > 0;

	return (
		<div
			className={`flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm ${
				active ? "" : "opacity-70"
			}`}
		>
			<div>
				<h3
					className={`font-medium text-base ${
						active ? "text-slate-800" : "text-slate-400"
					}`}
				>
					Semester {semesterNumber}
				</h3>
				<p
					className={`mt-1 text-sm ${
						active ? "text-slate-500" : "text-slate-400"
					}`}
				>
					{subjects} Subjects
				</p>
			</div>

			<div className="mt-6 flex items-center justify-between">
				<span
					className={`rounded-lg px-3 py-1.5 font-semibold text-xs ${
						active ? "bg-primary/10 text-primary" : "bg-slate-50 text-slate-400"
					}`}
				>
					{totalResources} Resources
				</span>
				<ArrowRight
					className={`h-5 w-5 ${active ? "text-slate-400" : "text-slate-300"}`}
				/>
			</div>
		</div>
	);
}

const SemesterOverView = () => {
	const {
		data: semestersData,
		isLoading,
		isError,
	} = useGetAllSemesterDetails();
	const {
		data: semesters,
		isLoading: isSemestersLoading,
		isError: isSemestersError,
	} = useGetAllSemesters();

	if (!semestersData || isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error loading semester details.</div>;
	}

	if (!semesters || isSemestersLoading) {
		return <div>Loading semesters...</div>;
	}

	if (isSemestersError) {
		return <div>Error loading semesters.</div>;
	}

	return (
		<Container className="mx-auto">
			<section className="flex w-full flex-col gap-8">
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-3">
						<h2 className="font-bold text-3xl text-foreground sm:text-4xl">
							Semester Overview
						</h2>
						<p className="max-w-2xl text-muted-foreground text-sm sm:text-base">
							Explore the subjects and unit available for each semester,
							providing a comprehensive overview of the academic content.
						</p>
					</div>
				</div>

				<div className="w-full p-4">
					<div className="flex flex-col gap-5 lg:flex-row">
						{/* Left info panel */}
						<div className="relative w-full overflow-hidden rounded-2xl bg-linear-to-br from-[hsl(7,82%,96%)] to-[hsl(7,82%,91%)] p-6 lg:w-72 lg:shrink-0">
							{/* decorative circle */}
							<div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[hsl(7,82%,85%)]/40" />

							<div className="relative flex flex-col gap-6">
								<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-md">
									<GraduationCap
										className="h-6 w-6 text-white"
										strokeWidth={2}
									/>
								</div>

								<div>
									<h2 className="font-semibold text-slate-800 text-xl">BCA</h2>
									<p className="mt-1 text-slate-500 text-sm leading-snug">
										Bachelor of Computer Applications
									</p>
								</div>

								<div className="flex flex-col gap-3">
									<div className="flex items-center justify-between rounded-lg bg-white/60 px-4 py-3">
										<span className="text-slate-500 text-sm">Duration</span>
										<span className="font-semibold text-slate-800 text-sm">
											{semestersData.totalSemesters} Semesters
										</span>
									</div>
									<div className="flex items-center justify-between rounded-lg bg-white/60 px-4 py-3">
										<span className="text-slate-500 text-sm">Resources</span>
										<span className="font-semibold text-slate-800 text-sm">
											{semestersData.totalResources}+
										</span>
									</div>
								</div>
							</div>
						</div>

						{/* Semester grid */}
						<div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
							{semesters.map((sem) => (
								<div key={sem.id}>
									<SemesterCard
										semesterNumber={sem.semesterNumber}
										subjects={sem.totalSubjects}
										totalResources={sem.totalResources}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</Container>
	);
};

export default SemesterOverView;
