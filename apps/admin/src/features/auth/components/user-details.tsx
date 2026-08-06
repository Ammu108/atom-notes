"use client";

import {
	Calendar,
	Contact,
	CreditCard,
	EllipsisVerticalIcon,
	ExternalLink,
	IndianRupee,
	Mail,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
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
import {
	useFilterNotes,
	useFilterPyq,
	useUserDetailById,
	useUserStatsById,
	useUserSupportById,
} from "../api";

type PurchaseFilter = "Notes" | "Pyqs";

const userSkeletonRows = [
	"user-skeleton-1",
	"user-skeleton-2",
	"user-skeleton-3",
	"user-skeleton-4",
	"user-skeleton-5",
];

const UserDetails = ({ id }: { id: string }) => {
	const { data: userDetails, isLoading } = useUserDetailById(id);
	const { data: userStats, isLoading: isUserStatsLoading } =
		useUserStatsById(id);
	const { data: contactData, isPending: isContactDataLoading } =
		useUserSupportById(id);
	const [filter, setFilter] = useState<PurchaseFilter>("Notes");
	const router = useRouter();
	const pathName = usePathname();

	const { data: notesPurchases, isLoading: isNotesPurchasesLoading } =
		useFilterNotes(id, filter === "Notes");
	const { data: pyqPurchases, isLoading: isPyqPurchasesLoading } = useFilterPyq(
		id,
		filter === "Pyqs",
	);

	const purchases =
		filter === "Notes" ? (notesPurchases ?? []) : (pyqPurchases ?? []);

	const isPurchasesLoading =
		filter === "Notes" ? isNotesPurchasesLoading : isPyqPurchasesLoading;

	const handleFilterChange = (value: PurchaseFilter | null) => {
		if (!value) return;

		setFilter(value);
	};

	useEffect(() => {
		const params = new URLSearchParams();

		if (filter) {
			params.set("filter", filter);
		}

		router.replace(`${pathName}?${params.toString()}`);
	}, [filter, router, pathName]);

	const handleViewDetails = (id: string) => {
		router.push(`/support/${id}`);
	};

	return (
		<div className="space-y-6 p-6">
			{/* Header */}
			<Card>
				<CardContent className="flex items-center justify-between pt-6">
					<div className="flex w-full flex-row items-center justify-between space-y-2">
						<div className="flex flex-col gap-2">
							<div>
								<h1 className="font-bold text-3xl">
									{isLoading ? (
										<Skeleton className="h-9 w-56" />
									) : (
										userDetails?.name
									)}
								</h1>
							</div>

							<div className="flex flex-wrap gap-6 text-muted-foreground">
								<div className="flex items-center gap-2">
									<Mail className="h-4 w-4" />
									{isLoading ? (
										<Skeleton className="h-4 w-48" />
									) : (
										userDetails?.email
									)}
								</div>

								<div className="flex items-center gap-2">
									<Calendar className="h-4 w-4" />
									{isLoading ? (
										<Skeleton className="h-4 w-28" />
									) : userDetails?.createdAt ? (
										new Date(userDetails.createdAt).toLocaleDateString(
											"en-IN",
											{
												day: "2-digit",
												month: "short",
												year: "numeric",
											},
										)
									) : (
										"-"
									)}
								</div>
							</div>
						</div>

						<div>
							{isLoading ? (
								<Skeleton className="h-6 w-24" />
							) : (
								<p className="font-semibold text-lg">
									{userDetails?.emailVerified ? "Verified" : "Not Verified"}
								</p>
							)}
						</div>
					</div>
				</CardContent>
			</Card>
			{/* TODO: REMOVE THIS COMMENT WHEN YOU SEE IT. */}

			{/* Stats */}
			<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
				<Card>
					<CardContent className="flex items-center justify-between pt-6">
						<div>
							<p className="text-muted-foreground text-sm">Total Purchases</p>

							{isUserStatsLoading ? (
								<Skeleton className="h-9 w-16" />
							) : (
								<p className="font-bold text-3xl">
									{userStats?.totalPurchases}
								</p>
							)}
						</div>

						<CreditCard className="h-8 w-8 text-muted-foreground" />
					</CardContent>
				</Card>

				<Card>
					<CardContent className="flex items-center justify-between pt-6">
						<div>
							<p className="text-muted-foreground text-sm">Total Spent</p>

							{isUserStatsLoading ? (
								<Skeleton className="h-9 w-20" />
							) : (
								<p className="font-bold text-3xl">
									₹{userStats?.totalSpent?.toFixed(2)}
								</p>
							)}
						</div>

						<IndianRupee className="h-8 w-8 text-muted-foreground" />
					</CardContent>
				</Card>

				<Card>
					<CardContent className="flex items-center justify-between pt-6">
						<div>
							<p className="text-muted-foreground text-sm">Total Pending</p>

							{isUserStatsLoading ? (
								<Skeleton className="h-9 w-16" />
							) : (
								<p className="font-bold text-3xl">
									{userStats?.totalPendingPurchases}
								</p>
							)}
						</div>

						<CreditCard className="h-8 w-8 text-muted-foreground" />
					</CardContent>
				</Card>

				<Card>
					<CardContent className="flex items-center justify-between pt-6">
						<div>
							<p className="text-muted-foreground text-sm">Total Support</p>

							{isUserStatsLoading ? (
								<Skeleton className="h-9 w-16" />
							) : (
								<p className="font-bold text-3xl">{userStats?.totalSupport}</p>
							)}
						</div>

						<Contact className="h-8 w-8 text-muted-foreground" />
					</CardContent>
				</Card>
			</div>

			{/* Purchases */}
			<Card>
				<CardHeader>
					<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
						<CardTitle>
							{filter === "Notes" ? "Purchased Notes" : "Purchased PYQs"}
						</CardTitle>

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
								<TableHead>Note</TableHead>
								<TableHead>Amount</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Date</TableHead>
								<TableHead>Action</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{isPurchasesLoading ? (
								[1, 2, 3, 4, 5].map((row) => (
									<TableRow key={row}>
										<TableCell>
											<Skeleton className="h-5 w-52" />
										</TableCell>

										<TableCell>
											<Skeleton className="h-5 w-16" />
										</TableCell>

										<TableCell>
											<Skeleton className="h-6 w-20 rounded-full" />
										</TableCell>

										<TableCell>
											<Skeleton className="h-5 w-24" />
										</TableCell>

										<TableCell>
											<Skeleton className="h-5 w-24" />
										</TableCell>
									</TableRow>
								))
							) : purchases.length === 0 ? (
								<TableRow>
									<TableCell
										className="py-8 text-center text-muted-foreground"
										colSpan={4}
									>
										No {filter.toLowerCase()} purchases found.
									</TableCell>
								</TableRow>
							) : (
								purchases.map((purchase) => (
									<TableRow
										className="cursor-pointer"
										key={purchase.id}
										onClick={() =>
											router.push(`/purchases/${purchase.type}/${purchase.id}`)
										}
									>
										<TableCell className="font-medium">
											{purchase.title}
										</TableCell>

										<TableCell>₹{purchase.amountPaid}</TableCell>

										<TableCell>
											<Badge>{purchase.status}</Badge>
										</TableCell>

										<TableCell>
											{purchase.purchasesAt
												? new Date(purchase.purchasesAt).toLocaleDateString(
														"en-IN",
														{
															day: "2-digit",
															month: "short",
															year: "numeric",
														},
													)
												: "N/A"}
										</TableCell>

										<TableCell>
											<Link href={`/purchases/${purchase.type}/${purchase.id}`}>
												<Button size="sm" variant="ghost">
													<ExternalLink className="size-4" />
												</Button>
											</Link>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{/* Support */}

			<Card>
				<CardHeader>
					<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
						<CardTitle>Support Tickets</CardTitle>
					</div>
				</CardHeader>

				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Subject</TableHead>
								<TableHead>Message</TableHead>
								<TableHead>Created At</TableHead>
								<TableHead>Action</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{isContactDataLoading ? (
								userSkeletonRows.map((rowId) => (
									<TableRow key={rowId}>
										<TableCell>
											<Skeleton className="h-4 w-32" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-4 w-44" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-4 w-28" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-4 w-48" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-4 w-24" />
										</TableCell>
										<TableCell className="text-right">
											<Skeleton className="ml-auto size-8 rounded-md" />
										</TableCell>
									</TableRow>
								))
							) : contactData?.length === 0 ? (
								<TableRow>
									<TableCell
										className="h-32 text-center text-muted-foreground"
										colSpan={6}
									>
										No users found for current filters.
									</TableCell>
								</TableRow>
							) : (
								contactData?.map((data) => (
									<TableRow key={data.id}>
										<TableCell className="font-medium">{data.name}</TableCell>
										<TableCell>{data.email}</TableCell>
										<TableCell>{data.subject}</TableCell>
										<TableCell className="max-w-xs overflow-hidden text-ellipsis">
											{data.message}
										</TableCell>
										<TableCell>
											{new Date(data.createdAt).toLocaleDateString("en-US", {
												year: "numeric",
												month: "short",
												day: "numeric",
											})}
										</TableCell>
										<TableCell className="text-right">
											<DropdownMenu>
												<DropdownMenuTrigger
													render={
														<Button size="icon" variant="ghost">
															<EllipsisVerticalIcon className="size-4" />
															<span className="sr-only">Open actions</span>
														</Button>
													}
												></DropdownMenuTrigger>
												<DropdownMenuContent align="end" className="w-40">
													<DropdownMenuItem
														onClick={() => handleViewDetails(data.id)}
													>
														View Details
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
};

export default UserDetails;
