"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { Skeleton } from "~/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import { useGetAllNotesPurchases, useGetAllPyqPurchases } from "../api";

const purchaseSkeletonRows = [
	"purchase-skel-1",
	"purchase-skel-2",
	"purchase-skel-3",
	"purchase-skel-4",
	"purchase-skel-5",
];

type PurchaseFilter = "Notes" | "Pyqs";

export function PurchasesTable() {
	const pathName = usePathname();
	const router = useRouter();
	const [filter, setFilter] = useState<PurchaseFilter>("Notes");
	const { data: notesPurchases, isLoading: isNotesPurchasesLoading } =
		useGetAllNotesPurchases(filter === "Notes");
	const { data: pyqPurchases, isLoading: isPyqPurchasesLoading } =
		useGetAllPyqPurchases(filter === "Pyqs");

	const purchases =
		filter === "Notes" ? (notesPurchases ?? []) : (pyqPurchases ?? []);

	const isPurchasesLoading =
		filter === "Notes" ? isNotesPurchasesLoading : isPyqPurchasesLoading;

	useEffect(() => {
		const params = new URLSearchParams();

		if (filter) {
			params.set("filter", filter);
		}

		router.replace(`${pathName}?${params.toString()}`);
	}, [filter, router, pathName]);

	const handleFilterChange = (value: PurchaseFilter | null) => {
		if (!value) return;

		setFilter(value);
	};

	return (
		<Card>
			<CardHeader className="gap-3">
				<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
					<CardTitle>Purchases Directory</CardTitle>

					<div className="flex flex-col gap-2 sm:flex-row">
						<Select onValueChange={handleFilterChange} value={filter}>
							<SelectTrigger className="w-full sm:w-36">
								<SelectValue />
							</SelectTrigger>
							<SelectContent align="end">
								<SelectGroup>
									<SelectItem value="Notes">Notes</SelectItem>
									<SelectItem value="Pyqs">Pyqs</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
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
						{isPurchasesLoading ? (
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

									<TableCell>{purchase.title}</TableCell>

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
										<Link
											href={`/purchases/${filter === "Notes" ? "notes" : "pyq"}/${purchase.id}`}
										>
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
