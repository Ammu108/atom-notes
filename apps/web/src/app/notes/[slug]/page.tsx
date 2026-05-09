import { Button } from "@repo/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRecentNoteBySlug } from "~/lib/recent-notes";

type NoteDetailPageProps = {
	params: Promise<{ slug: string }>;
};

const NoteDetailPage = async ({ params }: NoteDetailPageProps) => {
	const { slug } = await params;
	const note = getRecentNoteBySlug(slug);

	if (!note) {
		notFound();
	}

	return (
		<main className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-10 pt-24 lg:grid-cols-[minmax(0,1fr)_290px]">
			<article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
				<Link
					className="mb-5 inline-flex w-fit text-slate-600 text-sm transition-colors hover:text-slate-900"
					href="/"
				>
					← Back to home
				</Link>

				<div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
					<span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-slate-700">
						{note.semester}
					</span>
					<span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-slate-700">
						{note.subject}
					</span>
					<span className="text-slate-500">{note.updatedAt}</span>
				</div>

				<h1 className="font-bold text-3xl text-slate-900 leading-tight sm:text-4xl">
					{note.title}
				</h1>
				<p className="mt-3 text-slate-600 text-sm sm:text-base">
					{note.chapterCount} chapters • {note.readTime}
				</p>

				<div className="mt-8 space-y-8">
					{note.sections.map((section) => (
						<section
							className="scroll-mt-24"
							id={section.title}
							key={section.title}
						>
							<h2 className="border-slate-200 border-b pb-2 font-semibold text-slate-900 text-xl">
								{section.title}
							</h2>
							<div className="mt-4 space-y-3 text-slate-700 text-sm leading-7 sm:text-base">
								{section.content.map((paragraph) => (
									<p key={paragraph}>{paragraph}</p>
								))}
							</div>
						</section>
					))}
				</div>
			</article>

			<aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
				<p className="font-semibold text-slate-900 text-sm uppercase tracking-wide">
					Download Options
				</p>
				<p className="mt-2 text-slate-600 text-sm">
					Export this note in PDF format for offline study.
				</p>

				<div className="mt-5 flex flex-col gap-3">
					<a download href={note.pdfUrl}>
						<Button className="w-full" variant="primary">
							Download Full PDF
						</Button>
					</a>
					<a download href={note.pdfUrl}>
						<Button className="w-full" variant="outline">
							Download Summary PDF
						</Button>
					</a>
				</div>

				<div className="mt-6 border-slate-200 border-t pt-4">
					<p className="mb-2 font-medium text-slate-900 text-sm">
						On this page
					</p>
					<ul className="space-y-2">
						{note.sections.map((section) => (
							<li key={section.title}>
								<a
									className="text-slate-600 text-sm transition-colors hover:text-slate-900"
									href={`#${section.title}`}
								>
									{section.title}
								</a>
							</li>
						))}
					</ul>
				</div>
			</aside>
		</main>
	);
};

export default NoteDetailPage;
