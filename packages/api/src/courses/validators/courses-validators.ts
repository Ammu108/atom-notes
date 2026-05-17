import { z } from "zod";

export const unitSchema = z.object({
	name: z
		.string()
		.min(1, "unit name is required")
		.max(256, "unit name must be at most 256 characters"),
});

export const subjectSchema = z.object({
	name: z
		.string()
		.min(1, "subject name is required")
		.max(256, "subject name must be at most 256 characters"),
	units: z
		.array(unitSchema)
		.min(1, "at least one unit is required")
		.max(20, "at most 20 units are allowed"),
});

export const semesterSchema = z.object({
	number: z
		.number()
		.min(1, "semester number must be at least 1")
		.max(16, "semester number must be at most 16"),
	subjects: z
		.array(subjectSchema)
		.min(1, "at least one subject is required")
		.max(10, "at most 10 subjects are allowed"),
});

export const coursesSchema = z.object({
	name: z
		.string()
		.min(1, "course name is required")
		.max(256, "course name must be at most 256 characters"),
	semesters: z
		.array(semesterSchema)
		.min(1, "at least one semester is required")
		.max(8, "at most 8 semesters are allowed"),
	slug: z.string(),
});
