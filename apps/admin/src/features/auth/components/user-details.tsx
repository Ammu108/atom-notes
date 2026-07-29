"use client";

import { Calendar, CreditCard, IndianRupee, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import { ueUserDetailsById } from "../api";

const UserDetails = ({ id }: { id: string }) => {
	const { data: userDetails, isLoading } = ueUserDetailsById(id);
	const router = useRouter();

	return (
		<div className="space-y-6 p-6">
			{/* Header */}
			<Card>
				<CardContent className="flex items-center justify-between pt-6">
					<div className="space-y-2">
						<h1 className="font-bold text-3xl">
							<h1 className="font-bold text-3xl">
								{isLoading ? (
									<Skeleton className="h-9 w-56" />
								) : (
									userDetails?.name
								)}
							</h1>
						</h1>

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
									new Date(userDetails.createdAt).toLocaleDateString("en-IN", {
										day: "2-digit",
										month: "short",
										year: "numeric",
									})
								) : (
									"-"
								)}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Stats */}
			<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
				<Card>
					<CardContent className="flex items-center justify-between pt-6">
						<div>
							<p className="text-muted-foreground text-sm">Total Purchases</p>
							<p className="font-bold text-3xl">
								{isLoading ? (
									<Skeleton className="h-9 w-16" />
								) : (
									userDetails?.stats.totalPurchases
								)}
							</p>
						</div>

						<CreditCard className="h-8 w-8 text-muted-foreground" />
					</CardContent>
				</Card>

				<Card>
					<CardContent className="flex items-center justify-between pt-6">
						<div>
							<p className="text-muted-foreground text-sm">Total Spent</p>
							<p className="font-bold text-3xl">
								{isLoading ? (
									<Skeleton className="h-9 w-20" />
								) : (
									`₹${userDetails?.stats.totalSpent}`
								)}
							</p>
						</div>

						<IndianRupee className="h-8 w-8 text-muted-foreground" />
					</CardContent>
				</Card>

				<Card>
					<CardContent className="flex items-center justify-between pt-6">
						<div>
							<p className="text-muted-foreground text-sm">Account</p>
							<p className="font-semibold text-lg">
								{isLoading ? (
									<Skeleton className="h-6 w-24" />
								) : userDetails?.emailVerified ? (
									"Verified"
								) : (
									"Not Verified"
								)}
							</p>
						</div>

						<User className="h-8 w-8 text-muted-foreground" />
					</CardContent>
				</Card>

				<Card>
					<CardContent className="flex items-center justify-between pt-6">
						<div>
							<p className="text-muted-foreground text-sm">Total Pending</p>
							<p className="font-bold text-3xl">
								{isLoading ? (
									<Skeleton className="h-9 w-16" />
								) : (
									userDetails?.stats.pendingPurchases
								)}
							</p>
						</div>

						<CreditCard className="h-8 w-8 text-muted-foreground" />
					</CardContent>
				</Card>
			</div>

			{/* Purchases */}
			<Card>
				<CardHeader>
					<CardTitle>Purchased Notes</CardTitle>
				</CardHeader>

				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Note</TableHead>
								<TableHead>Amount</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Date</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{isLoading ? (
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
									</TableRow>
								))
							) : userDetails?.purchases.length === 0 ? (
								<TableRow>
									<TableCell className="text-center" colSpan={4}>
										No purchases found.
									</TableCell>
								</TableRow>
							) : (
								userDetails?.purchases.map((purchase) => (
									<TableRow
										className="hover:cursor-pointer"
										key={purchase.purchaseId}
										onClick={() =>
											router.push(`/purchases/${purchase.purchaseId}`)
										}
									>
										<TableCell className="py-3">{purchase.noteTitle}</TableCell>
										<TableCell>₹{purchase.amount}</TableCell>
										<TableCell>
											<Badge>{purchase.status}</Badge>
										</TableCell>
										<TableCell>
											{purchase.purchasedAt
												? new Date(purchase.purchasedAt).toLocaleDateString(
														"en-IN",
														{
															day: "2-digit",
															month: "short",
															year: "numeric",
														},
													)
												: "N/A"}
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
