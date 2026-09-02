import { Badge } from "~/components/ui/badge";

interface PyqDetailHeaderProps {
	course: string;
	semester: string;
	subject: string;
	title: string;
	year: string;
}

const PyqDetailHeader = ({
	course,
	semester,
	title,
	year,
}: PyqDetailHeaderProps) => {
	return (
		<div>
			<div className="space-y-6 md:p-8">
				<div className="space-y-4">
					<h1 className="font-bold text-3xl uppercase tracking-tight">
						{title}
					</h1>

					<p className="text-muted-foreground">
						University Examination Question Paper with complete step-by-step
						solutions prepared by experienced faculty.
					</p>
				</div>

				<div className="flex flex-wrap gap-2">
					<Badge>{course}</Badge>
					<Badge variant="secondary">Semester {semester}</Badge>
					<Badge variant="outline">{year}</Badge>
					<Badge className="bg-green-600 text-white hover:bg-green-700">
						Solved Paper
					</Badge>
				</div>
			</div>
		</div>
	);
};

export default PyqDetailHeader;
