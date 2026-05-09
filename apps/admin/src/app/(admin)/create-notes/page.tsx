import { CloudUpload, FileText, ImageIcon, Layers3 } from "lucide-react";
import { SiteHeader } from "~/components/site-header";
import Tiptap from "~/components/tiptap";

import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Field, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";

const courses = ["B.Tech", "BCA", "MCA", "MBA"];
const branches = [
	"Computer Science",
	"Information Technology",
	"Mechanical",
	"Electronics",
];
const semesters = ["Semester 1", "Semester 2", "Semester 3", "Semester 4"];

const subjects = ["Subject 1", "Subject 2", "Subject 3", "Subject 4"];

const CreateNotes = () => {
	return (
		<>
			<SiteHeader title="Create New Notes" />
			<div className="p-4 lg:p-6">
				<div className="flex flex-col gap-4">
					<Card>
						<CardContent className="grid gap-5 p-5 lg:grid-cols-2">
							<div className="space-y-2">
								<Field>
									<FieldLabel htmlFor="input-field-title">Title</FieldLabel>
									<Input
										id="input-field-title"
										placeholder="Enter note title"
										type="text"
									/>
								</Field>
							</div>

							<div className="space-y-2">
								<Field>
									<FieldLabel htmlFor="input-field-tags">
										Search Keywords (Tags)
									</FieldLabel>
									<Input
										id="input-field-tags"
										placeholder="Enter search keywords"
										type="text"
									/>
								</Field>
							</div>

							<div className="lg:col-span-2">
								<div className="space-y-1.5">
									<Field>
										<FieldLabel htmlFor="input-field-slug">
											URL Slug (Optional)
										</FieldLabel>
										<Input
											id="input-field-slug"
											placeholder="atomsnote/notes/semester-1/computer-science/subject-name"
											type="text"
										/>
									</Field>
								</div>
							</div>

							<div className="lg:col-span-2">
								<div className="space-y-3">
									<FieldLabel htmlFor="input-field-slug">
										Thumbnail Image
									</FieldLabel>
									<div className="flex min-h-44 items-center justify-center rounded-lg border border-input border-dashed bg-transparent px-6 py-10 text-center dark:bg-input/30">
										<div className="flex max-w-sm flex-col items-center gap-3">
											<div className="flex h-12 w-12 items-center justify-center rounded-full border border-input bg-background">
												<ImageIcon className="h-6 w-6" />
											</div>
											<p className="font-medium text-muted-foreground text-sm">
												Drag and drop or click to upload
											</p>
											<p className="text-muted-foreground text-xs">
												1200×630px recommended (Max 5MB)
											</p>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="px-5 py-4">
							<div className="flex items-center gap-2">
								<Layers3 className="h-4 w-4" />
								<CardTitle className="font-semibold text-sm">
									Academic Classification
								</CardTitle>
							</div>
						</CardHeader>
						<CardContent className="grid gap-5 p-5 lg:grid-cols-4">
							<div className="space-y-2">
								<FieldLabel htmlFor="input-field-slug">Course</FieldLabel>
								<Select defaultValue="B.Tech">
									<SelectTrigger className="w-full">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{courses.map((item) => (
											<SelectItem key={item} value={item}>
												{item}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<FieldLabel htmlFor="input-field-slug">Branch</FieldLabel>
								<Select defaultValue="Computer Science">
									<SelectTrigger className="w-full">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{branches.map((item) => (
											<SelectItem key={item} value={item}>
												{item}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<FieldLabel htmlFor="input-field-slug">Semester</FieldLabel>
								<Select defaultValue="Semester 1">
									<SelectTrigger className="w-full">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{semesters.map((item) => (
											<SelectItem key={item} value={item}>
												{item}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<FieldLabel htmlFor="input-field-slug">Subject</FieldLabel>
								<Select defaultValue="Subject 1">
									<SelectTrigger className="w-full">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{subjects.map((item) => (
											<SelectItem key={item} value={item}>
												{item}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2 lg:col-span-1">
								<Field>
									<FieldLabel htmlFor="input-field-slug">
										Unit / Chapter
									</FieldLabel>
									<Input
										id="input-field-slug"
										placeholder="e.g. unit-1"
										type="text"
									/>
								</Field>
							</div>
						</CardContent>
					</Card>

					{/*Rich  Text Editor */}

					<Card>
						<Tiptap />
					</Card>

					<Card>
						<CardHeader className="px-5 py-4">
							<div className="flex items-center gap-2">
								<FileText className="h-4 w-4" />
								<CardTitle className="font-semibold text-sm">
									PDF & Monetization
								</CardTitle>
							</div>
						</CardHeader>

						<CardContent className="grid gap-5 p-5 lg:grid-cols-[1.2fr_0.8fr]">
							<div className="flex flex-col justify-between rounded-lg border border-input border-dashed p-4 dark:bg-input/30">
								<div className="mb-3 flex flex-row items-center justify-between">
									<Label className="font-medium text-muted-foreground text-sm">
										PDF Upload (Optional)
									</Label>
									<Badge
										className="rounded-full bg-background"
										variant="secondary"
									>
										DOC
									</Badge>
								</div>
								<div className="flex min-h-32 items-center justify-center rounded-lg border border-input border-dashed p-4 text-center">
									<div className="flex flex-col items-center gap-2">
										<div className="flex h-11 w-11 items-center justify-center rounded-full bg-background">
											<CloudUpload className="h-5 w-5" />
										</div>
										<div className="font-medium text-muted-foreground text-sm">
											upload-notes.pdf
										</div>
										<div className="text-muted-foreground text-xs">24.2 MB</div>
										<div className="text-muted-foreground text-xs">
											Complete
										</div>
									</div>
								</div>
							</div>

							<div className="flex flex-col gap-4">
								<div className="flex items-center justify-between rounded-lg border border-input px-4 py-3 dark:bg-input/30">
									<div>
										<p className="font-medium text-muted-foreground text-sm">
											Paid?
										</p>
									</div>
									<Switch id="airplane-mode" />
								</div>

								<div className="grid grid-cols-2 gap-3">
									<div className="rounded-lg border border-input p-4 dark:bg-input/30">
										<p className="mb-2 font-medium text-muted-foreground text-sm">
											Price (INR)
										</p>
										<Input
											className="h-11 rounded-lg border border-input px-4 text-sm dark:bg-input/30"
											defaultValue="49"
										/>
									</div>
									<div className="rounded-lg border border-input p-4 dark:bg-input/30">
										<p className="mb-2 font-medium text-muted-foreground text-sm">
											Alpha Coins
										</p>
										<Input
											className="h-11 rounded-lg border border-input px-4 text-sm dark:bg-input/30"
											defaultValue="10"
										/>
									</div>
								</div>

								<div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 text-sm">
									Automatic watermark protection will be applied to the PDF.
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
};

export default CreateNotes;
