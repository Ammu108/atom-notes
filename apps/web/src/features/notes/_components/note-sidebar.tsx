import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import BuyNoteButton from "./buy-note-button";
import DownloadNotePdf from "./download-note-button";

interface SidebarProps {
	noteId: string;
	unitName: string;
	price: string;
	isPaid: boolean;
	hasPurchased: boolean;
	slug: string;
}

const NoteSidebar = ({
	noteId,
	unitName,
	price,
	isPaid,
	hasPurchased,
	slug,
}: SidebarProps) => {
	const router = useRouter();

	const handleNavigateToBrowse = () => {
		router.push("/browse");
	};
	return (
		<div className="sticky top-28">
			{/* Download Card */}
			<div className="mb-4 rounded-xl bg-gray-900 p-5 text-white">
				<p className="mb-1 text-gray-400 text-xs uppercase tracking-widest">
					Download PDF
				</p>
				<p className="mb-1 font-bold text-lg leading-snug">{unitName}</p>
			</div>

			{/* Pricing Card */}
			<div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
				<div className="flex items-center justify-between">
					<div className="flex flex-col items-baseline gap-1">
						<span className="font-extrabold text-3xl text-primary">
							₹{price}
						</span>
						<p className="font-medium text-green-600 text-xs">
							✓ One-time purchase · PDF forever
						</p>
					</div>
					{isPaid ? (
						hasPurchased ? (
							<div className="flex items-center gap-2 rounded-xl border border-border bg-accent px-2 py-1">
								<Check className="h-4 w-4 text-accent-foreground" />
								<p className="font-medium text-accent-foreground text-sm">
									Paid
								</p>
							</div>
						) : null
					) : (
						<div className="flex items-center gap-2 rounded-xl border border-border bg-success/10 px-2 py-1">
							<p className="font-medium text-sm text-success">Free</p>
						</div>
					)}
				</div>

				<div className="w-full">
					{isPaid ? (
						hasPurchased ? (
							<DownloadNotePdf className="w-full" noteId={noteId} />
						) : (
							<BuyNoteButton noteId={noteId} price={price} slug={slug} />
						)
					) : (
						<DownloadNotePdf className="w-full" noteId={noteId} />
					)}
				</div>

				{/* What's Included */}
				<div className="border-gray-100">
					<p className="mb-3 font-semibold text-gray-500 text-xs uppercase tracking-widest">
						What's Included
					</p>
					<ul className="space-y-2 text-gray-700 text-sm">
						<li>🎯 Exam-focused key points</li>
						<li>♾️ Lifetime access after purchase</li>
						<li>📱 Mobile-friendly PDF format</li>
					</ul>
				</div>

				<Button
					className="w-full"
					onClick={handleNavigateToBrowse}
					size="xs"
					variant="outline"
				>
					Back to All Notes
				</Button>
			</div>
		</div>
	);
};

export default NoteSidebar;
