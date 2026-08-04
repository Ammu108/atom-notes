import { BadgeCheck, Check, GraduationCap, ShieldCheck } from "lucide-react";
import { Separator } from "~/components/ui/separator";
import BuyPyqButton from "./buy-pyq-button";
import DownloadPyqPdf from "./download-pyq-pdf";

interface PyqDetailSidebarProps {
	price: string;
	pyqId: string;
	course: string;
	semester: string;
	subject: string;
	year: string;
	hasPurchased: boolean;
	isPaid: boolean;
}

const PyqDetailSidebar = ({
	pyqId,
	price,
	course,
	semester,
	subject,
	hasPurchased,
	isPaid,
	year,
}: PyqDetailSidebarProps) => {
	return (
		<div className="rounded-2xl bg-card shadow-sm">
			<div
				className={`rounded-t-2xl bg-primary p-6 text-primary-foreground ${hasPurchased ? "bg-success" : ""}`}
			>
				<h2 className="font-bold text-xl">
					{hasPurchased
						? "Download PYQ with Solutions"
						: "Buy PYQ with Solutions"}
				</h2>

				<p className="mt-2 font-medium text-sm">
					{hasPurchased
						? "Thankyou for your purchase! You have lifetime access to this PYQ."
						: "Get instant access after successful payment."}
				</p>
			</div>

			<div className="flex flex-col gap-6 p-6">
				<div className="flex flex-col items-center">
					<p className="text-muted-foreground text-sm">Price</p>

					<div className="flex items-center gap-2">
						<h1
							className={`mt-1 font-bold text-4xl ${hasPurchased ? "text-muted/60" : ""}`}
						>
							₹{price}
						</h1>
						{hasPurchased ? (
							<div className="flex items-center gap-2 rounded-xl border border-border bg-accent px-2 py-1">
								<Check className="h-4 w-4 text-accent-foreground" />
								<p className="font-medium text-accent-foreground text-sm">
									Paid
								</p>
							</div>
						) : null}
					</div>

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
					{isPaid ? (
						hasPurchased ? (
							<DownloadPyqPdf className="w-full" pyqId={pyqId} />
						) : (
							<BuyPyqButton id={pyqId} price={price} />
						)
					) : (
						<DownloadPyqPdf className="w-full" pyqId={pyqId} />
					)}

					{!hasPurchased && (
						<div className="rounded-lg border bg-accent/50 px-4 py-2">
							<div className="flex items-center justify-center gap-2 text-sm">
								<ShieldCheck className="h-4 w-4 text-green-600" />
								<span>100% Secure Payment via Razorpay</span>
							</div>
						</div>
					)}
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
