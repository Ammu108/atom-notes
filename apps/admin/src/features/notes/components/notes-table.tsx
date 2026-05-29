"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
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

const noteSkeletonRows = ["note-skel-1", "note-skel-2", "note-skel-3"];

export function NotesTable() {
	const { data: notes, isPending } = api.notes.getAllNotes.useQuery();

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
							<TableHead>Meta Title</TableHead>
							<TableHead>ID</TableHead>
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
									<TableCell>{note.metaTitle}</TableCell>
									<TableCell>{note.id}</TableCell>
									<TableCell className="text-right">
										<div className="flex justify-end">
											<Button size="sm" variant="ghost">
												View
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
