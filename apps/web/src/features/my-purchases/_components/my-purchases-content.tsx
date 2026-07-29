"use client";

import { userAuthClient } from "@repo/api/user-client";
import { Calendar, FileText, ReceiptText } from "lucide-react";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Card } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { useAllPurchasedNotes } from "../api";

const MyPurchasesContent = () => {
	const { data: session } = userAuthClient.useSession();

	const {
		data: purchasedNotes,
		isLoading,
		isError,
		error,
	} = useAllPurchasedNotes(session?.user.id);

	return (
		<div>
			<div className="mb-8 flex flex-col gap-2">
				<h1 className="font-bold text-3xl">My Purchases</h1>

				<p className="text-muted-foreground">
					All the premium notes you've purchased.
				</p>
			</div>

			{/* Loading */}
			{isLoading && (
				<div className="grid gap-5">
					{[1, 2, 3, 4, 5].map((row) => (
						<Card className="p-6" key={row}>
							<div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
								<div className="space-y-4">
									<div className="flex items-center gap-3">
										<Skeleton className="h-5 w-5 rounded" />
										<Skeleton className="h-6 w-64" />
									</div>

									<div className="flex gap-2">
										<Skeleton className="h-6 w-20 rounded-full" />
										<Skeleton className="h-6 w-28 rounded-full" />
										<Skeleton className="h-6 w-24 rounded-full" />
									</div>

									<div className="flex items-center gap-2">
										<Skeleton className="h-4 w-4 rounded" />
										<Skeleton className="h-4 w-36" />
									</div>
								</div>

								<div className="flex flex-col items-end gap-3">
									<Skeleton className="h-8 w-20" />
									<Skeleton className="h-5 w-24" />
								</div>
							</div>
						</Card>
					))}
				</div>
			)}

			{/* Error */}
			{!isLoading && isError && (
				<Card className="py-16">
					<div className="flex flex-col items-center justify-center text-center">
						<p className="font-semibold text-destructive text-lg">
							Something went wrong
						</p>

						<p className="mt-2 text-muted-foreground">
							{error?.message ?? "Unable to load your purchased notes."}
						</p>
					</div>
				</Card>
			)}

			{/* Empty */}
			{!isLoading &&
				!isError &&
				(!purchasedNotes || purchasedNotes.length === 0) && (
					<Card className="py-20">
						<div className="flex flex-col items-center text-center">
							<div className="rounded-full bg-muted/50 p-4">
								<ReceiptText className="h-10 w-10 text-muted-foreground" />
							</div>

							<h2 className="mt-5 font-semibold text-xl">No purchases yet</h2>

							<p className="mt-2 max-w-md text-muted-foreground">
								Once you purchase premium notes, they'll appear here for quick
								access.
							</p>
						</div>
					</Card>
				)}

			{/* Purchases */}
			{!isLoading &&
				!isError &&
				purchasedNotes &&
				purchasedNotes.length > 0 && (
					<div className="grid gap-5">
						{purchasedNotes.map((note) => (
							<Card
								className="transition-all hover:border-primary hover:shadow-md"
								key={note.id}
							>
								<div className="flex flex-col justify-between gap-6 p-6 md:flex-row md:items-center">
									<div className="space-y-3">
										<div className="flex items-center gap-2">
											<FileText className="h-5 w-5 text-primary" />

											<h2 className="font-semibold text-lg">{note.title}</h2>
										</div>

										<div className="flex flex-wrap gap-2">
											<Badge variant="secondary">{note.course}</Badge>

											<Badge variant="outline">Semester {note.semester}</Badge>

											<Badge variant="outline">{note.subject}</Badge>
										</div>

										<div className="flex items-center gap-2 text-muted-foreground text-sm">
											<Calendar className="h-4 w-4" />

											{new Date(note.purchasesAt).toLocaleDateString("en-IN", {
												day: "2-digit",
												month: "short",
												year: "numeric",
											})}
										</div>
									</div>

									<div className="flex flex-col items-end gap-3">
										<p className="font-bold text-2xl">₹{note.price}</p>

										<Link
											className="font-medium text-primary hover:underline"
											href={`/notes/${note.slug}`}
										>
											View Note
										</Link>
									</div>
								</div>
							</Card>
						))}
					</div>
				)}
		</div>
	);
};

export default MyPurchasesContent;
