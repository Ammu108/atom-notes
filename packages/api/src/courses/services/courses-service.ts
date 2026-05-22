import type { DB } from "@repo/db";
import { generateSlug } from "@repo/shared";
import { TRPCError } from "@trpc/server";
import type { z } from "zod";
import { courseRepository } from "../repositories/course-repositary";
import type { coursesSchema } from "../validators/courses-validators";

export const coursesService = {
	async createCourse(input: z.infer<typeof coursesSchema>, db: DB) {
		const generatedSlug = generateSlug(input.slug);

		const courses = await courseRepository.create(db, {
			name: input.name,
			slug: generatedSlug,
			semesters: input.semesters,
		});

		if (!courses) {
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Failed to create course",
			});
		}

		return courses;
	},
};
