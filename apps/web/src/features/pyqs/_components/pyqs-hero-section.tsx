import { AlertTriangleIcon } from "lucide-react";

const PyqsHeroSection = () => {
	return (
		<div>
			<h1 className="font-bold text-3xl text-foreground md:text-4xl">
				Previous Year Questions
			</h1>
			<div className="mt-3 h-1 w-16 rounded-full bg-primary" />

			<p className="mt-4 text-muted-foreground text-sm">
				Questions are free to read. Download full answer PDFs with login.
			</p>

			<div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-2 text-sm text-yellow-800">
				<AlertTriangleIcon className="size-4 shrink-0" />
				Only few questions are shown here. For answers, download the PDF.
			</div>
		</div>
	);
};

export default PyqsHeroSection;
