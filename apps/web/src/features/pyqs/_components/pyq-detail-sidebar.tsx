import { BadgeCheck, Download, GraduationCap, ShieldCheck } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

interface PyqDetailSidebarProps {
	price: string;
	course: string;
	semester: string;
	subject: string;
	year: string;
}

const PyqDetailSidebar = ({
	price,
	course,
	semester,
	subject,
	year,
}: PyqDetailSidebarProps) => {
	return (
		<div className="rounded-2xl bg-card shadow-sm">
			<div className="rounded-t-2xl bg-primary p-6 text-primary-foreground">
				<h2 className="font-bold text-xl">Download PYQ with Solutions</h2>

				<p className="mt-2 font-medium text-sm">
					Get instant access after successful payment.
				</p>
			</div>

			<div className="flex flex-col gap-6 p-6">
				<div className="flex flex-col items-center">
					<p className="text-muted-foreground text-sm">Price</p>

					<h1 className="mt-1 font-bold text-4xl">₹{price}</h1>

					<p className="mt-1 text-green-600 text-sm">Lifetime Access</p>
				</div>

				<Separator />

				<div className="space-y-4">
					<div className="flex items-center gap-3">
						<BadgeCheck className="h-5 w-5 text-green-600" />
						<span>Official University Paper</span>
					</div>

					<div className="flex items-center gap-3">
						<BadgeCheck className="h-5 w-5 text-green-600" />
						<span>Detailed Solutions Included</span>
					</div>

					<div className="flex items-center gap-3">
						<BadgeCheck className="h-5 w-5 text-green-600" />
						<span>High Quality PDF</span>
					</div>

					<div className="flex items-center gap-3">
						<BadgeCheck className="h-5 w-5 text-green-600" />
						<span>Instant Download</span>
					</div>

					<div className="flex items-center gap-3">
						<BadgeCheck className="h-5 w-5 text-green-600" />
						<span>Lifetime Access</span>
					</div>
				</div>

				<div className="flex w-full flex-col gap-4">
					<Button size="sm">
						<Download className="mr-2 h-5 w-5" />
						Download with Solutions
					</Button>

					<div className="rounded-lg border bg-accent/50 px-4 py-2">
						<div className="flex items-center justify-center gap-2 text-sm">
							<ShieldCheck className="h-4 w-4 text-green-600" />
							<span>100% Secure Payment via Razorpay</span>
						</div>
					</div>
				</div>

				<div className="rounded-lg border p-4">
					<h3 className="mb-3 font-semibold">Paper Information</h3>

					<div className="space-y-3 text-sm">
						<div className="flex justify-between">
							<span className="text-muted-foreground">Course</span>
							<span>{course}</span>
						</div>

						<div className="flex justify-between">
							<span className="text-muted-foreground">Semester</span>
							<span>{semester}</span>
						</div>

						<div className="flex justify-between">
							<span className="text-muted-foreground">Subject</span>
							<span>{subject}</span>
						</div>

						<div className="flex justify-between">
							<span className="text-muted-foreground">Year</span>
							<span>{year}</span>
						</div>

						<div className="flex justify-between">
							<span className="text-muted-foreground">Solutions</span>
							<span>Included</span>
						</div>

						<div className="flex justify-between">
							<span className="text-muted-foreground">Format</span>
							<span>PDF</span>
						</div>
					</div>
				</div>

				<div className="rounded-lg bg-primary/5 p-4 text-center">
					<GraduationCap className="mx-auto mb-2 h-7 w-7 text-primary" />

					<p className="text-muted-foreground text-sm">
						Practice with previous year papers to improve your exam preparation
						and confidence.
					</p>
				</div>
			</div>
		</div>
	);
};

export default PyqDetailSidebar;
