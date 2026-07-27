"use client";

import type { AccordionValue } from "@base-ui/react/accordion";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Container } from "~/components/container";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "~/components/ui/accordion";
import { api } from "~/trpc/react";
import { useGetAllUnits } from "./api";

const SemesterDetailsPage = ({ semId }: { semId: string }) => {
	const courseId = "9f2e604f-ba36-4a83-934d-b929a7850b35";

	const [selectedSubjectIds, setSelectedSubjectIds] = useState<AccordionValue>(
		[],
	);
	const selectedSubjectId = selectedSubjectIds[0] ?? null;

	const { data: subjects = [], isLoading } =
		api.courses.getSubjectsBySemester.useQuery({
			courseId,
			semesterId: semId,
		});

	const { data: units = [], isLoading: isLoadingUnits } = useGetAllUnits(
		selectedSubjectId ?? undefined,
	);

	if (isLoading) {
		return (
			<Container className="mx-auto">
				<div className="flex w-full flex-col gap-6 pt-24">
					<div className="mb-8 h-12 animate-pulse rounded-md bg-muted" />
					<div className="flex flex-col gap-3">
						{Array.from({ length: 3 }).map((_, i) => (
							<div
								className="h-16 animate-pulse rounded-xl border border-border bg-muted/40"
								// biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
								key={i}
							/>
						))}
					</div>
				</div>
			</Container>
		);
	}

	return (
		<div>
			{/* Header */}
			<div className="mb-8 flex flex-col items-start justify-start gap-2">
				<div className="flex items-center justify-center gap-2">
					<Link
						className="flex items-center justify-center hover:cursor-pointer hover:underline"
						href="/"
					>
						<ChevronLeft className="h-6 w-6 stroke-2 text-muted-foreground" />
						<p className="font-medium text-lg text-muted-foreground">Back</p>
					</Link>
					/
					<span className="inline-block rounded-md bg-destructive/10 px-3 py-1 font-medium text-destructive text-sm">
						Semester {subjects[0]?.semester}
					</span>
				</div>

				<div>
					<h1 className="font-bold text-3xl text-foreground tracking-tight">
						Subjects & Units
					</h1>
					<p className="text-muted-foreground text-sm">
						{subjects.length} subject{subjects.length !== 1 ? "s" : ""} in this
						semester
					</p>
				</div>
			</div>

			{subjects.length === 0 ? (
				<div className="rounded-xl border border-border bg-muted/30 p-6 text-center">
					<p className="text-muted-foreground text-sm">
						No subjects found for this semester yet.
					</p>
				</div>
			) : (
				<Accordion
					className="flex flex-col gap-3"
					onValueChange={setSelectedSubjectIds}
					value={selectedSubjectIds}
				>
					{subjects.map((subject) => {
						const isOpen = selectedSubjectId === subject.id;
						return (
							<AccordionItem
								className="overflow-hidden rounded-xl border border-border bg-white data-open:border-foreground/15"
								key={subject.id}
								value={subject.id}
							>
								<AccordionTrigger className="group flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-base text-foreground hover:bg-muted/10 data-open:bg-muted/30">
									<span>{subject.name}</span>
									<ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-open:rotate-90" />
								</AccordionTrigger>

								<AccordionContent className="border-border border-t px-2 pb-2">
									{isOpen &&
										(isLoadingUnits ? (
											<div className="flex flex-col gap-2 p-2">
												{Array.from({ length: 2 }).map((_, i) => (
													<div
														className="h-11 animate-pulse rounded-lg bg-muted/10"
														// biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
														key={i}
													/>
												))}
											</div>
										) : units.length === 0 ? (
											<p className="px-3 py-4 text-muted-foreground text-sm">
												No units found for this subject.
											</p>
										) : (
											<div className="flex flex-col gap-0.5 pt-1">
												{units.map((unit) => (
													<button
														className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left transition-colors hover:bg-muted/10"
														key={unit.id}
														type="button"
													>
														<div className="flex items-center gap-3">
															<FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
															<span className="text-foreground text-sm">
																{unit.name}
															</span>
														</div>
													</button>
												))}
											</div>
										))}
								</AccordionContent>
							</AccordionItem>
						);
					})}
				</Accordion>
			)}
		</div>
	);
};

export default SemesterDetailsPage;
