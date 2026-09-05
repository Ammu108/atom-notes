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
		.string()
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

export const createCourseSchema = z.object({
	name: z.string().min(1, "Course name is required"),
	slug: z.string().min(1, "Course slug is required"),
	semesters: z.array(
		z.object({
			semesterNumber: z.number().int().positive(),
			subjects: z.array(
				z.object({
					name: z.string().min(1, "Subject name is required"),
					units: z.array(
						z.object({
							name: z.string().min(1, "Unit name is required"),
							description: z.string().min(1, "Unit description is required"),
						}),
					),
				}),
			),
		}),
	),
});

// export const updateCourseSchema = z.object({
// 	courseId: z.string().uuid(),
// 	name: z.string().min(1, "Course name is required"),
// 	slug: z.string().min(1, "Slug is required"),
// 	semesters: z.array(
// 		z.object({
// 			id: z.string().uuid().optional(),
// 			semesterNumber: z.number().int().positive(),
// 			subjects: z.array(
// 				z.object({
// 					id: z.string().uuid().optional(),
// 					name: z.string().min(1, "Subject name is required"),
// 					code: z.string().nullable().optional(),
// 					units: z.array(
// 						z.object({
// 							id: z.string().uuid().optional(),
// 							name: z.string().min(1, "Unit name is required"),
// 						}),
// 					),
// 				}),
// 			),
// 		}),
// 	),
// });

export const getCourseByIdSchema = z.object({
	id: z.string(),
});

export const getSemestersByCourseIdSchema = z.object({
	id: z.string(),
});

export const getSubjectsBySemesterIdSchema = z.object({
	id: z.string(),
});

export const getUnitsBySubjectIdSchema = z.object({
	id: z.string(),
});

// export const updateCourseSchema = coursesSchema.extend({
// 	courseId: z.string().uuid(),
// });
