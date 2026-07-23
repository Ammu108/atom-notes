import { Container } from "~/components/container";
import { WHY_STUDENTS_LOVE_US } from "~/lib/constant";

const WhyStudentsLoveUs = () => {
	return (
		<Container className="mx-auto">
			<section className="flex w-full flex-col gap-8">
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-3">
						<h2 className="font-bold text-3xl text-foreground sm:text-4xl">
							Why Students Love Us
						</h2>
						<p className="max-w-2xl text-muted-foreground text-sm sm:text-base">
							Focused on what matters most: your academic success through
							distraction free learning.
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{WHY_STUDENTS_LOVE_US.map((item) => {
						const Icon = item.icon;

						return (
							<div
								className="rounded-2xl border border-border bg-background p-6 transition-colors hover:border-primary/30"
								key={item.id}
							>
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
									<Icon className="h-6 w-6 text-primary" />
								</div>

								<h3 className="font-semibold text-foreground text-lg">
									{item.title}
								</h3>

								<p className="mt-2 text-muted-foreground text-sm leading-6">
									{item.description}
								</p>
							</div>
						);
					})}
				</div>
			</section>
		</Container>
	);
};

export default WhyStudentsLoveUs;
