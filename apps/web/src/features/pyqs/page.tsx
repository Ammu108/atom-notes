"use client";

import { FileTextIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "~/components/ui/dialog";
import PyqCardSkeleton from "./_components/pyqs-loading-skeleton";
import { useGetAllPyqs } from "./api";
import type { ALL_PYQS } from "./types";

const badgeStyles = {
	semester: "bg-blue-100 text-blue-700",
	year: "bg-purple-100 text-purple-700",
};

const PyqsPage = () => {
	const { data: allPyqs, isPending, isError } = useGetAllPyqs();
	const [dialogOpen, setdialogOpen] = useState(false);
	const [selectedPyq, setSelectedPyq] = useState<ALL_PYQS | null>(null);

	const handleDialog = (pyq: ALL_PYQS) => {
		setdialogOpen(true);
		setSelectedPyq(pyq);
	};

	const handleDownloadPyq = () => {
		toast.info("Payment Gateway Coming Soon...");
	};

	if (!allPyqs || isPending) {
		return <PyqCardSkeleton />;
	}

	if (isError) {
		return (
			<div className="rounded-xl border border-destructive bg-destructive/10 px-2 py-4">
				<p className="font-medium text-base text-destructive">
					Filed to load pyqs.
				</p>
			</div>
		);
	}

	return (
		<div>
			<Accordion className="mt-6 flex flex-col gap-4">
				{allPyqs.map((pyq) => (
					<AccordionItem
						className="group/item overflow-hidden rounded-xl border border-border bg-card"
						key={pyq.id}
						value={pyq.id}
					>
						{/* Card header */}
						<div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
							<div className="flex flex-wrap items-start gap-3">
								<div className="flex flex-col">
									<h2 className="font-bold text-card-foreground text-xl capitalize">
										{pyq.title}
									</h2>
									<h2 className="font-medium text-muted-foreground/80 text-sm">
										{pyq.subjectName}
									</h2>
								</div>
								<span
									className={`rounded-full px-2.5 py-0.5 font-medium text-xs ${badgeStyles.semester}`}
								>
									semester {pyq.semester}
								</span>

								<span
									className={`rounded-full px-2.5 py-0.5 font-medium text-xs ${badgeStyles.year}`}
								>
									{pyq.year}
								</span>
							</div>

							<div className="flex items-center gap-3">
								<AccordionTrigger className="flex items-center gap-1 rounded-lg border border-stone-200 bg-white px-3 py-1.5 font-medium text-sm text-stone-700 hover:bg-stone-50 [&>svg]:size-3.5">
									<span className="group-data-[state=open]/item:hidden">
										{pyq.questions.length} Questions
									</span>
									<span className="hidden group-data-[state=open]/item:inline">
										Hide
									</span>
								</AccordionTrigger>

								<Button
									onClick={() => handleDialog(pyq)}
									size="xs"
									type="button"
								>
									<FileTextIcon className="size-4" />
									Download PDF
								</Button>
							</div>
						</div>

						{/* Questions */}
						<AccordionContent>
							<div className="divide-y divide-stone-100 border-stone-100 border-t">
								{pyq.questions.map((question, i) => (
									<div
										className="flex items-start gap-4 px-6 py-4"
										key={question.question}
									>
										<span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-rose-100 font-semibold text-rose-600 text-xs">
											{i + 1}
										</span>
										<p className="text-[15px] text-stone-700">
											{question.question}
										</p>
									</div>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>

			<Dialog onOpenChange={setdialogOpen} open={dialogOpen}>
				<DialogContent className="sm:max-w-sm">
					<DialogHeader className="items-center text-center">
						<div className="mb-2 flex size-14 items-center justify-center rounded-xl bg-blue-50">
							<FileTextIcon
								className="size-7 text-blue-400"
								strokeWidth={1.5}
							/>
						</div>
						<DialogTitle className="font-semibold text-card-foreground text-xl">
							PYQ Answer PDF
						</DialogTitle>
						{selectedPyq && (
							<p className="text-muted-foreground/80 text-sm">
								{selectedPyq.subjectName} · {selectedPyq.year}
							</p>
						)}
					</DialogHeader>

					{selectedPyq && (
						<>
							<div className="rounded-lg border border-rose-100 bg-rose-50 px-4 py-3 text-rose-600 text-sm">
								Contains detailed answers to all {selectedPyq.questions.length}{" "}
								questions from the {selectedPyq.year} exam.
							</div>

							<div className="flex items-center justify-between rounded-lg bg-muted px-4 py-3">
								<span className="text-muted-foreground text-sm">
									PYQ Answer PDF
								</span>
								<span className="font-semibold text-red-500">
									₹{selectedPyq.price}
								</span>
							</div>
						</>
					)}

					<DialogFooter className="flex-col gap-2 sm:flex-col">
						<Button onClick={handleDownloadPyq} size="xs" type="button">
							Download Answers · ₹{selectedPyq?.price}
						</Button>
						<DialogClose
							render={
								<Button className="w-full" size="xs" variant="outline">
									Cancel
								</Button>
							}
						/>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default PyqsPage;
