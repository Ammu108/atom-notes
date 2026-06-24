import { chapters, courses, type DB, semesters, subjects } from "@repo/db";
import { countDistinct, desc, eq } from "drizzle-orm";

export const courseRepository = {
	// check if slug already exists
	async findCourseBySlug(db: DB, slug: string) {
		return await db
			.select()
			.from(courses)
			.where(eq(courses.slug, slug))
			.limit(1);
	},

	// create course relationally
	async create(
		db: DB,
		data: {
			name: string;
			slug: string;

			semesters: {
				number: number;

				subjects: {
					name: string;

					units: {
						name: string;
					}[];
				}[];
			}[];
		},
	) {
		return await db.transaction(async (tx) => {
			// =================================================
			// CREATE COURSE
			// =================================================
			const [createdCourse] = await tx
				.insert(courses)
				.values({
					name: data.name,
					slug: data.slug,
				})
				.returning({
					id: courses.id,
					name: courses.name,
					slug: courses.slug,
				});

			if (!createdCourse) {
				throw new Error("Failed to create course");
			}

			// =================================================
			// CREATE SEMESTERS
			// =================================================

			for (const semesterData of data.semesters) {
				const [createdSemester] = await tx
					.insert(semesters)
					.values({
						number: semesterData.number,

						courseId: createdCourse.id,
					})
					.returning({
						id: semesters.id,
						number: semesters.number,
					});

				if (!createdSemester) {
					throw new Error("Failed to create semester");
				}

				// =============================================
				// CREATE SUBJECTS
				// =============================================

				for (const subjectData of semesterData.subjects) {
					const [createdSubject] = await tx
						.insert(subjects)
						.values({
							name: subjectData.name,
							semesterId: createdSemester.id,
						})
						.returning({
							id: subjects.id,
							name: subjects.name,
						});

					if (!createdSubject) {
						throw new Error("Failed to create subject");
					}

					// =========================================
					// CREATE UNITS
					// =========================================

					for (const unitData of subjectData.units) {
						const [createdUnit] = await tx
							.insert(chapters)
							.values({
								name: unitData.name,

								subjectId: createdSubject.id,
							})
							.returning({
								id: chapters.id,
								name: chapters.name,
							});

						if (!createdUnit) {
							throw new Error("Failed to create unit");
						}
					}
				}
			}

			// =================================================
			// RETURN FINAL RESPONSE
			// =================================================

			return {
				message: "Course created successfully",
				course: createdCourse,
			};
		});
	},

	// update course
	async updateCourse(
		db: DB,
		courseId: string,
		data: {
			name: string;
			slug: string;

			semesters: {
				number: number;

				subjects: {
					name: string;

					units: {
						name: string;
					}[];
				}[];
			}[];
		},
	) {
		return await db.transaction(async (tx) => {
			const existingCourse = await tx.query.courses.findFirst({
				where: (course, { eq }) => eq(course.id, courseId),
			});

			if (!existingCourse) {
				throw new Error("Course not found");
			}

			// update course
			const [updatedCourse] = await tx
				.update(courses)
				.set({
					name: data.name,
					slug: data.slug,
				})
				.where(eq(courses.id, courseId))
				.returning({
					id: courses.id,
					name: courses.name,
					slug: courses.slug,
				});

			// ============================================
			// DELETE OLD RELATIONS
			// ============================================

			const existingSemesters = await tx.query.semesters.findMany({
				where: (semester, { eq }) => eq(semester.courseId, courseId),
			});

			// delete subjects
			for (const semester of existingSemesters) {
				await tx.delete(subjects).where(eq(subjects.semesterId, semester.id));
			}

			// delete semesters
			await tx.delete(semesters).where(eq(semesters.courseId, courseId));

			// ============================================
			// RE-CREATE NEW RELATIONS
			// ============================================

			for (const semesterData of data.semesters) {
				const [createdSemester] = await tx
					.insert(semesters)
					.values({
						number: semesterData.number,
						courseId: courseId,
					})
					.returning({
						id: semesters.id,
					});

				if (!createdSemester) {
					throw new Error("Failed to create semester");
				}

				for (const subjectData of semesterData.subjects) {
					const [createdSubject] = await tx
						.insert(subjects)
						.values({
							name: subjectData.name,
							semesterId: createdSemester.id,
						})
						.returning({
							id: subjects.id,
						});

					if (!createdSubject) {
						throw new Error("Failed to create subject");
					}

					for (const unitData of subjectData.units) {
						await tx.insert(chapters).values({
							name: unitData.name,
							subjectId: createdSubject.id,
						});
					}
				}
			}

			// ============================================
			// RETURN RESPONSE
			// ============================================

			return {
				message: "Course updated successfully",
				course: updatedCourse,
			};
		});
	},

	// get all courses
	async getAllCourses(db: DB) {
		return await db
			.select({
				id: courses.id,
				name: courses.name,
				slug: courses.slug,
				createdAt: courses.createdAt,
				totalSemesters: countDistinct(semesters.id),
				totalSubjects: countDistinct(subjects.id),
			})
			.from(courses)
			.leftJoin(semesters, eq(semesters.courseId, courses.id))
			.leftJoin(subjects, eq(subjects.semesterId, semesters.id))
			.groupBy(courses.id)
			.orderBy(desc(courses.createdAt));
	},

	// get course by id with all its relations
	async findCourseById(db: DB, courseId: string) {
		return await db.query.courses.findFirst({
			where: (course, { eq }) => eq(course.id, courseId),

			with: {
				semesters: {
					with: {
						subjects: {
							with: {
								chapters: true,
							},
						},
					},
				},
			},
		});
	},

	// get semesters by courses id with all its relations
	async findSemesterByCourseId(db: DB, courseId: string) {
		return await db.query.semesters.findMany({
			where: (semester, { eq }) => eq(semester.courseId, courseId),
		});
	},

	// get subjects by semester id with all its relations
	async findSubjectBySemesterId(db: DB, semesterId: string) {
		return await db.query.subjects.findMany({
			where: (subjects, { eq }) => eq(subjects.semesterId, semesterId),
		});
	},

	// get units by subject id with all its relations
	async findUnitsBySubjectId(db: DB, subjectId: string) {
		return await db.query.chapters.findMany({
			where: (chapters, { eq }) => eq(chapters.subjectId, subjectId),
		});
	},

	// delete course by id (with all its relations)
	async deleteCourse(db: DB, courseId: string) {
		return await db.transaction(async (tx) => {
			const existingCourse = await tx.query.courses.findFirst({
				where: (course, { eq }) => eq(course.id, courseId),
			});

			if (!existingCourse) {
				throw new Error("Course not found");
			}

			const [deletedCourse] = await tx
				.delete(courses)
				.where(eq(courses.id, courseId))
				.returning({ id: courses.id, name: courses.name });

			if (!deletedCourse) {
				throw new Error("Failed to delete course");
			}

			return {
				message: "Course deleted successfully",
				course: deletedCourse,
			};
		});
	},
};
