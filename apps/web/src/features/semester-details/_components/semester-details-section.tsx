"use client";

import { AlertCircle, Download } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { useGetAllSubjectsBySemesterId } from "../api";
import SemesterDetailSkeleton from "./semester-details-skeleton";

const SemesterDetailsSection = ({ semId }: { semId: string }) => {
	const {
		data: subjects,
		isLoading: unitsLoading,
		isError: unitsError,
	} = useGetAllSubjectsBySemesterId(semId);

	if (unitsLoading || !subjects) {
		return <SemesterDetailSkeleton />;
	}

	if (unitsError) {
		return (
			<div className="flex h-96 w-full items-center justify-center rounded-2xl bg-card p-6 shadow-sm">
				<div className="flex items-center gap-2 text-slate-500">
					<AlertCircle className="h-5 w-5" />
					<p className="font-medium">Failed to load semester details.</p>
				</div>
			</div>
		);
	}

	return (
		<div>
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				{/* Main subject card */}
				<div className="flex flex-col gap-6 lg:col-span-2">
					{subjects.map((subject) => (
						<div
							className="rounded-2xl border bg-white p-7 shadow-sm"
							key={subject.id}
						>
							{/* Subject name */}
							<h2 className="font-bold text-2xl text-slate-950">
								{subject.subjectName}
							</h2>

							{/* Module heading */}
							<p className="mt-8 mb-4 font-semibold text-slate-400 text-sm uppercase tracking-wide">
								Syllabus Units ({subject.units.length} Modules)
							</p>

							{/* Units */}
							<Accordion className="flex flex-col gap-3">
								{subject.units.map((unit, index) => (
									<AccordionItem
										className="rounded-xl border-none bg-slate-50 px-4"
										key={unit.id}
										value={unit.id}
									>
										<AccordionTrigger className="py-4 hover:cursor-pointer hover:no-underline [&>svg]:text-slate-400">
											<div className="flex w-full flex-col gap-2 pr-2 text-left sm:flex-row sm:items-center sm:justify-between">
												{/* Unit title */}
												<div className="flex items-start gap-2">
													<span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-accent-foreground/20 font-bold text-[10px] text-accent-foreground">
														U{index + 1}
													</span>

													<span className="font-semibold text-slate-800 text-sm">
														{unit.unitTitle}
													</span>
												</div>

												{/* Stats */}
												<div className="flex shrink-0 items-center gap-2 pl-7 sm:pl-0">
													<span className="rounded-md bg-slate-200/70 px-2.5 py-1 font-medium text-slate-600 text-xs">
														Notes: {unit.totalNotes}
													</span>

													<span className="rounded-md bg-[hsl(7,82%,94%)] px-2.5 py-1 font-semibold text-[hsl(7,82%,42%)] text-xs">
														PYQs {unit.totalPyqs}
													</span>
												</div>
											</div>
										</AccordionTrigger>

										<AccordionContent className="pb-4 pl-7 text-slate-500 text-sm">
											{unit.unitDescription}
										</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						</div>
					))}
				</div>

				{/* Sidebar */}
				<div className="flex flex-col gap-6 lg:col-span-1">
					{/* Exam Accelerator */}
					<div className="rounded-2xl bg-linear-to-br from-[hsl(7,82%,55%)] to-[hsl(7,82%,38%)] p-6 shadow-sm">
						<span className="inline-block rounded-md bg-white/20 px-3 py-1 font-bold text-[11px] text-white tracking-wide">
							EXAM ACCELERATOR
						</span>

						<h3 className="mt-4 font-bold text-lg text-white leading-snug">
							Top 60 High-Yield Repeated Questions
						</h3>

						<p className="mt-3 text-sm text-white/85 leading-relaxed">
							Curated questions repeated 3+ times across university exams
							between 2018–2024 with detailed mark-scoring solution rubrics.
						</p>

						<Button
							className="mt-6 w-full bg-white text-slate-900"
							disabled
							size="sm"
						>
							<Download className="h-4 w-4" />
							Download Curated 60-Q Bank
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SemesterDetailsSection;
