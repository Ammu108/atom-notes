import Link from "next/link";
import { notFound } from "next/navigation";
import { semesters } from "~/lib/notes-catalog";

type SemesterPageProps = {
	params: Promise<{ semester: string }>;
};

const SemesterPage = async ({ params }: SemesterPageProps) => {
	const { semester } = await params;
	const selectedSemester = semesters.find((item) => item.slug === semester);

	if (!selectedSemester) {
		notFound();
	}

	return (
		<main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 pt-24">
			<div className="flex flex-col gap-3">
				<Link
					className="w-fit text-slate-600 text-sm transition-colors hover:text-slate-900"
					href="/browse"
				>
					← Back to semesters
				</Link>
				<h1 className="font-bold text-3xl text-slate-900 sm:text-4xl">
					{selectedSemester.name} Subjects
				</h1>
				<p className="max-w-3xl text-slate-600 text-sm sm:text-base">
					Click any subject card to start studying. Each card lists chapter-wise
					notes available for quick revision.
				</p>
			</div>

			<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
				{selectedSemester.subjects.map((subject) => (
					<article
						className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
						key={subject.slug}
					>
						<div className="mb-4 flex items-center justify-between gap-3">
							<h2 className="font-semibold text-slate-900 text-xl">
								{subject.name}
							</h2>
							<span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-slate-700 text-xs">
								{subject.chapters.length} chapters
							</span>
						</div>

						<ul className="space-y-2">
							{subject.chapters.map((chapter) => (
								<li
									className="flex items-start gap-2 text-slate-700 text-sm"
									key={chapter}
								>
									<span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" />
									<span>{chapter}</span>
								</li>
							))}
						</ul>
					</article>
				))}
			</div>
		</main>
	);
};

export default SemesterPage;
