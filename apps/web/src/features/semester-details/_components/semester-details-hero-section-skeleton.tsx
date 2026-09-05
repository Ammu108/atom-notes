const SemesterDetailsHeroSectionSkeleton = () => {
	return (
		<div>
			{/* Breadcrumb */}
			<nav className="flex items-center gap-1.5">
				<div className="h-4 w-4 animate-pulse rounded bg-slate-200" />
				<div className="h-4 w-10 animate-pulse rounded bg-slate-200" />
				<div className="h-3.5 w-3.5 animate-pulse rounded bg-slate-100" />
				<div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
			</nav>

			{/* Title + description + CTA */}
			<div className="flex flex-col gap-8">
				<div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
					<div className="flex max-w-2xl flex-col items-start justify-center gap-3">
						<div className="h-9 w-72 animate-pulse rounded-lg bg-slate-200 sm:h-10 sm:w-96" />
						<div className="flex w-full flex-col gap-2">
							<div className="h-4 w-full animate-pulse rounded bg-slate-100" />
							<div className="h-4 w-full animate-pulse rounded bg-slate-100" />
							<div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
						</div>
					</div>
				</div>

				{/* Navigate pills */}
				<div className="flex flex-wrap items-center gap-2">
					<div className="mr-1 h-3 w-16 animate-pulse rounded bg-slate-200" />
					{[1, 2, 3, 4, 5, 6].map((sem) => (
						<div
							className="h-9 w-16 animate-pulse rounded-full bg-slate-100"
							key={sem}
						/>
					))}
				</div>

				{/* Stats row */}
				<div className="grid grid-cols-1 divide-y divide-slate-100 rounded-2xl bg-white shadow-sm sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
					{[1, 2, 3, 4].map((stat) => (
						<div className="flex items-center gap-3 p-4" key={stat}>
							<div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-slate-100" />
							<div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default SemesterDetailsHeroSectionSkeleton;
