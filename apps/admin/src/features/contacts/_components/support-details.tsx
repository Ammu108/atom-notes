"use client";

import {
	Calendar,
	ExternalLink,
	Mail,
	MessageSquare,
	Send,
	Trash2,
	User,
} from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";
import { Textarea } from "~/components/ui/textarea";
import { useGetSupportDetailsById } from "../api";

const SupportDetailsById = ({ id }: { id: string }) => {
	const {
		data: contact,
		isLoading,
		isError,
		error,
	} = useGetSupportDetailsById(id);

	if (isError) {
		return (
			<div className="flex h-64 items-center justify-center">
				<p className="text-destructive">
					{error?.message ?? "Failed to load contact details."}
				</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6 p-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="space-y-1">
					<h1 className="font-bold text-3xl">Contact Details</h1>

					<p className="text-muted-foreground">
						View and manage customer enquiry.
					</p>
				</div>

				<Link
					className="flex items-center justify-center gap-1"
					href={`/users/${contact?.userId}`}
				>
					<p className="text-sm hover:cursor-pointer hover:underline">
						View User
					</p>
					<ExternalLink className="h-4 w-4" />
				</Link>
			</div>

			<div className="grid gap-6 lg:grid-cols-3">
				{/* Contact Information */}
				<Card className="lg:col-span-1">
					<CardHeader>
						<CardTitle>Contact Information</CardTitle>
					</CardHeader>

					<CardContent className="space-y-5">
						<div className="flex items-start gap-3">
							<User className="mt-1 h-5 w-5 text-muted-foreground" />

							<div className="w-full">
								<p className="text-muted-foreground text-sm">Full Name</p>

								{isLoading ? (
									<Skeleton className="mt-1 h-5 w-40" />
								) : (
									<p className="font-medium">{contact?.name}</p>
								)}
							</div>
						</div>

						<Separator />

						<div className="flex items-start gap-3">
							<Mail className="mt-1 h-5 w-5 text-muted-foreground" />

							<div className="w-full">
								<p className="text-muted-foreground text-sm">Email</p>

								{isLoading ? (
									<Skeleton className="mt-1 h-5 w-56" />
								) : (
									<p className="font-medium">{contact?.email}</p>
								)}
							</div>
						</div>

						<Separator />

						<div className="flex items-start gap-3">
							<MessageSquare className="mt-1 h-5 w-5 text-muted-foreground" />

							<div className="w-full">
								<p className="text-muted-foreground text-sm">Subject</p>

								{isLoading ? (
									<Skeleton className="mt-1 h-5 w-48" />
								) : (
									<p className="font-medium">{contact?.subject}</p>
								)}
							</div>
						</div>

						<Separator />

						<div className="flex items-start gap-3">
							<Calendar className="mt-1 h-5 w-5 text-muted-foreground" />

							<div className="w-full">
								<p className="text-muted-foreground text-sm">Received On</p>

								{isLoading ? (
									<Skeleton className="mt-1 h-5 w-32" />
								) : (
									<p className="font-medium">
										{contact?.createdAt
											? new Date(contact.createdAt).toLocaleDateString(
													"en-IN",
													{
														day: "2-digit",
														month: "short",
														year: "numeric",
													},
												)
											: "-"}
									</p>
								)}
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Right */}
				<div className="space-y-6 lg:col-span-2">
					{/* Message */}
					<Card>
						<CardHeader>
							<CardTitle>Message</CardTitle>
						</CardHeader>

						<CardContent>
							<div className="rounded-lg border bg-muted/40 p-5">
								{isLoading ? (
									<div className="space-y-3">
										<Skeleton className="h-4 w-full" />
										<Skeleton className="h-4 w-full" />
										<Skeleton className="h-4 w-5/6" />
										<Skeleton className="h-4 w-full" />
										<Skeleton className="h-4 w-3/4" />
										<Skeleton className="h-4 w-2/3" />
									</div>
								) : (
									<p className="whitespace-pre-line text-muted-foreground leading-7">
										{contact?.message}
									</p>
								)}
							</div>
						</CardContent>
					</Card>

					{/* Reply */}
					<Card>
						<CardHeader>
							<CardTitle>Reply (Optional) Coming Soon</CardTitle>
						</CardHeader>

						<CardContent className="space-y-4">
							{isLoading ? (
								<Skeleton className="h-40 w-full rounded-md" />
							) : (
								<Textarea
									placeholder="Write your reply to the customer..."
									rows={7}
								/>
							)}

							<div className="flex flex-wrap justify-end gap-3">
								{isLoading ? (
									<>
										<Skeleton className="h-10 w-28 rounded-md" />
										<Skeleton className="h-10 w-24 rounded-md" />
										<Skeleton className="h-10 w-32 rounded-md" />
									</>
								) : (
									<>
										<Button variant="outline">Mark as Read</Button>

										<Button variant="destructive">
											<Trash2 className="mr-2 h-4 w-4" />
											Delete
										</Button>

										<Button>
											<Send className="mr-2 h-4 w-4" />
											Send Reply
										</Button>
									</>
								)}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default SupportDetailsById;
