import { normalizeString } from "@repo/shared/normalize-string";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { courseRepository } from "../repositories/course-repositary";
import { coursesService } from "../services/courses-service";
import {
	coursesSchema,
	getCourseByIdSchema,
	updateCourseSchema,
} from "../validators/courses-validators";

export const courseRouter = createTRPCRouter({
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

	getAllCourses: publicProcedure.query(async ({ ctx }) => {
		if (!ctx.user || ctx.user.role !== "admin") {
			throw new TRPCError({
				code: "FORBIDDEN",
				message: "Only admins can view courses",
			});
		}

		return await courseRepository.getAllCourses(ctx.db);
	}),

	getCourseById: publicProcedure
		.input(getCourseByIdSchema)
		.query(async ({ input, ctx }) => {
			if (!ctx.user || ctx.user.role !== "admin") {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "Only admins can view course details",
				});
			}

			const course = await courseRepository.findCourseById(ctx.db, input.id);

			if (!course) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Course not found",
				});
			}

			return course;
		}),

	updateCourse: publicProcedure
		.input(updateCourseSchema)
		.mutation(async ({ input, ctx }) => {
			if (!ctx.user || ctx.user.role !== "admin") {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "Only admins can update courses",
				});
			}

			const normalizedName = normalizeString(input.name);

			const existingCourse = await courseRepository.findCourseBySlug(
				ctx.db,
				normalizedName,
			);

			// allow same course to update itself
			const duplicateCourse = existingCourse.find(
				(course) => course.id !== input.courseId,
			);

			if (duplicateCourse) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Course with this name already exists",
				});
			}

			return await courseRepository.updateCourse(ctx.db, input.courseId, {
				...input,
				slug: normalizedName,
			});
		}),

	deleteCourse: publicProcedure
		.input(getCourseByIdSchema)
		.mutation(async ({ input, ctx }) => {
			if (!ctx.user || ctx.user.role !== "admin") {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "Only admins can delete courses",
				});
			}

			const course = await courseRepository.deleteCourse(ctx.db, input.id);

			if (!course) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Course not found",
				});
			}

			return course;
		}),
});
