"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type NotesFormValues, notesFormSchema } from "@repo/validators";
import type { JSONContent } from "@tiptap/core";
import { TRPCClientError } from "@trpc/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import Tiptap from "~/components/tiptap";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Spinner } from "~/components/ui/spinner";
import { api } from "~/trpc/react";
import AcademicClassification from "./academic-classification";
import PdfUploader from "./pdf-monetization";

interface CreateNotesFormProps {
	notes?: {
		id: string;
		title: string;
		metaTitle: string | null;
		metaDescription: string | null;
		chapterId: string;
		unitName: string;
		content: JSONContent;
		pdfUrl: string | null;
		pdfKey: string | null;
		pdfPrice: string;
		isPaid: boolean;
	};
	notesId?: string;
}

const CreateNotesForm = ({ notes, notesId }: CreateNotesFormProps) => {
	const isEditMode = !!notes && !!notesId;

	const [editorContent, setEditorContent] = useState(notes?.content ?? null);
	const [pdfFile, setPdfFile] = useState<File | null>(null);
	const [isPaid, setIsPaid] = useState(notes?.isPaid ?? false);

	const [price, setPrice] = useState(
		notes?.pdfPrice ? Number(notes.pdfPrice) : 0,
	);
	const router = useRouter();

	const form = useForm<NotesFormValues>({
		resolver: zodResolver(notesFormSchema),
		defaultValues: {
			id: notes?.id ?? "",
			title: notes?.title ?? "",
			metaTitle: notes?.metaTitle ?? "",
			metaDescription: notes?.metaDescription ?? "",
			chapterId: notes?.chapterId ?? "",
			editorContent: notes?.content ?? "",
		},
	});

	const selectedUnitId = form.watch("chapterId") || null;

	useEffect(() => {
		if (!notes) return;

		form.reset({
			id: notes.id,
			title: notes.title,
			metaTitle: notes.metaTitle ?? "",
			metaDescription: notes.metaDescription ?? "",
			chapterId: notes.chapterId,
			editorContent: notes.content,
		});

		setEditorContent(notes.content);
	}, [notes, form]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] ?? null;
		setPdfFile(file);
	};

	const { mutateAsync: createNote, isPending: isCreateNotePending } =
		api.notes.createNote.useMutation({
			onSuccess: () => {
				toast.success("Notes created successfully!");
				router.push("/notes");
			},
		});

	const { mutateAsync: updateNote, isPending: isUpdateNotePending } =
		api.notes.UpdateNote.useMutation({
			onSuccess: () => {
				toast.success("Notes updated successfully!");
				router.push("/notes");
			},
		});

	const uploadPdf = async (
		file: File,
	): Promise<{ url: string; key: string }> => {
		const formData = new FormData();
		formData.append("pdf", file);

		const res = await fetch("/api/upload-pdf", {
			method: "POST",
			body: formData,
		});

		if (!res.ok) {
			const err = await res.json();
			throw new Error(err.error ?? "PDF upload failed");
		}

		return res.json();
	};

	const onSubmit = async (data: NotesFormValues) => {
		console.log("button is pressed.");

		if (!selectedUnitId) {
			toast.error("Please select a unit or chapter before creating notes.");
			return;
		}

		if (!editorContent) {
			toast.error(
				"Editor is Empty! Please add content to the notes before saving.",
			);
			return;
		}

		try {
			let pdfUrl = notes?.pdfUrl ?? null;
			let pdfKey = notes?.pdfKey ?? null;

			if (pdfFile) {
				const uploaded = await uploadPdf(pdfFile);
				pdfUrl = uploaded.url;
				pdfKey = uploaded.key;
			}

			if (isEditMode && notesId) {
				await updateNote({
					...data,
					id: notesId,
					chapterId: selectedUnitId,
					editorContent,
					pdfUrl, // ✅ Tigris URL or null
					pdfKey,
					isPaid,
					price,
				});
			} else {
				await createNote({
					...data,
					chapterId: selectedUnitId,
					editorContent,
					pdfUrl, // ✅ Tigris URL or null
					pdfKey,
					isPaid,
					price,
				});
			}

			form.reset();
			setPdfFile(null);
		} catch (error) {
			if (error instanceof TRPCClientError) {
				toast.error(error.message);
			} else {
				toast.error("An unexpected error occurred. Please try again.");
			}
		}
	};

	return (
		<form
			className="flex flex-col gap-6"
			onSubmit={form.handleSubmit(onSubmit, (errors) => {
				console.error("Form Validation Errors:", errors);
				toast.error("Please fill in all required fields correctly.");
			})}
		>
			<Card>
				<CardContent className="grid gap-5 p-5 lg:grid-cols-2">
					<div className="space-y-2">
						<Controller
							control={form.control}
							name="title"
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="input-field-title">Title</FieldLabel>
									<Input
										{...field} // This spreads onChange, onBlur, value, and ref into your Input
										aria-invalid={fieldState.invalid}
										id="note-title"
										placeholder="Enter note title"
										type="text"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
					</div>

					<div className="space-y-2">
						<Controller
							control={form.control}
							name="metaTitle"
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="input-field-title">
										Meta Title
									</FieldLabel>
									<Input
										{...field}
										aria-invalid={fieldState.invalid}
										id="meta-title"
										placeholder="Enter meta title"
										type="text"
									/>
									<FieldDescription>70 characters max</FieldDescription>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
					</div>

					<div className="space-y-2">
						<Controller
							control={form.control}
							name="metaDescription"
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="input-field-title">
										Meta Description
									</FieldLabel>
									<Input
										{...field}
										id="meta-description"
										placeholder="Enter meta description"
										type="text"
									/>
									<FieldDescription>160 characters max</FieldDescription>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
					</div>
				</CardContent>
			</Card>

			{/* Academic classification */}

			<Card>
				<AcademicClassification
					control={form.control}
					initialUnitId={notes?.chapterId}
					initialUnitName={notes?.unitName}
					selectedUnitId={selectedUnitId}
				/>
			</Card>

			{/*Rich  Text Editor */}

			<Card>
				<Tiptap
					initialContent={editorContent}
					onChange={(json) => setEditorContent(json)}
				/>
			</Card>

			{/* PDF Uploader */}

			<Card>
				<PdfUploader
					existingPdfKey={notes?.pdfKey}
					existingPdfUrl={notes?.pdfUrl}
					isPaid={isPaid}
					onFileChange={handleFileChange}
					pdfFile={pdfFile}
					price={price}
					setIsPaid={setIsPaid}
					setPrice={setPrice}
				/>
			</Card>

			{/* Submit Button */}
			<div className="space-y-2">
				<div className="flex gap-3">
					<Button
						className="w-full"
						disabled={isCreateNotePending || isUpdateNotePending}
						type="submit"
					>
						{isEditMode ? (
							isUpdateNotePending ? (
								<Spinner />
							) : (
								"Update Notes"
							)
						) : isCreateNotePending ? (
							<Spinner />
						) : (
							"Create Notes"
						)}
					</Button>
				</div>
			</div>
		</form>
	);
};

export default CreateNotesForm;
