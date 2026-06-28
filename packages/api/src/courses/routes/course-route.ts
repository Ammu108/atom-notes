import { generateSlug } from "@repo/shared";
import { TRPCError } from "@trpc/server";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../../trpc";
import { courseRepository } from "../repositories/course-repositary";
import { coursesService } from "../services/courses-service";
import {
	coursesSchema,
	getCourseByIdSchema,
	getSemestersByCourseIdSchema,
	getSubjectsBySemesterIdSchema,
	getUnitsBySubjectIdSchema,
	updateCourseSchema,
} from "../validators/courses-validators";

export const courseRouter = createTRPCRouter({
	createCourse: adminProcedure
		.input(coursesSchema)
		.mutation(async ({ input, ctx }) => {
			if (!ctx.user || ctx.user.role !== "ADMIN") {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "Only admins can create courses",
				});
			}

			// check if course with same slug already exists
			const normalizedName = generateSlug(input.name);

			const isSLugExist = await courseRepository.findCourseBySlug(
				ctx.db,
				normalizedName,
			);

			if (isSLugExist.length > 0) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Course with this name already exists!",
				});
			}

			const course = await coursesService.createCourse(input, ctx.db);

			return course;
		}),

	updateCourse: adminProcedure
		.input(updateCourseSchema)
		.mutation(async ({ input, ctx }) => {
			if (!ctx.user || ctx.user.role !== "ADMIN") {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "Only admins can update courses",
				});
			}

			const normalizedName = generateSlug(input.name);

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

			const course = await coursesService.updateCourse(input, ctx.db);

			return course;
		}),

	getAllCourses: publicProcedure.query(async ({ ctx }) => {
		return await courseRepository.getAllCourses(ctx.db);
	}),

	getCourseById: publicProcedure
		.input(getCourseByIdSchema)
		.query(async ({ input, ctx }) => {
			const course = await courseRepository.findCourseById(ctx.db, input.id);

			if (!course) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Course not found!",
				});
			}

			return course;
		}),

	getSemestersByCourseId: publicProcedure
		.input(getSemestersByCourseIdSchema)
		.query(async ({ input, ctx }) => {
			const semesters = await courseRepository.findSemesterByCourseId(
				ctx.db,
				input.id,
			);

			if (!semesters) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "semesters not found!",
				});
			}

			return semesters;
		}),

	getSubjectsBySemesterId: publicProcedure
		.input(getSubjectsBySemesterIdSchema)
		.query(async ({ input, ctx }) => {
			const subjects = await courseRepository.findSubjectBySemesterId(
				ctx.db,
				input.id,
			);

			if (!subjects) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "subjects not found!",
				});
			}

			return subjects;
		}),

	getUnitsBySubjectId: publicProcedure
		.input(getUnitsBySubjectIdSchema)
		.query(async ({ input, ctx }) => {
			const subjects = await courseRepository.findUnitsBySubjectId(
				ctx.db,
				input.id,
			);

			if (!subjects) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Units not found!",
				});
			}

			return subjects;
		}),

	deleteCourse: adminProcedure
		.input(getCourseByIdSchema)
		.mutation(async ({ input, ctx }) => {
			if (!ctx.user || ctx.user.role !== "ADMIN") {
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
