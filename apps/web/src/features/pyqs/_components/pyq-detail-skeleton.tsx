import { Skeleton } from "~/components/ui/skeleton";

const PyqDetailSkeleton = () => {
	return (
		<div className="w-full pt-20 md:pt-24">
			<div className="space-y-6">
				<div className="space-y-6 p-6 md:p-8">
					<div className="space-y-4">
						<Skeleton className="h-9 w-full max-w-2xl rounded-xl md:h-10" />
						<div className="space-y-2">
							<Skeleton className="h-4 w-full max-w-3xl" />
							<Skeleton className="h-4 w-11/12 max-w-2xl" />
						</div>
					</div>

					<div className="flex flex-wrap gap-2">
						<Skeleton className="h-7 w-16 rounded-full" />
						<Skeleton className="h-7 w-24 rounded-full" />
						<Skeleton className="h-7 w-20 rounded-full" />
						<Skeleton className="h-7 w-28 rounded-full" />
					</div>

					<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
						{[1, 2, 3, 4, 5].map((row) => (
							<div className="rounded-lg border p-4" key={row}>
								<div className="flex items-center gap-3">
									<Skeleton className="h-5 w-5 rounded-full" />
									<div className="flex-1 space-y-2">
										<Skeleton className="h-3 w-12" />
										<Skeleton className="h-4 w-20" />
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="mt-6 grid gap-6 md:grid-cols-[2fr_1fr]">
					<div className="space-y-6">
						<div className="rounded-2xl border bg-card shadow-sm">
							<div className="space-y-5 p-5 md:p-6">
								<div className="space-y-2">
									<Skeleton className="h-6 w-48" />
									<Skeleton className="h-4 w-72 max-w-full" />
								</div>

								<div className="space-y-4">
									{[1, 2, 3, 4].map((row) => (
										<div
											className="rounded-xl border bg-background p-4"
											key={row}
										>
											<div className="flex gap-4">
												<Skeleton className="h-10 w-10 shrink-0 rounded-full" />
												<div className="flex-1 space-y-3 pt-1">
													<Skeleton className="h-4 w-full" />
													<Skeleton className="h-4 w-5/6" />
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

					<div className="h-fit space-y-4 md:sticky md:top-24">
						<div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
							<div className="space-y-4 bg-primary p-6 text-primary-foreground">
								<Skeleton className="h-8 w-56 bg-primary-foreground/20" />
								<Skeleton className="h-4 w-48 bg-primary-foreground/20" />
							</div>

							<div className="space-y-6 p-6">
								<div className="flex flex-col items-center gap-2">
									<Skeleton className="h-4 w-10" />
									<Skeleton className="h-12 w-28" />
									<Skeleton className="h-4 w-24" />
								</div>

								<div className="space-y-3">
									{[1, 2, 3, 4, 5].map((row) => (
										<div className="flex items-center gap-3" key={row}>
											<Skeleton className="h-5 w-5 rounded-full" />
											<Skeleton className="h-4 flex-1" />
										</div>
									))}
								</div>

								<div className="space-y-3">
									<Skeleton className="h-11 w-full rounded-md" />
									<Skeleton className="h-10 w-full rounded-lg" />
								</div>

								<div className="rounded-lg border p-4">
									<Skeleton className="h-5 w-32" />
									<div className="mt-4 space-y-3">
										{[1, 2, 3, 4, 5, 6].map((row) => (
											<div
												className="flex items-center justify-between gap-4"
												key={row}
											>
												<Skeleton className="h-4 w-20" />
												<Skeleton className="h-4 w-16" />
											</div>
										))}
									</div>
								</div>

								<div className="rounded-lg bg-primary/5 p-4 text-center">
									<Skeleton className="mx-auto h-7 w-7 rounded-full" />
									<div className="mt-3 space-y-2">
										<Skeleton className="h-4 w-full" />
										<Skeleton className="mx-auto h-4 w-4/5" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PyqDetailSkeleton;
