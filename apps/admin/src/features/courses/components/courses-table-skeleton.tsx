import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";

export function CoursesTableSkeleton() {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Total Semesters</TableHead>
					<TableHead>Total Subjects</TableHead>
					<TableHead>Created At</TableHead>
					<TableHead className="text-right">Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell className="font-medium">
						<div className="h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-600" />
					</TableCell>
					<TableCell>
						<div className="h-4 w-8 animate-pulse rounded bg-gray-200 dark:bg-gray-600" />
					</TableCell>
					<TableCell>
						<div className="h-4 w-8 animate-pulse rounded bg-gray-200 dark:bg-gray-600" />
					</TableCell>
					<TableCell>
						<div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-600" />
					</TableCell>
					<TableCell className="text-right">
						<div className="h-4 w-6 animate-pulse rounded bg-gray-200 dark:bg-gray-600" />
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
}
