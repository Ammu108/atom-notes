import { Forward } from "lucide-react";
import { Container } from "~/components/container";
import { SEMESTER_OVERVIEW } from "~/lib/constant";

const SemesterOverView = () => {
	return (
		<Container className="mx-auto">
			<section className="flex w-full flex-col gap-8">
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-3">
						<h2 className="font-bold text-3xl text-foreground sm:text-4xl">
							Semester Overview
						</h2>
						<p className="max-w-2xl text-muted-foreground text-sm sm:text-base">
							Explore the subjects and chapters available for each semester,
							providing a comprehensive overview of the academic content.
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{SEMESTER_OVERVIEW.map((item) => {
						return (
							<div
								className="flex cursor-pointer flex-col gap-4 rounded-2xl border border-border bg-background p-6 shadow-[0_6px_25px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_10px_30px_rgba(15,23,42,0.14)]"
								key={item.id}
							>
								<div className="flex items-center justify-between">
									<div className="rounded-xl bg-primary/10 px-3 py-1">
										<h3 className="font-medium text-base text-primary">
											{item.semester}
										</h3>
									</div>
									<div className="">
										<Forward className="h-6 w-6 text-muted-foreground" />
									</div>
								</div>

								<p className="font-semibold text-foreground text-lg leading-6">
									{item.title}
								</p>

								<div className="flex flex-wrap gap-2">
									{item.tags.map((tag) => (
										<span
											className="rounded-full border border-border bg-accent px-3 py-1 font-medium text-accent-foreground text-xs"
											key={tag}
										>
											{tag}
										</span>
									))}
								</div>
							</div>
						);
					})}
				</div>
			</section>
		</Container>
	);
};

export default SemesterOverView;
