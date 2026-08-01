import { Card, CardContent } from "~/components/ui/card";

interface DetailedPyqSectionProps {
	id: string;
	question: string;
}

export default function DetailedPyqSection({
	question,
}: {
	question: DetailedPyqSectionProps[];
}) {
	return (
		<div>
			<Card>
				<CardContent className="flex flex-col gap-6">
					<div>
						<h2 className="font-semibold text-xl">Questions Included</h2>
						<p className="text-muted-foreground text-sm">
							Preview of questions available inside this PYQ.
						</p>
					</div>

					<div className="space-y-4">
						{question.map((question, index) => (
							<Card key={question.id}>
								<CardContent className="flex gap-4 p-5">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
										Q{index + 1}
									</div>

									<div>
										<p className="font-medium">{question.question}</p>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Related */}
			{/* <Card>
				<CardContent className="space-y-4 p-6">
					<h2 className="font-semibold text-xl">
						Related Previous Year Papers
					</h2>

					<div className="grid gap-3 sm:grid-cols-2">
						{relatedPyqs.map((item) => (
							<Card
								className="cursor-pointer transition hover:border-primary"
								key={item}
							>
								<CardContent className="flex items-center gap-3 p-4">
									<FileText className="h-5 w-5 text-primary" />
									<span className="font-medium">{item}</span>
								</CardContent>
							</Card>
						))}
					</div>
				</CardContent>
			</Card> */}
		</div>
	);
}
