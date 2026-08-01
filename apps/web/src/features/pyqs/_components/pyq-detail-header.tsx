import { BookOpen, Calendar, Clock3, FileText } from "lucide-react";
import { Badge } from "~/components/ui/badge";

interface PyqDetailHeaderProps {
	course: string;
	semester: string;
	subject: string;
	title: string;
	year: string;
	questionsCount: number;
}

const PyqDetailHeader = ({
	course,
	semester,
	subject,
	title,
	questionsCount,
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

				<div className="grid gap-4 sm:grid-cols-4">
					<div className="flex items-center gap-3 rounded-lg border p-4">
						<Calendar className="h-5 w-5 text-primary" />
						<div>
							<p className="text-muted-foreground text-xs">Year</p>
							<p className="font-semibold">{year}</p>
						</div>
					</div>

					<div className="flex items-center gap-3 rounded-lg border p-4">
						<BookOpen className="h-5 w-5 text-primary" />
						<div>
							<p className="text-muted-foreground text-xs">Subject</p>
							<p className="font-semibold">{subject}</p>
						</div>
					</div>

					<div className="flex items-center gap-3 rounded-lg border p-4">
						<FileText className="h-5 w-5 text-primary" />
						<div>
							<p className="text-muted-foreground text-xs">Questions</p>
							<p className="font-semibold">{questionsCount}</p>
						</div>
					</div>

					<div className="flex items-center gap-3 rounded-lg border p-4">
						<Clock3 className="h-5 w-5 text-primary" />
						<div>
							<p className="text-muted-foreground text-xs">Duration</p>
							<p className="font-semibold">3 Hours</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PyqDetailHeader;
