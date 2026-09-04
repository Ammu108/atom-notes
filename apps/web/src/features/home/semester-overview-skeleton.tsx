function SkeletonCard() {
	return (
		<div className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
			<div>
				<div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
				<div className="mt-2 h-3 w-16 animate-pulse rounded bg-slate-100" />
			</div>

			<div className="mt-6 flex items-center justify-between">
				<div className="h-6 w-20 animate-pulse rounded-lg bg-slate-100" />
				<div className="h-5 w-5 animate-pulse rounded bg-slate-100" />
			</div>
		</div>
	);
}

const SemesterOverviewSkeleton = () => {
	return (
		<div className="mx-auto w-full">
			<section className="flex w-full flex-col gap-8">
				<div className="flex flex-col gap-5 lg:flex-row">
					{/* Left info panel */}
					<div className="relative w-full overflow-hidden rounded-2xl bg-slate-50 p-6 lg:w-72 lg:shrink-0">
						<div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-slate-100/60" />

						<div className="relative flex flex-col gap-6">
							<div className="h-12 w-12 animate-pulse rounded-xl bg-slate-200" />

							<div>
								<div className="h-5 w-16 animate-pulse rounded bg-slate-200" />
								<div className="mt-2 h-3 w-40 animate-pulse rounded bg-slate-100" />
							</div>

							<div className="flex flex-col gap-3">
								<div className="flex items-center justify-between rounded-lg bg-white/60 px-4 py-3">
									<div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
									<div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
								</div>
								<div className="flex items-center justify-between rounded-lg bg-white/60 px-4 py-3">
									<div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
									<div className="h-3 w-14 animate-pulse rounded bg-slate-200" />
								</div>
							</div>
						</div>
					</div>

					{/* Semester grid */}
					<div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
						{[1, 2, 3, 4, 5, 6].map((item) => (
							<SkeletonCard key={item} />
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default SemesterOverviewSkeleton;
