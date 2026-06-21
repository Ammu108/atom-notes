"use client";

import { IconArrowNarrowRight, IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { Container } from "~/components/container";
import { Input } from "~/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { recentNotes } from "~/lib/recent-notes";

const semesters = ["All Semesters", "Semester 3", "Semester 4", "Semester 5"];
const subjects = [
	"All Subjects",
	"Algorithms",
	"Computer Networks",
	"Database Systems",
	"Operating Systems",
	"Machine Learning",
	"Data Structures",
];
const units = ["All Units", "Unit 1", "Unit 2", "Unit 3", "Unit 4"];

const Browse = () => {
	const [semester, _setSemester] = useState("All Semesters");
	const [subject, _setSubject] = useState("All Subjects");
	const [unit, _setUnit] = useState("All Units");

	return (
		<Container className="mx-auto">
			<div className="w-full pt-24">
				{/* Search & Filters */}
				<div className="mb-6 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row">
					<div className="relative flex-1">
						<IconSearch className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
						<Input
							className="rounded-lg border-gray-200 bg-gray-50 pl-9 focus-visible:ring-1 focus-visible:ring-gray-300"
							placeholder="Search notes..."
						/>
					</div>

					<Select value={semester}>
						<SelectTrigger className="w-full rounded-lg border-gray-200 bg-white sm:w-44">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{semesters.map((s) => (
								<SelectItem key={s} value={s}>
									{s}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Select value={subject}>
						<SelectTrigger className="w-full rounded-lg border-gray-200 bg-white sm:w-44">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{subjects.map((s) => (
								<SelectItem key={s} value={s}>
									{s}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Select value={unit}>
						<SelectTrigger className="w-full rounded-lg border-gray-200 bg-white sm:w-36">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{units.map((u) => (
								<SelectItem key={u} value={u}>
									{u}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Grid */}
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{recentNotes.map((note) => (
						<Link
							className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_6px_25px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_10px_30px_rgba(15,23,42,0.14)]"
							href={`/notes/${note.slug}`}
							key={note.slug}
						>
							<div className="mb-4 flex items-center justify-between gap-3">
								<span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-slate-700 text-xs">
									{note.semester}
								</span>
								<span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-slate-700 text-xs">
									Unit {note.unit}
								</span>
							</div>

							<h3 className="font-semibold text-lg text-slate-900 transition-colors group-hover:text-slate-950">
								{note.title}
							</h3>
							<p className="mt-2 font-medium text-slate-700 text-sm">
								{note.subject}
							</p>
							<p className="mt-2 text-slate-600 text-sm">{note.description}</p>

							<div className="mt-4 flex items-center gap-2 text-slate-800 text-sm">
								<p className="font-medium text-primary hover:underline">
									Read detailed notes
								</p>
								<IconArrowNarrowRight className="text-primary" size="18" />
							</div>
						</Link>
					))}
				</div>
			</div>
		</Container>
	);
};

export default Browse;
