"use client";

import { Card, CardContent, CardHeader, CardTitle, Input } from "@repo/ui";
import { ExternalLink, SearchIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import { usePurchases } from "../api";

const purchaseSkeletonRows = [
	"purchase-skel-1",
	"purchase-skel-2",
	"purchase-skel-3",
	"purchase-skel-4",
	"purchase-skel-5",
];

export function PurchasesTable() {
	const { data: purchases, isLoading } = usePurchases();

	return (
		<Card>
			<CardHeader className="gap-3">
				<CardTitle>Purchases Directory</CardTitle>

				<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
					<div className="relative w-full md:max-w-sm">
						<SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							className="pl-9"
							placeholder="Search user, email or note..."
						/>
					</div>
				</div>
			</CardHeader>

			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>User</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Note</TableHead>
							<TableHead>Price</TableHead>
							<TableHead>Method</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Purchased On</TableHead>
							<TableHead className="text-right">Action</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{isLoading ? (
							purchaseSkeletonRows.map((key) => (
								<TableRow key={key}>
									<TableCell>
										<Skeleton className="h-4 w-28" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-36" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-32" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-16" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-20" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-5 w-16 rounded-full" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-24" />
									</TableCell>
									<TableCell className="text-right">
										<Skeleton className="ml-auto size-8 rounded-md" />
									</TableCell>
								</TableRow>
							))
						) : purchases?.length ? (
							purchases.map((purchase) => (
								<TableRow key={purchase.id}>
									<TableCell className="py-4 font-medium">
										{purchase.userName}
									</TableCell>

									<TableCell>{purchase.userEmail}</TableCell>

									<TableCell>{purchase.noteTitle}</TableCell>

									<TableCell>₹{purchase.amount}</TableCell>

									<TableCell>{purchase.paymentMethod ?? "-"}</TableCell>

									<TableCell>
										<Badge
											variant={
												purchase.status === "PAID"
													? "default"
													: purchase.status === "FAILED"
														? "destructive"
														: "secondary"
											}
										>
											{purchase.status}
										</Badge>
									</TableCell>

									<TableCell>
										{new Date(purchase.createdAt).toLocaleDateString("en-IN", {
											day: "2-digit",
											month: "short",
											year: "numeric",
										})}
									</TableCell>

									<TableCell className="text-right">
										<Link href={`/purchases/${purchase.id}`}>
											<Button size="sm" variant="ghost">
												<ExternalLink className="size-4" />
											</Button>
										</Link>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									className="h-32 text-center text-muted-foreground"
									colSpan={8}
								>
									No purchases found.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
