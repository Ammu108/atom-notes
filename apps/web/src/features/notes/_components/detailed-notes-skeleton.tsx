const DetailedNoteSkeleton = () => {
	return (
		<div className="w-full pt-20 md:pt-24">
			<div className="flex flex-col gap-10 pb-16 md:flex-row md:px-6">
				<div className="flex-1 space-y-6">
					<div className="mt-3 mb-3 flex flex-wrap gap-2">
						<div className="h-7 w-24 animate-pulse rounded-full bg-muted" />
						<div className="h-7 w-20 animate-pulse rounded-full bg-muted" />
						<div className="h-7 w-28 animate-pulse rounded-full bg-muted" />
					</div>

					<div className="space-y-3">
						<div className="h-12 w-3/4 animate-pulse rounded-xl bg-muted" />
						<div className="flex flex-col gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 md:flex-row md:items-center">
							<div className="h-5 w-5 animate-pulse rounded-full bg-green-200" />
							<div className="flex-1 space-y-2">
								<div className="h-3 w-full animate-pulse rounded-full bg-green-100" />
								<div className="h-3 w-4/5 animate-pulse rounded-full bg-green-100" />
							</div>
							<div className="hidden size-6 animate-pulse rounded-full bg-green-100 md:block" />
						</div>
					</div>

					{/* <div className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-sm"> */}
					<div className="space-y-3">
						<div className="h-5 w-1/3 animate-pulse rounded-full bg-muted" />
						<div className="h-4 w-full animate-pulse rounded-full bg-muted" />
						<div className="h-4 w-11/12 animate-pulse rounded-full bg-muted" />
						<div className="h-4 w-5/6 animate-pulse rounded-full bg-muted" />
					</div>

					<div className="space-y-3">
						<div className="h-44 animate-pulse rounded-xl bg-muted" />
						<div className="grid gap-3 md:grid-cols-2">
							<div className="h-24 animate-pulse rounded-xl bg-muted" />
							<div className="h-24 animate-pulse rounded-xl bg-muted" />
						</div>
						<div className="h-32 animate-pulse rounded-xl bg-muted" />
						<div className="space-y-2">
							<div className="h-4 w-full animate-pulse rounded-full bg-muted" />
							<div className="h-4 w-5/6 animate-pulse rounded-full bg-muted" />
							<div className="h-4 w-2/3 animate-pulse rounded-full bg-muted" />
						</div>
						<div className="h-10 w-40 animate-pulse rounded-full bg-muted" />
					</div>
					{/* </div> */}
				</div>

				<div className="md:w-1/3">
					<div className="sticky top-28 space-y-4">
						<div className="h-24 animate-pulse rounded-xl bg-gray-900/90" />
						<div className="space-y-4 rounded-xl border border-border bg-card p-5 shadow-sm">
							<div className="space-y-2">
								<div className="h-8 w-24 animate-pulse rounded-full bg-muted" />
								<div className="h-3 w-40 animate-pulse rounded-full bg-muted" />
							</div>
							<div className="h-10 w-full animate-pulse rounded-md bg-muted" />
							<div className="space-y-3 border-gray-100 pt-1">
								<div className="h-3 w-36 animate-pulse rounded-full bg-muted" />
								<div className="space-y-2">
									<div className="h-3 w-full animate-pulse rounded-full bg-muted" />
									<div className="h-3 w-11/12 animate-pulse rounded-full bg-muted" />
									<div className="h-3 w-10/12 animate-pulse rounded-full bg-muted" />
								</div>
							</div>
							<div className="h-8 w-full animate-pulse rounded-md bg-muted" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailedNoteSkeleton;
