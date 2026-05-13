import { SearchIcon } from "lucide-react";
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
import { Table, TableHead, TableHeader, TableRow } from "~/components/ui/table";

const roleOptions = ["admin", "editor", "viewer"];

export function NotesTable() {
	return (
		<Card>
			<CardHeader className="gap-3">
				<CardTitle>Notes Directory </CardTitle>
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
				</Table>
			</CardContent>
		</Card>
	);
}
