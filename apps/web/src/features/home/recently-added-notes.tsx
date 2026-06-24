"use client";

import { Button } from "@repo/ui";
import { IconArrowNarrowRight, IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container } from "~/components/container";
import { recentNotes } from "~/lib/recent-notes";

const RecentlyAddedNotes = () => {
	const router = useRouter();

	const hadnleNavigateToBrowse = () => {
		router.push("/browse");
	};

	return (
		<Container className="mx-auto">
			<section className="flex w-full flex-col gap-8">
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-3">
						<h2 className="font-bold text-3xl text-foreground sm:text-4xl">
							Latest Notes
						</h2>
						<p className="max-w-2xl text-muted-foreground text-sm sm:text-base">
							Freshly uploaded notes for quick revision. Open any card to read
							the full detailed notes.
						</p>
					</div>
					<div>
						<Link href={"/browse"}>
							<Button
								onClick={hadnleNavigateToBrowse}
								size="xs"
								variant="outline"
							>
								View all
								<IconChevronRight />
							</Button>
						</Link>
					</div>
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
			</section>
		</Container>
	);
};

export default RecentlyAddedNotes;
