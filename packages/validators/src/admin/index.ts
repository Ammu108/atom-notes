import z from "zod";
import {
	emailSchema,
	idSchema,
	isPaidSchema,
	passwordSchema,
	priceSchema,
	questionPdfKeySchema,
	questionPdfUrlSchema,
	solutionPdfKeySchema,
	solutionPdfUrlSchema,
	subjectIdSchema,
	titleSchema,
	yearSchema,
} from "../shared";

export const notesFormSchema = z.object({
	id: idSchema,

	title: titleSchema,

	metaTitle: z
		.string({ required_error: "Meta title is required" })
		.min(2, { message: "Meta title must be at least 2 characters long" })
		.max(70, { message: "Meta title cannot exceed 70 characters" }),

	metaDescription: z
		.string({ required_error: "Meta description is required" })
		.min(2, { message: "Meta description must be at least 2 characters long" })
		.max(160, { message: "Meta description cannot exceed 160 characters" }),

	unitId: z
		.string({ message: "Unit ID is required" })
		.uuid({ message: "Invalid Unit ID format (must be a valid UUID)" }),

	editorContent: z.unknown().optional(),

	pdfUrl: z.string().optional().nullable(),

	isPaid: z.boolean().optional(),
	price: z
		.number()
		.refine((value) => value >= 0, {
			message: "Price must be a non-negative number",
		})
		.optional(),
});

export type NotesFormValues = z.infer<typeof notesFormSchema>;

export const adminLoginSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
});

export type AdminLoginSchema = z.infer<typeof adminLoginSchema>;

export const pyqsFormSchema = z.object({
	title: titleSchema,
	year: yearSchema,
	subjectId: subjectIdSchema,
	questions: z.array(
		z.object({
			question: z.string({ required_error: "Question text is required" }),
		}),
	),
	questionPdfUrl: questionPdfUrlSchema,
	questionPdfKey: questionPdfKeySchema,

	solutionPdfUrl: solutionPdfUrlSchema,
	solutionPdfKey: solutionPdfKeySchema,

	isPaid: isPaidSchema,
	price: priceSchema,
});

export type PyqsFormValues = z.infer<typeof pyqsFormSchema>;

export const updatePyqSchema = pyqsFormSchema.extend({
	id: idSchema,
});

export type UpdatePyqValues = z.infer<typeof updatePyqSchema>;
