const PyqCardSkeleton = () => {
	return (
		<div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
			{/* Card header */}
			<div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
				<div className="flex flex-wrap items-center gap-3">
					<div className="h-6 w-40 animate-pulse rounded-md bg-stone-200" />
					<div className="h-5 w-20 animate-pulse rounded-full bg-stone-150 bg-stone-200" />
					<div className="h-5 w-14 animate-pulse rounded-full bg-stone-200" />
					<div className="h-5 w-12 animate-pulse rounded-full bg-stone-200" />
				</div>

				<div className="flex items-center gap-3">
					<div className="h-8 w-28 animate-pulse rounded-lg bg-stone-200" />
					<div className="h-8 w-36 animate-pulse rounded-lg bg-stone-200" />
				</div>
			</div>

			{/* Question rows */}
			{/* {expanded && (
				<>
					<div className="divide-y divide-stone-100 border-stone-100 border-t">
						{["a", "b", "c"].map((key) => (
							<div className="flex items-start gap-4 px-6 py-4" key={key}>
								<div className="mt-0.5 size-6 shrink-0 animate-pulse rounded-full bg-stone-200" />
								<div className="flex w-full flex-col gap-2">
									<div className="h-3.5 w-full animate-pulse rounded bg-stone-200" />
									<div className="h-3.5 w-2/3 animate-pulse rounded bg-stone-200" />
								</div>
							</div>
						))}
					</div>

					<div className="flex items-center gap-2 border-stone-100 border-t bg-stone-50 px-6 py-3">
						<div className="h-4 w-4 animate-pulse rounded bg-stone-200" />
						<div className="h-3.5 w-64 animate-pulse rounded bg-stone-200" />
					</div>
				</>
			)} */}
		</div>
	);
};

export default PyqCardSkeleton;
