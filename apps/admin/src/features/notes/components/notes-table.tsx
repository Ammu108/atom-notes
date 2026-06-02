"use client";

import { EllipsisVerticalIcon, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { useDeleteNote } from "../api";

const noteSkeletonRows = ["note-skel-1", "note-skel-2", "note-skel-3"];

export function NotesTable() {
	const router = useRouter();
	const deleteNoteMutation = useDeleteNote();
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [selectedNote, setSelectedNote] = useState<{
		id: string;
	} | null>(null);
	const { data: notes, isPending } = api.notes.getAllNotes.useQuery();

	const handleNavigateToNotes = (notesId: string) => {
		router.push(`/notes/${notesId}`);
	};

	const handleDeleteNote = (notesId: string) => {
		setDeleteDialogOpen(true);
		setSelectedNote({ id: notesId });
	};

	const handleDeleteConfirm = async () => {
		if (!selectedNote) return;

		try {
			await deleteNoteMutation.mutateAsync({ id: selectedNote.id });
			router.refresh();
			setSelectedNote(null);
			setDeleteDialogOpen(false);
		} catch {
			// Error toast is handled by the mutation hook.
		}
	};

	return (
		<Card>
			<CardHeader className="gap-3">
				<CardTitle>Notes Directory</CardTitle>
				<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
					<div className="relative w-full md:max-w-sm">
						<SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
						<Input className="pl-9" placeholder="Search title or id..." />
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
							<TableHead>Title</TableHead>
							<TableHead>Unit</TableHead>
							<TableHead>Subject</TableHead>
							<TableHead>Updated At</TableHead>
							<TableHead className="text-right">Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isPending ? (
							noteSkeletonRows.map((id) => (
								<TableRow key={id}>
									<TableCell>
										<Skeleton className="h-4 w-48" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-40" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-24" />
									</TableCell>
									<TableCell className="text-right">
										<div className="flex justify-end">
											<Skeleton className="h-9 w-20 rounded-md" />
										</div>
									</TableCell>
								</TableRow>
							))
						) : notes?.length === 0 ? (
							<TableRow>
								<TableCell
									className="text-center text-muted-foreground"
									colSpan={4}
								>
									No notes found.
								</TableCell>
							</TableRow>
						) : (
							notes?.map((note) => (
								<TableRow key={note.id}>
									<TableCell className="font-medium">{note.title}</TableCell>
									<TableCell>{note.chapter}</TableCell>
									<TableCell>{note.subject}</TableCell>
									<TableCell>
										{note.UpdatedAt?.toLocaleDateString("en-US", {
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
													onClick={() => handleNavigateToNotes(note.id)}
												>
													Edit Notes
												</DropdownMenuItem>
												<DropdownMenuItem
													className="text-destructive"
													onClick={() => handleDeleteNote(note.id)}
												>
													Delete Notes
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>

					<ConfirmActionDialog
						cancelText="Cancel"
						confirmDisabled={!selectedNote}
						confirmLoading={deleteNoteMutation.isPending}
						confirmText="Continue"
						description={`This action is permanent and cannot be undone. ${selectedNote?.id ? "This note" : "This course"} will be deleted from the system.`}
						onCancel={() => setSelectedNote(null)}
						onConfirm={handleDeleteConfirm}
						onOpenChange={setDeleteDialogOpen}
						open={deleteDialogOpen}
						title="Delete note permanently?"
					/>
				</Table>
			</CardContent>
		</Card>
	);
}
