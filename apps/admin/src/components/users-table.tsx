"use client";

import { EllipsisVerticalIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "~/components/ui/badge";
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
import { ConfirmActionDialog } from "./confirm-action-dialog";

const roleOptions = ["admin", "editor", "viewer"];
const userSkeletonRows = [
	"user-skeleton-1",
	"user-skeleton-2",
	"user-skeleton-3",
];

export function UsersTable() {
	const { data: users, isPending } = api.auth.getAllUsers.useQuery();
	const filteredUsers = users;
	const utils = api.useUtils();
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const deleteUserMutation = api.auth.deleteUser.useMutation({
		onSuccess: async () => {
			await utils.auth.getAllUsers.invalidate();
			setDeleteDialogOpen(false);
			setSelectedUser(null);
			toast.success("User deleted successfully!");
		},
		onError: (err) => {
			console.error("Deleting user failed:", err);
			toast.error("Failed to delete user. Please try again.");
		},
	});

	const handleDelete = (id: string, name: string) => {
		setSelectedUser({ id, name });
		setDeleteDialogOpen(true);
	};

	const handleDeleteConfirm = () => {
		if (!selectedUser) return;
		deleteUserMutation.mutate({ id: selectedUser.id });
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
							<SelectTrigger className="w-full sm:w-40">
								<SelectValue placeholder="Filter role" />
							</SelectTrigger>
							<SelectContent align="end">
								<SelectGroup>
									<SelectItem value="all">All Roles</SelectItem>
									{roleOptions.map((role) => (
										<SelectItem key={role} value={role}>
											{role}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>

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
							<TableHead>Role</TableHead>
							<TableHead>Created</TableHead>
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
						) : filteredUsers?.length === 0 ? (
							<TableRow>
								<TableCell
									className="text-center text-muted-foreground"
									colSpan={5}
								>
									No users found for current filters.
								</TableCell>
							</TableRow>
						) : (
							filteredUsers?.map((user) => (
								<TableRow key={user.id}>
									<TableCell className="font-medium">{user.name}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>
										<Badge className="capitalize" variant="outline">
											{user.role}
										</Badge>
									</TableCell>
									<TableCell>
										{new Date(user.createdAt).toLocaleDateString("en-US", {
											year: "numeric",
											month: "short",
											day: "numeric",
										})}
									</TableCell>
									<TableCell className="text-right">
										<DropdownMenu>
											{user.isDeleted === true ? (
												<div className="flex justify-end">
													<Button type="button" variant="destructive">
														Deleted
													</Button>
												</div>
											) : (
												<DropdownMenuTrigger
													render={
														<Button size="icon-sm" variant="ghost">
															<EllipsisVerticalIcon className="size-4" />
															<span className="sr-only">Open actions</span>
														</Button>
													}
												/>
											)}
											<DropdownMenuContent align="end" className="w-36">
												<DropdownMenuItem>View Profile</DropdownMenuItem>
												<DropdownMenuItem
													onClick={() => handleDelete(user.id, user.name)}
												>
													Delete User
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
				confirmDisabled={!selectedUser}
				confirmLoading={deleteUserMutation.isPending}
				confirmText="Continue"
				description={`This action is permanent and cannot be undone. ${selectedUser?.name ?? "This user"} will be deleted from the system.`}
				onCancel={() => setSelectedUser(null)}
				onConfirm={handleDeleteConfirm}
				onOpenChange={setDeleteDialogOpen}
				open={deleteDialogOpen}
				title="Delete user permanently?"
			/>
		</Card>
	);
}
