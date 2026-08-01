"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
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
import {
	useGetAllPurchasesByPyqId,
	useGetPyqsById,
	usePyqStatsById,
} from "../api";

const PyqDetails = ({ id }: { id: string }) => {
	const { data: stats, isLoading: isStatsLoading } = usePyqStatsById(id);
	const { data: purchases, isLoading: isPurchasesLoading } =
		useGetAllPurchasesByPyqId(id);
	const { data: pyq, isLoading: isNoteLoading } = useGetPyqsById(id);

	return (
		<div className="space-y-6 px-4 pb-8 lg:px-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					{isNoteLoading ? (
						<Skeleton className="h-9 w-80" />
					) : (
						<h1 className="font-bold text-3xl">{pyq?.title}</h1>
					)}

					<p className="text-muted-foreground">
						Detailed sales and purchase analytics
					</p>
				</div>
			</div>

			{/* Stats */}
			<div className="grid gap-4 md:grid-cols-4">
				<Card>
					<CardHeader>
						<CardTitle>Total Revenue</CardTitle>
					</CardHeader>

					<CardContent>
						{isStatsLoading ? (
							<Skeleton className="h-9 w-24" />
						) : (
							<p className="font-bold text-3xl">₹{stats?.revenue}</p>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Total Purchases</CardTitle>
					</CardHeader>

					<CardContent>
						{isStatsLoading ? (
							<Skeleton className="h-9 w-16" />
						) : (
							<p className="font-bold text-3xl">{stats?.totalPurchases}</p>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Price</CardTitle>
					</CardHeader>

					<CardContent>
						{isNoteLoading ? (
							<Skeleton className="h-9 w-20" />
						) : (
							<p className="font-bold text-3xl">₹{pyq?.price}</p>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Downloads</CardTitle>
					</CardHeader>

					<CardContent>
						<p className="font-bold text-xl">Coming Soon</p>
					</CardContent>
				</Card>
			</div>

			{/* Note Details */}
			<Card>
				<CardHeader>
					<CardTitle>Note Information</CardTitle>
				</CardHeader>

				<CardContent className="grid gap-6 md:grid-cols-2">
					<div>
						<p className="text-muted-foreground text-sm">Course</p>
						{isNoteLoading ? (
							<Skeleton className="mt-1 h-5 w-40" />
						) : (
							<p>{pyq?.course}</p>
						)}
					</div>

					<div>
						<p className="text-muted-foreground text-sm">Semester</p>
						{isNoteLoading ? (
							<Skeleton className="mt-1 h-5 w-20" />
						) : (
							<p>{pyq?.semester}</p>
						)}
					</div>

					<div>
						<p className="text-muted-foreground text-sm">Subject</p>
						{isNoteLoading ? (
							<Skeleton className="mt-1 h-5 w-48" />
						) : (
							<p>{pyq?.subjectName}</p>
						)}
					</div>

					<div>
						<p className="text-muted-foreground text-sm">Status</p>
						{isNoteLoading ? (
							<Skeleton className="mt-1 h-6 w-24 rounded-full" />
						) : (
							<Badge>Published</Badge>
						)}
					</div>

					<div>
						<p className="text-muted-foreground text-sm">Created At</p>
						{isNoteLoading ? (
							<Skeleton className="mt-1 h-5 w-28" />
						) : (
							<p>
								{pyq?.createdAt
									? new Date(pyq.createdAt).toLocaleDateString("en-US", {
											year: "numeric",
											month: "short",
											day: "numeric",
										})
									: "-"}
							</p>
						)}
					</div>

					<div>
						<p className="text-muted-foreground text-sm">Last Updated</p>
						{isNoteLoading ? (
							<Skeleton className="mt-1 h-5 w-28" />
						) : (
							<p>
								{pyq?.updatedAt
									? new Date(pyq.updatedAt).toLocaleDateString("en-US", {
											year: "numeric",
											month: "short",
											day: "numeric",
										})
									: "-"}
							</p>
						)}
					</div>
				</CardContent>
			</Card>

			{/* Recent Purchases */}
			<Card>
				<CardHeader>
					<CardTitle>Recent Purchases</CardTitle>
				</CardHeader>

				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Buyer</TableHead>
								<TableHead>Email</TableHead>
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
											<Skeleton className="h-5 w-36" />
										</TableCell>
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
											<Skeleton className="h-5 w-28" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-8 w-8 rounded-md" />
										</TableCell>
									</TableRow>
								))
							) : purchases && purchases.length > 0 ? (
								purchases.map((purchase) => (
									<TableRow className="hover:cursor-pointer" key={purchase.id}>
										<TableCell className="py-3">{purchase.userName}</TableCell>

										<TableCell>{purchase.userEmail}</TableCell>

										<TableCell>₹{purchase.amountPaid}</TableCell>

										<TableCell>
											<Badge>{purchase.status}</Badge>
										</TableCell>

										<TableCell>
											{purchase.purchasesAt
												? new Date(purchase.purchasesAt).toLocaleDateString(
														"en-US",
														{
															year: "numeric",
															month: "short",
															day: "numeric",
														},
													)
												: "-"}
										</TableCell>

										<TableCell>
											<Link href={`/users/${purchase.userId}`}>
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
										className="py-8 text-center text-muted-foreground"
										colSpan={6}
									>
										No purchases found.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
};

export default PyqDetails;
