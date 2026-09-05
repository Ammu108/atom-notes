const SemesterDetailSkeleton = () => {
	return (
		<div>
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				{/* Main subject card */}
				<div className="rounded-2xl bg-card p-6 shadow-sm lg:col-span-2">
					<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
						<div className="h-7 w-72 animate-pulse rounded-lg bg-slate-200 sm:w-96" />
					</div>

					<div className="mt-7 mb-3 h-3 w-40 animate-pulse rounded bg-slate-200" />

					<div className="flex flex-col gap-3">
						{[1, 2, 3, 4].map((i) => (
							<div className="rounded-xl bg-slate-50 px-4 py-4" key={i}>
								<div className="flex w-full flex-col gap-3 pr-2 sm:flex-row sm:items-center sm:justify-between">
									<div className="flex items-start gap-2">
										<div className="mt-0.5 h-5 w-5 shrink-0 animate-pulse rounded bg-slate-200" />
										<div className="h-4 w-48 animate-pulse rounded bg-slate-200" />
									</div>
									<div className="flex shrink-0 items-center gap-2 pl-7 sm:pl-0">
										<div className="h-6 w-16 animate-pulse rounded-md bg-slate-200" />
										<div className="h-6 w-16 animate-pulse rounded-md bg-slate-100" />
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Sidebar */}
				<div className="flex flex-col gap-6">
					<div className="rounded-2xl bg-white p-6 shadow-sm">
						<div className="mb-2 flex items-center gap-2">
							<div className="h-5 w-5 animate-pulse rounded bg-slate-200" />
							<div className="h-4 w-44 animate-pulse rounded bg-slate-200" />
						</div>
						<div className="mb-5 flex flex-col gap-2">
							<div className="h-3 w-full animate-pulse rounded bg-slate-100" />
							<div className="h-3 w-full animate-pulse rounded bg-slate-100" />
							<div className="h-3 w-2/3 animate-pulse rounded bg-slate-100" />
						</div>

						<div className="mb-4">
							<div className="mb-1.5 flex items-center justify-between">
								<div className="h-3 w-36 animate-pulse rounded bg-slate-200" />
								<div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
							</div>
						</div>
						<div className="mb-5">
							<div className="mb-1.5 flex items-center justify-between">
								<div className="h-3 w-40 animate-pulse rounded bg-slate-200" />
								<div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
							</div>
						</div>

						<div className="rounded-xl bg-card-50 p-4">
							<div className="mb-3 h-3 w-36 animate-pulse rounded bg-slate-200" />
							<div className="flex flex-col gap-3">
								{[1, 2, 3].map((i) => (
									<div className="flex gap-2" key={i}>
										<div className="mt-0.5 h-3.5 w-3.5 shrink-0 animate-pulse rounded-full bg-slate-200" />
										<div className="h-3 w-full animate-pulse rounded bg-slate-100" />
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SemesterDetailSkeleton;
