"use client";
import { Button } from "@repo/ui";
import { notFound } from "next/navigation";
import { toast } from "sonner";
import { Container } from "~/components/container";
import { getRecentNoteBySlug } from "~/lib/recent-notes";

type NoteDetailPageProps = {
	params: Promise<{ slug: string }>;
};

const NoteDetailPage = async ({ params }: NoteDetailPageProps) => {
	const { slug } = await params;
	const note = getRecentNoteBySlug(slug);

	if (!note) {
		notFound();
	}

	const handleBuyNotes = () => {
		toast.info("Payment Gateway coming soon...");
	};

	return (
		<Container className="mx-auto">
			<div className="w-full pt-24">
				<div className="flex gap-10 px-6 pb-16">
					{/* Main Content */}
					<div>
						{/* Tags */}
						<div className="mt-3 mb-3 flex gap-2">
							<span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-slate-700 text-xs">
								{note.semester}
							</span>
							<span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-slate-700 text-xs">
								{note.subject}
							</span>
							<span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-slate-700 text-xs">
								Unit {note.unit}
							</span>
						</div>

						{/* Title */}
						<div className="flex flex-col gap-2">
							<div>
								<h1 className="mb-2 font-extrabold text-4xl text-gray-900 leading-tight">
									Sorting Algorithms Deep Dive
								</h1>
							</div>
							{/* Preview Banner */}
							<div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-gray-700 text-sm">
								<span className="text-base text-green-500">✅</span>
								You're reading the{" "}
								<span className="font-semibold text-green-700">
									free preview
								</span>
								. The full note is available for download at ₹49.
							</div>
						</div>

						{/* Introduction */}
						<div className="mt-8">
							<h2 className="mb-2 font-bold text-gray-900 text-xl">
								Introduction to Sorting
							</h2>
							<p className="mb-6 text-gray-700 leading-relaxed">
								Sorting is one of the most fundamental operations in computer
								science. A sorting algorithm arranges elements of a list in a
								certain order — most commonly ascending or descending. Efficient
								sorting is critical for optimizing the performance of other
								algorithms that require sorted input, such as binary search.
							</p>

							{/* QuickSort */}
							<h2 className="mb-3 font-bold text-gray-900 text-xl">
								QuickSort
							</h2>
							<div>
								<p className="mb-3">
									QuickSort is a divide-and-conquer algorithm. It works by
									selecting a 'pivot' element and partitioning the other
									elements into two sub-arrays: those less than the pivot and
									those greater. The sub-arrays are then sorted recursively.
								</p>
								<ul className="space-y-1 text-gray-700">
									<li>
										• Best Case: O(n log n) — when the pivot consistently splits
										the array into equal halves.
									</li>
									<li>
										• Worst Case: O(n²) — when the pivot is always the smallest
										or largest element.
									</li>
									<li>• Average Case: O(n log n)</li>
									<li>
										• Space Complexity: O(log n) due to recursive call stack.
									</li>
								</ul>
							</div>

							{/* MergeSort */}
							<h2 className="mt-8 mb-3 font-bold text-gray-900 text-xl">
								MergeSort
							</h2>
							<div>
								<p className="mb-3">
									MergeSort is a stable, divide-and-conquer sorting algorithm.
									It divides the input array into two halves, recursively sorts
									them, and then merges the sorted halves.
								</p>
								<ul className="space-y-1 text-gray-700">
									<li>
										• Time Complexity: O(n log n) in all cases — best, worst,
										and average.
									</li>
									<li>
										• Space Complexity: O(n) — requires auxiliary space for
										merging.
									</li>
									<li>
										• Stability: Stable — maintains relative order of equal
										elements.
									</li>
									<li>
										• Best Use: Sorting linked lists and external sorting (large
										datasets).
									</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Sidebar */}
					<div className="w-1/2">
						<div className="sticky top-32">
							{/* Download Card */}
							<div className="mb-4 rounded-xl bg-gray-900 p-5 text-white">
								<p className="mb-1 text-gray-400 text-xs uppercase tracking-widest">
									Download PDF
								</p>
								<p className="mb-1 font-bold text-lg leading-snug">
									Sorting Algorithms Deep Dive
								</p>
							</div>

							{/* Pricing Card */}
							<div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
								<div className="flex items-baseline gap-2">
									<span className="font-extrabold text-3xl text-primary">
										₹49
									</span>
									<span className="text-gray-400 text-sm line-through">
										₹79
									</span>
								</div>
								<p className="font-medium text-green-600 text-xs">
									✓ One-time purchase · PDF forever
								</p>

								<div className="w-full">
									<Button
										className="w-full font-semibold"
										onClick={handleBuyNotes}
										size="sm"
									>
										Buy Now · ₹49
									</Button>
								</div>

								{/* What's Included */}
								<div className="border-gray-100">
									<p className="mb-3 font-semibold text-gray-500 text-xs uppercase tracking-widest">
										What's Included
									</p>
									<ul className="space-y-2 text-gray-700 text-sm">
										<li>📄 24 pages of curated notes</li>
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
					</div>
				</div>
			</div>
		</Container>
	);
};

export default NoteDetailPage;
