export function NoteCardSkeleton() {
	return (
		<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
			<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_6px_25px_rgba(15,23,42,0.08)]">
				{/* Top badges row */}
				<div className="mb-4 flex items-center justify-between gap-3">
					<div className="h-6 w-24 animate-pulse rounded-full bg-slate-100" />
					<div className="h-6 w-20 animate-pulse rounded-full bg-slate-100" />
				</div>

				{/* Title */}
				<div className="h-6 w-3/4 animate-pulse rounded-md bg-slate-100" />

				{/* Subject */}
				<div className="mt-2 h-4 w-1/2 animate-pulse rounded-md bg-slate-100" />

				{/* Description — 2 lines */}
				<div className="mt-2 space-y-1.5">
					<div className="h-4 w-full animate-pulse rounded-md bg-slate-100" />
					<div className="h-4 w-5/6 animate-pulse rounded-md bg-slate-100" />
				</div>

				{/* CTA row */}
				<div className="mt-4 flex items-center gap-2">
					<div className="h-4 w-32 animate-pulse rounded-md bg-slate-100" />
					<div className="h-4 w-4 animate-pulse rounded-md bg-slate-100" />
				</div>
			</div>

			<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_6px_25px_rgba(15,23,42,0.08)]">
				{/* Top badges row */}
				<div className="mb-4 flex items-center justify-between gap-3">
					<div className="h-6 w-24 animate-pulse rounded-full bg-slate-100" />
					<div className="h-6 w-20 animate-pulse rounded-full bg-slate-100" />
				</div>

				{/* Title */}
				<div className="h-6 w-3/4 animate-pulse rounded-md bg-slate-100" />

				{/* Subject */}
				<div className="mt-2 h-4 w-1/2 animate-pulse rounded-md bg-slate-100" />

				{/* Description — 2 lines */}
				<div className="mt-2 space-y-1.5">
					<div className="h-4 w-full animate-pulse rounded-md bg-slate-100" />
					<div className="h-4 w-5/6 animate-pulse rounded-md bg-slate-100" />
				</div>

				{/* CTA row */}
				<div className="mt-4 flex items-center gap-2">
					<div className="h-4 w-32 animate-pulse rounded-md bg-slate-100" />
					<div className="h-4 w-4 animate-pulse rounded-md bg-slate-100" />
				</div>
			</div>

			<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_6px_25px_rgba(15,23,42,0.08)]">
				{/* Top badges row */}
				<div className="mb-4 flex items-center justify-between gap-3">
					<div className="h-6 w-24 animate-pulse rounded-full bg-slate-100" />
					<div className="h-6 w-20 animate-pulse rounded-full bg-slate-100" />
				</div>

				{/* Title */}
				<div className="h-6 w-3/4 animate-pulse rounded-md bg-slate-100" />

				{/* Subject */}
				<div className="mt-2 h-4 w-1/2 animate-pulse rounded-md bg-slate-100" />

				{/* Description — 2 lines */}
				<div className="mt-2 space-y-1.5">
					<div className="h-4 w-full animate-pulse rounded-md bg-slate-100" />
					<div className="h-4 w-5/6 animate-pulse rounded-md bg-slate-100" />
				</div>

				{/* CTA row */}
				<div className="mt-4 flex items-center gap-2">
					<div className="h-4 w-32 animate-pulse rounded-md bg-slate-100" />
					<div className="h-4 w-4 animate-pulse rounded-md bg-slate-100" />
				</div>
			</div>
		</div>
	);
}
