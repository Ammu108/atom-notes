"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useGetRemainingSemesters } from "../api";

type RemainingSemestersListProps = {
	semId: string;
};

const RemainingSemestersList = ({ semId }: RemainingSemestersListProps) => {
	const { data: remainingSemesters = [], isLoading } =
		useGetRemainingSemesters(semId);

	// Safety net in case the API ever returns the current semester too
	const semesters = remainingSemesters.filter((sem) => sem.id !== semId);

	if (isLoading) {
		return (
			<div className="mt-14">
				<div className="mb-5 h-6 w-48 animate-pulse rounded-md bg-muted" />
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					{Array.from({ length: 3 }).map((_, i) => (
						<div
							className="h-40 animate-pulse rounded-xl border border-border bg-muted/40"
							// biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
							key={i}
						/>
					))}
				</div>
			</div>
		);
	}

	if (semesters.length === 0) {
		return null;
	}

	return (
		<div className="mt-14">
			<h2 className="mb-5 font-semibold text-foreground text-xl">
				Explore other semesters
			</h2>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				{semesters.map((sem) => (
					<Link
						className="group flex flex-col items-start rounded-xl border border-border bg-white p-5 text-left transition-colors hover:border-foreground/20 hover:bg-muted/20"
						href={`/semester-details/${sem.id}`}
						key={sem.id}
						type="button"
					>
						<div className="mb-3 flex w-full items-start justify-between">
							<span className="inline-block rounded-md bg-destructive/10 px-3 py-1 font-medium text-destructive text-sm">
								Semester {sem.semesterNumber}
							</span>
							<ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default RemainingSemestersList;
