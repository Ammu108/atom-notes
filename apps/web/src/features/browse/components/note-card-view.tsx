import { IconArrowNarrowRight } from "@tabler/icons-react";
import Link from "next/link";
import { Card, CardContent } from "~/components/ui/card";
import type { NOTE_TYPE } from "../types";

interface NoteCardProps {
	note: NOTE_TYPE[];
}

const NoteCardView = ({ note }: NoteCardProps) => {
	return (
		<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{note.map((note) => (
				<Link href={`/notes/${note.slug}`} key={note.id}>
					<Card className="rounded-2xl">
						<CardContent className="flex flex-col gap-4">
							<div className="flex items-center justify-between gap-3">
								<span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-slate-700 text-xs">
									semester {note.semester}
								</span>
								<span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-slate-700 text-xs">
									Unit - {note.chapter}
								</span>
							</div>

							<div>
								<h3 className="font-semibold text-lg text-slate-900 transition-colors group-hover:text-slate-950">
									{note.title}
								</h3>
								<p className="mt-2 font-medium text-slate-700 text-sm">
									{note.subject}
								</p>
								<p className="mt-2 text-slate-600 text-sm">
									{note.description}
								</p>
							</div>

							<div className="flex items-center gap-2 text-slate-800 text-sm">
								<p className="font-medium text-primary hover:underline">
									Read detailed notes
								</p>
								<IconArrowNarrowRight className="text-primary" size="18" />
							</div>
						</CardContent>
					</Card>
				</Link>
			))}
		</div>
	);
};

export default NoteCardView;
