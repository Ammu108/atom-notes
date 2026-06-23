"use client";

import { EllipsisVerticalIcon, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmActionDialog } from "~/components/confirm-action-dialog";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
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
import { api } from "~/trpc/react";
import type { CONTACT_TYPE } from "../type";

interface ContactProps {
	contactData: CONTACT_TYPE[] | undefined;
	isPending: boolean;
}

const userSkeletonRows = [
	"user-skeleton-1",
	"user-skeleton-2",
	"user-skeleton-3",
];

export function ContactTable({ contactData, isPending }: ContactProps) {
	const utils = api.useUtils();
	const router = useRouter();
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [selectedContactId, setSelectedContactId] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const deleteContactMutation = api.contact.delete.useMutation({
		onSuccess: async (opts) => {
			await utils.contact.getAllContacts.invalidate();
			setDeleteDialogOpen(false);
			setSelectedContactId(null);
			toast.success(opts.message);
		},
		onError: (error) => {
			console.error("Deleting contact failed!");
			toast.error(error.message);
		},
	});

	const handleDelete = (id: string, name: string) => {
		setSelectedContactId({ id, name });
		setDeleteDialogOpen(true);
	};

	const handleDeleteConfirm = async () => {
		if (!selectedContactId) return;

		try {
			await deleteContactMutation.mutateAsync(selectedContactId.id);
			router.refresh();
			setSelectedContactId(null);
			setDeleteDialogOpen(false);
		} catch {
			toast.error("deletion failed!");
		}
	};

	return (
		<Card>
			<CardHeader className="gap-3">
				<CardTitle>Users Directory</CardTitle>
				<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
					<div className="relative w-full md:max-w-sm">
						<SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
						<Input className="pl-9" placeholder="Search name, email or id..." />
					</div>

					<div className="flex flex-col gap-2 sm:flex-row">
						<Select>
							<SelectTrigger className="w-full sm:w-36">
								<SelectValue placeholder="Sort" />
							</SelectTrigger>
							<SelectContent align="end">
								<SelectGroup>
									<SelectItem value="newest">Newest</SelectItem>
									<SelectItem value="oldest">Oldest</SelectItem>
									<SelectItem value="name-asc">A-Z</SelectItem>
									<SelectItem value="name-desc">Z-A</SelectItem>
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
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Subject</TableHead>
							<TableHead>Message</TableHead>
							<TableHead>Created At</TableHead>
							<TableHead className="text-right">Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isPending ? (
							userSkeletonRows.map((rowId) => (
								<TableRow key={rowId}>
									<TableCell>
										<Skeleton className="h-4 w-32" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-48" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-6 w-16 rounded-full" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-24" />
									</TableCell>
									<TableCell className="text-right">
										<div className="flex justify-end">
											<Skeleton className="h-9 w-9 rounded-md" />
										</div>
									</TableCell>
								</TableRow>
							))
						) : contactData?.length === 0 ? (
							<TableRow>
								<TableCell
									className="text-center text-muted-foreground"
									colSpan={5}
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
									<TableCell>{data.message}</TableCell>
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
													className="text-destructive"
													onClick={() => handleDelete(data.id, data.name)}
												>
													Delete Course
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

			<ConfirmActionDialog
				cancelText="Cancel"
				confirmDisabled={!selectedContactId}
				confirmLoading={deleteContactMutation.isPending}
				confirmText="Continue"
				description={`This action is permanent and cannot be undone. ${selectedContactId?.name ?? "This user"} will be deleted from the system.`}
				onCancel={() => setSelectedContactId(null)}
				onConfirm={handleDeleteConfirm}
				onOpenChange={setDeleteDialogOpen}
				open={deleteDialogOpen}
				title="Delete user permanently?"
			/>
		</Card>
	);
}
