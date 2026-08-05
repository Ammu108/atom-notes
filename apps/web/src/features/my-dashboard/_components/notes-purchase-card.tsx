import { ExternalLink, RotateCcw, TypeIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import DownloadNotePdf from "~/features/notes/_components/download-note-button";
import type { PURCHASED_NOTE_TYPE } from "../types";

interface NotesPurchaseCardProps {
	purchase: PURCHASED_NOTE_TYPE;
}

const NotesPurchaseCard = ({ purchase }: NotesPurchaseCardProps) => {
	return (
		<div className="relative flex overflow-hidden rounded-xl border border-[#E5E1D8] bg-card">
			{/* stub */}
			<div className="relative flex w-14 shrink-0 flex-col items-center justify-center gap-2 border-[#D8D2C2] border-r border-dashed bg-primary/10 py-6 sm:w-21">
				<TypeIcon className="h-5 w-5 text-[#1E2A4A]" strokeWidth={1.75} />
				<span className="hidden font-semibold text-[#8B8474] text-[10px] uppercase tracking-wider sm:inline">
					Notes
				</span>
				{/* punch-hole notches */}
				<span className="absolute -top-2.5 -right-2.5 h-5 w-5 rounded-full bg-[#F5F3EE]" />
				<span className="absolute -right-2.5 -bottom-2.5 h-5 w-5 rounded-full bg-[#F5F3EE]" />
			</div>

			{/* body */}
			<div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
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
					<span>#Ord-{purchase.orderId?.slice(-4)}</span>
				</div>

				<div className="mt-1 flex flex-col gap-3 border-[#F0EDE3] border-t pt-3 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex items-center justify-between gap-2 sm:justify-start">
						<span className="font-mono font-semibold text-[#1E2A4A] text-lg">
							₹{purchase.price}
						</span>

						<span className="flex items-center gap-1 rounded border-2 border-dashed px-2 py-1 font-bold text-[11px] uppercase tracking-wider">
							{purchase.status}
						</span>
					</div>

					<div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
						<Link
							className="flex items-center justify-center gap-1.5 hover:cursor-pointer"
							href={`notes/${purchase.slug}`}
						>
							<p className="text-sm hover:underline">View notes</p>
							<ExternalLink className="h-4 w-4 shrink-0" />
						</Link>

						{purchase.status === "PAID" && (
							<DownloadNotePdf noteId={purchase.resourceId} />
						)}
						{purchase.status === "PENDING" && (
							<Link href={`notes/${purchase.slug}`}>
								<Button size="sm" variant="outline">
									Complete payment
								</Button>
							</Link>
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

export default NotesPurchaseCard;
