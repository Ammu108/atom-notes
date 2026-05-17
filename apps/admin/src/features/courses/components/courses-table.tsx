import { EllipsisVerticalIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";

const courses = [
	{
		id: "1",
		name: "Introduction to React",
		semester: 6,
		subjects: 15,
		createdAt: new Date("2024-01-15"),
	},
	{
		id: "2",
		name: "Advanced TypeScript",
		semester: 8,
		subjects: 20,
		createdAt: new Date("2024-02-20"),
	},
	{
		id: "3",
		name: "Full Stack Development",
		semester: 6,
		subjects: 25,
		createdAt: new Date("2024-01-10"),
	},
	{
		id: "4",
		name: "Web Design Fundamentals",
		semester: 4,
		subjects: 12,
		createdAt: new Date("2024-03-05"),
	},
	{
		id: "5",
		name: "Cloud Computing Basics",
		semester: 8,
		subjects: 15,
		createdAt: new Date("2024-02-28"),
	},
];

export function CoursesTable() {
	return (
		<Card>
			<CardHeader className="gap-3">
				<CardTitle>Courses Directory</CardTitle>
			</CardHeader>

			<CardContent>
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
						{courses.map((course) => (
							<TableRow key={course.id}>
								<TableCell className="font-medium">{course.name}</TableCell>
								<TableCell>{course.semester}</TableCell>
								<TableCell>{course.subjects}</TableCell>
								<TableCell>
									{course.createdAt.toLocaleDateString("en-US", {
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
											<DropdownMenuItem>Edit Course</DropdownMenuItem>
											<DropdownMenuItem className="text-destructive">
												Delete Course
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
