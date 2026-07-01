"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type PyqsFormValues, pyqsFormSchema } from "@repo/validators";
import { TRPCClientError } from "@trpc/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import PdfUploader from "~/components/pdf-monetization";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Field, FieldError, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Spinner } from "~/components/ui/spinner";
import { api } from "~/trpc/react";
import AcademicPyqClassification from "./academic-pyq-classification";
import AddPyqQuestion from "./add-pyq-question";

interface CreatePyqFormProps {
	pyq?: PyqsFormValues;
	pyqId?: string;
}

const CreatePyqForm = ({ pyq, pyqId }: CreatePyqFormProps) => {
	const isEditMode = Boolean(pyqId);
	const router = useRouter();
	const [pdfFile, setPdfFile] = useState<File | null>(null);
	const [isPaid, setIsPaid] = useState(false);
	const [price, setPrice] = useState(0);
	const utils = api.useUtils();

	const form = useForm<PyqsFormValues>({
		resolver: zodResolver(pyqsFormSchema),
		defaultValues: {
			title: "",
			year: "",
			subjectId: "",
			questions: [{ question: "" }],
			pdfUrl: null,
			pdfKey: "",
			isPaid: false,
			price: undefined,
		},
	});

	useEffect(() => {
		if (!pyq) return;

		form.reset({
			title: pyq.title,
			year: pyq.year,
			subjectId: pyq.subjectId,
			questions: pyq.questions,
			pdfUrl: pyq.pdfUrl,
			pdfKey: pyq.pdfKey ?? undefined,
			isPaid: pyq.isPaid,
			price: pyq.price ? pyq.price.toString() : undefined,
		});

		setIsPaid(pyq.isPaid ?? false);
		setPrice(pyq.price ? Number(pyq.price) : 0);
	}, [pyq, form]);

	const selectedSubjectId = form.watch("subjectId");

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] ?? null;
		setPdfFile(file);
	};

	const { mutateAsync: createPyq, isPending: isCreatePyqPending } =
		api.pyqs.createPyq.useMutation({
			onSuccess: (opts) => {
				toast.success(opts.message);
				router.push("/pyqs");
			},
		});

	const { mutateAsync: updatePyq, isPending: isUpdatePyqPending } =
		api.pyqs.updatePyq.useMutation({
			onSuccess: (opts) => {
				utils.pyqs.getAllPyqs.invalidate();
				utils.pyqs.getPyqsById.invalidate({ id: pyqId });
				toast.success(opts.message);
				router.push("/pyqs");
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

	const onSubmit = async (data: PyqsFormValues) => {
		console.log("button is pressed");
		if (!selectedSubjectId) {
			toast.error("Please select an subject.");
			return;
		}

		try {
			let pdfUrl = data.pdfUrl;
			let pdfKey = data.pdfKey;

			if (pdfFile) {
				const uploaded = await uploadPdf(pdfFile);
				pdfUrl = uploaded.url;
				pdfKey = uploaded.key;
			}

			console.log("Data being sent is : ", data);

			if (isEditMode && pyqId) {
				await updatePyq({
					...data,
					id: pyqId,
					subjectId: selectedSubjectId,
					pdfUrl,
					pdfKey,
					isPaid,
					price: price.toString(),
				});
			} else {
				await createPyq({
					...data,
					subjectId: selectedSubjectId,
					pdfUrl,
					pdfKey,
					isPaid,
					price: price.toString(),
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
										placeholder="Enter pyq title"
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
							name="year"
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="input-field-title">Pyq Year</FieldLabel>
									<Input
										{...field}
										aria-invalid={fieldState.invalid}
										id="pyq-year"
										placeholder="Enter year of pyq."
										type="text"
									/>
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
				<AcademicPyqClassification
					control={form.control}
					selectedSubjectId={selectedSubjectId}
				/>
			</Card>

			{/* Adding Pyq Question */}
			<Card>
				<AddPyqQuestion form={form} />
			</Card>

			{/* PDF Uploader */}
			<Card>
				<PdfUploader
					existingPdfKey={pyq?.pdfKey}
					existingPdfUrl={pyq?.pdfUrl}
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
						disabled={isCreatePyqPending || isUpdatePyqPending}
						type="submit"
					>
						{isEditMode ? (
							isUpdatePyqPending ? (
								<Spinner />
							) : (
								"Update Notes"
							)
						) : isCreatePyqPending ? (
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

export default CreatePyqForm;
