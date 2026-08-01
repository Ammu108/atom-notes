"use client";

import { FileTextIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
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
	questions: "bg-green-100 text-green-700",
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
					Failed to load pyqs.
				</p>
			</div>
		);
	}

	if (allPyqs.length === 0) {
		return (
			<div className="rounded-xl border border-destructive bg-destructive/10 px-2 py-4">
				<p className="text-center font-medium text-base text-destructive">
					No pyqs available.
				</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4">
			{allPyqs.map((pyq) => (
				<Card key={pyq.id}>
					<CardContent>
						{/* Card header */}
						<div className="flex flex-col items-center justify-between gap-3 md:flex-row">
							<div className="flex flex-wrap items-start gap-3">
								<div className="flex flex-col">
									<h2 className="font-bold text-card-foreground text-xl capitalize">
										{pyq.title}
									</h2>
									<h2 className="font-medium text-muted-foreground/80 text-sm">
										{pyq.subjectName}
									</h2>
								</div>
								<div className="flex flex-wrap items-center gap-2">
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

									<span
										className={`rounded-full px-2.5 py-0.5 font-medium text-xs ${badgeStyles.questions}`}
									>
										{pyq.questionsLength} Questions
									</span>
								</div>
							</div>

							<div className="flex w-full items-center justify-between gap-3 md:justify-end">
								<Link href={`/pyqs/${pyq.id}`}>
									<Button size="xs" variant="outline">
										View Questions
									</Button>
								</Link>

								<Button
									onClick={() => handleDialog(pyq)}
									size="xs"
									type="button"
									variant="primary"
								>
									<FileTextIcon className="size-4" />
									Download PDF
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			))}

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
								Contains detailed answers to all {selectedPyq.questionsLength}{" "}
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
