import { normalizeString } from "packages/shared/helpers/normalize-string";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { courseRepository } from "../repositories/course-repositary";
import { coursesService } from "../services/courses-service";
import { coursesSchema } from "../validators/courses-validators";

export const coursesRoute = createTRPCRouter({
	createCourse: publicProcedure
		.input(coursesSchema)
		.mutation(async ({ input, ctx }) => {
			// check if course with same slug already exists

			const normalizedName = normalizeString(input.name);

			const isSLugExist = await courseRepository.findCourseBySlug(
				ctx.db,
				normalizedName,
			);

			if (isSLugExist.length > 0) {
				throw new Error("Course with this name already exists");
			}

			const course = await coursesService.createCourse(input, ctx.db);

			return course;
		}),
});
