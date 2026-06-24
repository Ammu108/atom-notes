import { toast } from "sonner";
import { Button } from "~/components/ui/button";

interface SidebarProps {
	unitName: string;
	price: string;
}

const NoteSidebar = ({ unitName, price }: SidebarProps) => {
	const handleBuyNotes = () => {
		toast.info("Payment Gateway coming soon...");
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
				<div className="flex flex-col items-baseline gap-1">
					<span className="font-extrabold text-3xl text-primary">₹{price}</span>
					<p className="font-medium text-green-600 text-xs">
						✓ One-time purchase · PDF forever
					</p>
				</div>

				<div className="w-full">
					<Button
						className="w-full font-semibold"
						onClick={handleBuyNotes}
						size="sm"
					>
						Buy Now · ₹{price}
					</Button>
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

				<Button className="w-full" size="xs" variant="outline">
					Back to All Notes
				</Button>
			</div>
		</div>
	);
};

export default NoteSidebar;
