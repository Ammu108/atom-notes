import Link from "next/link";
import { semesters } from "~/lib/notes-catalog";

const Categories = () => {
	return (
		<section className="px-4">
			<div className="mb-10 flex flex-col gap-3">
				<h2 className="font-bold text-3xl text-foreground sm:text-4xl">
					Browse Notes by Semester
				</h2>
				<p className="max-w-2xl text-muted-foreground text-sm sm:text-base">
					Pick your semester to explore subjects and chapter-wise notes in one
					organized place.
				</p>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{semesters.map((semester, index) => (
					<Link
						className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white px-5 py-6 shadow-[0_8px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_12px_38px_rgba(15,23,42,0.14)]"
						href={`/browse/${semester.slug}`}
						key={semester.slug}
					>
						<div className="absolute -top-5 -right-5 h-20 w-20 rounded-full bg-slate-100/80 transition-transform duration-300 group-hover:scale-110" />
						<div className="relative z-10 flex items-start justify-between gap-4">
							<div className="flex flex-col gap-2">
								<p className="font-semibold text-lg text-slate-900">
									{semester.name}
								</p>
								<p className="text-slate-600 text-sm">
									{semester.subjects.length} subjects available
								</p>
							</div>
							<div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700">
								<span className="font-semibold text-sm">{index + 1}</span>
							</div>
						</div>

						<div className="relative z-10 mt-6 flex items-center gap-2 text-slate-700 text-sm transition-colors group-hover:text-slate-950">
							<span>Open semester notes</span>
							<svg
								aria-hidden="true"
								className="h-4 w-4"
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.8}
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M5 12h14" />
								<path d="m13 6 6 6-6 6" />
							</svg>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
};

export default Categories;
