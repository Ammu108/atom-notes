import { ExternalLink, RotateCcw, TypeIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import DownloadPyqPdf from "~/features/pyqs/_components/download-pyq-pdf";
import type { PURCHASED_PYQ_TYPE } from "../types";

interface PyqPurchaseCardProps {
	purchase: PURCHASED_PYQ_TYPE;
}

const PyqPurchaseCard = ({ purchase }: PyqPurchaseCardProps) => {
	return (
		<div className="relative flex overflow-hidden rounded-xl border border-[#E5E1D8] bg-white">
			{/* stub */}
			<div className="relative flex w-21 shrink-0 flex-col items-center justify-center gap-2 border-[#D8D2C2] border-r border-dashed bg-primary/10 py-6">
				<TypeIcon className="h-5 w-5 text-[#1E2A4A]" strokeWidth={1.75} />
				<span className="font-semibold text-[#8B8474] text-[10px] uppercase tracking-wider">
					PYQs
				</span>
				{/* punch-hole notches */}
				<span className="absolute -top-2.5 -right-2.5 h-5 w-5 rounded-full bg-[#F5F3EE]" />
				<span className="absolute -right-2.5 -bottom-2.5 h-5 w-5 rounded-full bg-[#F5F3EE]" />
			</div>

			{/* body */}
			<div className="flex flex-1 flex-col gap-3 p-5">
				<div className="flex flex-wrap items-start justify-between gap-2">
					<div>
						<h3 className="font-semibold text-[#1E2A4A] text-base leading-snug">
							{purchase.title}
						</h3>
						{/* <p className="mt-0.5 text-[#6B6455] text-sm">React Fundamentals</p> */}
					</div>
				</div>

				<div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[#8B8474] text-xs">
					<span>
						{new Date(purchase.purchasesAt).toLocaleDateString("en-IN", {
							day: "2-digit",
							month: "short",
							year: "numeric",
						})}
					</span>
					<span className="text-[#D8D2C2]">•</span>
					<span>#Ord-884</span>
				</div>

				<div className="mt-1 flex items-center justify-between border-[#F0EDE3] border-t pt-3">
					<span className="font-mono font-semibold text-[#1E2A4A] text-lg">
						₹{purchase.price}
					</span>

					<div className="flex items-center justify-center gap-3">
						<span
							className={`flex items-center gap-1 rounded border-2 border-dashed px-2 py-1 font-bold text-[11px] uppercase tracking-wider`}
						>
							{purchase.status}
						</span>

						<Link
							className="flex items-center justify-center gap-2 hover:cursor-pointer"
							href={`notes/${purchase.resourceId}`}
						>
							<p className="text-sm hover:underline">View pyqs</p>
							<ExternalLink className="h-4 w-4" />
						</Link>

						{purchase.status === "PAID" && (
							<DownloadPyqPdf pyqId={purchase.resourceId} />
						)}
						{purchase.status === "PENDING" && (
							<Button
								className="bg-[#1E2A4A] text-white hover:bg-[#1E2A4A]/90"
								size="sm"
							>
								Complete payment
							</Button>
						)}
						{purchase.status === "FAILED" && (
							<Button
								className="border-[#B33F3F]/40 text-[#B33F3F]"
								size="sm"
								variant="outline"
							>
								<RotateCcw className="mr-1.5 h-3.5 w-3.5" />
								Retry
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PyqPurchaseCard;
