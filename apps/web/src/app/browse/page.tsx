import Link from "next/link";
import { semesters } from "~/lib/notes-catalog";

const Browse = () => {
	return (
		<main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 pt-24">
			<div className="flex flex-col gap-2">
				<h1 className="font-bold text-3xl text-slate-900 sm:text-4xl">
					Browse Semesters
				</h1>
				<p className="max-w-2xl text-slate-600 text-sm sm:text-base">
					Choose a semester to view all subjects and chapter-wise notes.
				</p>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{semesters.map((semester) => (
					<Link
						className="rounded-xl border border-slate-200 bg-white px-4 py-5 text-slate-900 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
						href={`/browse/${semester.slug}`}
						key={semester.slug}
					>
						<p className="font-semibold text-base">{semester.name}</p>
						<p className="mt-1 text-slate-600 text-sm">
							{semester.subjects.length} subjects
						</p>
					</Link>
				))}
			</div>
		</main>
	);
};

export default Browse;
