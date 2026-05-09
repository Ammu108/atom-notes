import Link from "next/link";
import { recentNotes } from "~/lib/recent-notes";

const RecentlyAddedNotes = () => {
	return (
		<section className="px-4">
			<div className="mb-8 flex flex-col gap-3">
				<h2 className="font-bold text-3xl text-foreground sm:text-4xl">
					Recently Added Notes
				</h2>
				<p className="max-w-2xl text-muted-foreground text-sm sm:text-base">
					Freshly uploaded notes for quick revision. Open any card to read the
					full detailed notes page.
				</p>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
							<span className="text-slate-500 text-xs">{note.updatedAt}</span>
						</div>

						<h3 className="font-semibold text-lg text-slate-900 transition-colors group-hover:text-slate-950">
							{note.title}
						</h3>
						<p className="mt-2 text-slate-600 text-sm">{note.subject}</p>

						<div className="mt-5 flex items-center justify-between text-slate-700 text-xs">
							<span>{note.chapterCount} chapters</span>
							<span>{note.readTime}</span>
						</div>

						<div className="mt-4 flex items-center gap-2 text-slate-800 text-sm">
							<span>Read detailed notes</span>
							<svg
								aria-hidden="true"
								className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
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

export default RecentlyAddedNotes;
