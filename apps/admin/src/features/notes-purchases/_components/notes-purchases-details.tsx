"use client";

import { CreditCard, ExternalLink, FileText, User } from "lucide-react";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";
import { usePurchaseById } from "../api";

const Row = ({
	label,
	value,
	isLoading = false,
	skeletonWidth = "w-40",
}: {
	label: string;
	value: React.ReactNode;
	isLoading?: boolean;
	skeletonWidth?: string;
}) => (
	<div className="flex items-center justify-between py-3">
		<p className="text-muted-foreground text-sm">{label}</p>

		{isLoading ? (
			<Skeleton className={`h-5 ${skeletonWidth}`} />
		) : (
			<p className="text-right font-medium">{value}</p>
		)}
	</div>
);

const NotesPurchasesDetails = ({ id }: { id: string }) => {
	const { data: purchase, isLoading } = usePurchaseById(id);

	const purchaseId = purchase?.id.toString().slice(-4);

	return (
		<div className="flex flex-col gap-4 px-4 lg:px-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					{isLoading ? (
						<Skeleton className="mt-3 h-10 w-72" />
					) : (
						<h1 className="mt-3 font-bold text-3xl">
							Purchase{" "}
							<span className="font-semibold text-muted-foreground italic">
								#{purchaseId}
							</span>
						</h1>
					)}
				</div>

				<div className="flex flex-col items-end gap-2">
					{isLoading ? (
						<>
							<Skeleton className="h-9 w-28 rounded-full" />
							<Skeleton className="h-9 w-24" />
						</>
					) : (
						<>
							<Badge className="px-4 py-3">{purchase?.status}</Badge>

							<p className="text-right font-bold text-2xl">
								₹{purchase?.status === "PAID" ? purchase.amountPaid : "--"}
							</p>
						</>
					)}
				</div>
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				{/* Customer */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<User className="h-5 w-5" />
							Customer
						</CardTitle>
					</CardHeader>

					<CardContent>
						<Row
							isLoading={isLoading}
							label="Name"
							value={purchase?.userName}
						/>
						<Separator />

						<Row
							isLoading={isLoading}
							label="Email"
							skeletonWidth="w-56"
							value={purchase?.userEmail}
						/>
						<Separator />

						<Row
							isLoading={isLoading}
							label="User ID"
							skeletonWidth="w-52"
							value={purchase?.userId}
						/>
					</CardContent>

					<div className="flex w-full items-center justify-center p-4">
						{isLoading ? (
							<Skeleton className="h-5 w-40" />
						) : (
							<Link
								className="flex gap-2 text-primary hover:underline"
								href={`/users/${purchase?.userId}`}
							>
								Open User Profile
								<ExternalLink className="size-4" />
							</Link>
						)}
					</div>
				</Card>

				{/* Purchased Note */}
				<Card>
					<CardHeader className="flex items-center justify-between">
						<CardTitle className="flex items-center gap-2">
							<FileText className="h-5 w-5" />
							Purchased Note
						</CardTitle>

						{isLoading ? (
							<Skeleton className="h-8 w-8 rounded-md" />
						) : purchase?.status === "PAID" ? (
							<Link href={`/notes-details/${purchase.noteId}`}>
								<Button size="sm" variant="ghost">
									<ExternalLink className="size-4" />
								</Button>
							</Link>
						) : null}
					</CardHeader>

					<CardContent>
						<Row
							isLoading={isLoading}
							label="Title"
							skeletonWidth="w-56"
							value={purchase?.noteTitle}
						/>
						<Separator />

						<Row
							isLoading={isLoading}
							label="Course"
							value={purchase?.course}
						/>
						<Separator />

						<Row
							isLoading={isLoading}
							label="Semester"
							value={purchase?.semester}
						/>
						<Separator />

						<Row
							isLoading={isLoading}
							label="Subject"
							skeletonWidth="w-48"
							value={purchase?.subject}
						/>
						<Separator />

						<Row
							isLoading={isLoading}
							label="Price"
							skeletonWidth="w-20"
							value={`₹${purchase?.price}`}
						/>
					</CardContent>
				</Card>

				{/* Payment Details */}
				<Card className="lg:col-span-2">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<CreditCard className="h-5 w-5" />
							Payment Details
						</CardTitle>
					</CardHeader>

					<CardContent className="grid gap-8 lg:grid-cols-2">
						<div>
							<Row
								isLoading={isLoading}
								label="Status"
								skeletonWidth="w-24"
								value={<Badge>{purchase?.status}</Badge>}
							/>
							<Separator />

							<Row
								isLoading={isLoading}
								label="Amount"
								value={`₹${
									purchase?.status === "PAID" ? purchase.amountPaid : "--"
								}`}
							/>
							<Separator />

							<Row
								isLoading={isLoading}
								label="Currency"
								skeletonWidth="w-16"
								value={purchase?.status === "PAID" ? "INR" : "-"}
							/>
							<Separator />

							<Row
								isLoading={isLoading}
								label="Payment Method"
								skeletonWidth="w-24"
								value={
									purchase?.status === "PAID" ? purchase.paymentMethod : "-"
								}
							/>
							<Separator />

							<Row
								isLoading={isLoading}
								label="Purchased"
								skeletonWidth="w-28"
								value={
									purchase?.purchasesAt
										? new Date(purchase.purchasesAt).toLocaleDateString(
												"en-US",
												{
													year: "numeric",
													month: "short",
													day: "numeric",
												},
											)
										: "-"
								}
							/>
						</div>

						<div>
							<Row
								isLoading={isLoading}
								label="Order ID"
								skeletonWidth="w-56"
								value={purchase?.orderId}
							/>
							<Separator />

							<Row
								isLoading={isLoading}
								label="Payment ID"
								skeletonWidth="w-56"
								value={purchase?.status === "PAID" ? purchase.paymentId : "-"}
							/>
							<Separator />
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default NotesPurchasesDetails;
