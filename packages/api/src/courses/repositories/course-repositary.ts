import { unit, courses, type DB, semesters, subjects } from "@repo/db";
import { and, countDistinct, desc, eq } from "drizzle-orm";

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
				number: string;
				subjects: {
					name: string;
					code?: string | null;
					units: {
						name: string;
					}[];
				}[];
			}[];
		},
	) {
		type CreatedUnit = {
			id: string;
			name: string;
		};

		type CreatedSubject = {
			id: string;
			name: string;
			code: string | null;
			units: CreatedUnit[];
		};

		type CreatedSemester = {
			id: string;
			number: string;
			subjects: CreatedSubject[];
		};

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

			const createdSemesters: CreatedSemester[] = [];

			for (const semesterData of data.semesters) {
				const [createdSemester] = await tx
					.insert(semesters)
					.values({
						courseId: createdCourse.id,
						number: semesterData.number,
					})
					.returning({
						id: semesters.id,
						number: semesters.number,
					});

				if (!createdSemester) {
					throw new Error("Failed to create semester");
				}

				// =================================================
				// CREATE SUBJECTS
				// =================================================

				const createdSubjects: CreatedSubject[] = [];

				for (const subjectData of semesterData.subjects) {
					const [createdSubject] = await tx
						.insert(subjects)
						.values({
							semesterId: createdSemester.id,
							name: subjectData.name,
							code: subjectData.code ?? null,
						})
						.returning({
							id: subjects.id,
							name: subjects.name,
							code: subjects.code,
						});

					if (!createdSubject) {
						throw new Error("Failed to create subject");
					}

					// =================================================
					// CREATE UNITS
					// =================================================

					const createdUnits: CreatedUnit[] =
						subjectData.units.length > 0
							? await tx
									.insert(unit)
									.values(
										subjectData.units.map((unitData) => ({
											subjectId: createdSubject.id,
											name: unitData.name,
										})),
									)
									.returning({
										id: unit.id,
										name: unit.name,
									})
							: [];

					createdSubjects.push({
						...createdSubject,
						code: createdSubject.code ?? null,
						units: createdUnits,
					});
				}

				createdSemesters.push({
					...createdSemester,
					subjects: createdSubjects,
				});
			}

			// =================================================
			// RETURN FINAL RESPONSE
			// =================================================

			return {
				message: "Course created successfully",

				course: {
					...createdCourse,
					semesters: createdSemesters,
				},
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
				id?: string;
				number: string;

				subjects: {
					id?: string;
					name: string;
					code?: string | null;

					units: {
						id?: string;
						name: string;
					}[];
				}[];
			}[];
		},
	) {
		return await db.transaction(async (tx) => {
			// =================================================
			// 1. CHECK COURSE EXISTS
			// =================================================

			const existingCourse = await tx.query.courses.findFirst({
				where: (course, { eq }) => eq(course.id, courseId),
			});

			if (!existingCourse) {
				throw new Error("Course not found");
			}

			// =================================================
			// 2. UPDATE COURSE
			// =================================================

			const [updatedCourse] = await tx
				.update(courses)
				.set({
					name: data.name,
					slug: data.slug,
					updatedAt: new Date(),
				})
				.where(eq(courses.id, courseId))
				.returning({
					id: courses.id,
					name: courses.name,
					slug: courses.slug,
				});

			if (!updatedCourse) {
				throw new Error("Failed to update course");
			}

			// =================================================
			// 3. PROCESS SEMESTERS
			// =================================================

			for (const semesterData of data.semesters) {
				let semesterId: string;

				// -------------------------------------------------
				// EXISTING SEMESTER → UPDATE
				// -------------------------------------------------

				if (semesterData.id) {
					const [updatedSemester] = await tx
						.update(semesters)
						.set({
							number: semesterData.number,
							updatedAt: new Date(),
						})
						.where(
							and(
								eq(semesters.id, semesterData.id),
								eq(semesters.courseId, courseId),
							),
						)
						.returning({
							id: semesters.id,
						});

					if (!updatedSemester) {
						throw new Error("Semester not found");
					}

					semesterId = updatedSemester.id;
				}

				// -------------------------------------------------
				// NEW SEMESTER → CREATE
				// -------------------------------------------------
				else {
					const [createdSemester] = await tx
						.insert(semesters)
						.values({
							courseId,
							number: semesterData.number,
						})
						.returning({
							id: semesters.id,
						});

					if (!createdSemester) {
						throw new Error("Failed to create semester");
					}

					semesterId = createdSemester.id;
				}

				// =================================================
				// 4. PROCESS SUBJECTS
				// =================================================

				for (const subjectData of semesterData.subjects) {
					let subjectId: string;

					// -------------------------------------------------
					// EXISTING SUBJECT → UPDATE
					// -------------------------------------------------

					if (subjectData.id) {
						const [updatedSubject] = await tx
							.update(subjects)
							.set({
								name: subjectData.name,
								code: subjectData.code ?? null,
								updatedAt: new Date(),
							})
							.where(
								and(
									eq(subjects.id, subjectData.id),
									eq(subjects.semesterId, semesterId),
								),
							)
							.returning({
								id: subjects.id,
							});

						if (!updatedSubject) {
							throw new Error("Subject not found");
						}

						subjectId = updatedSubject.id;
					}

					// -------------------------------------------------
					// NEW SUBJECT → CREATE
					// -------------------------------------------------
					else {
						const [createdSubject] = await tx
							.insert(subjects)
							.values({
								semesterId,
								name: subjectData.name,
								code: subjectData.code ?? null,
							})
							.returning({
								id: subjects.id,
							});

						if (!createdSubject) {
							throw new Error("Failed to create subject");
						}

						subjectId = createdSubject.id;
					}

					// =================================================
					// 5. PROCESS UNITS
					// =================================================

					const newUnits: {
						subjectId: string;
						name: string;
					}[] = [];

					for (const unitData of subjectData.units) {
						// -------------------------------------------------
						// EXISTING UNIT → UPDATE
						// -------------------------------------------------

						if (unitData.id) {
							const [updatedUnit] = await tx
								.update(unit)
								.set({
									name: unitData.name,
									updatedAt: new Date(),
								})
								.where(
									and(eq(unit.id, unitData.id), eq(unit.subjectId, subjectId)),
								)
								.returning({
									id: unit.id,
								});

							if (!updatedUnit) {
								throw new Error("Unit not found");
							}
						}

						// -------------------------------------------------
						// NEW UNIT → COLLECT
						// -------------------------------------------------
						else {
							newUnits.push({
								subjectId,
								name: unitData.name,
							});
						}
					}

					// =================================================
					// 6. BULK CREATE NEW UNITS
					// =================================================

					if (newUnits.length > 0) {
						await tx.insert(unit).values(newUnits);
					}
				}
			}

			// =================================================
			// 7. RETURN RESPONSE
			// =================================================

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
								units: true,
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

	async findSubjectsBySemester(db: DB, courseId: string, semesterId: string) {
		return await db
			.select({
				id: subjects.id,
				name: subjects.name,
				semester: semesters.number,
				course: courses.name,
			})
			.from(subjects)
			.innerJoin(semesters, eq(subjects.semesterId, semesters.id))
			.innerJoin(courses, eq(semesters.courseId, courses.id))
			.where(and(eq(semesters.id, semesterId), eq(courses.id, courseId)));
	},

	// get units by subject id with all its relations
	async findUnitsBySubjectId(db: DB, subjectId: string) {
		return await db.query.unit.findMany({
			where: (unit, { eq }) => eq(unit.subjectId, subjectId),
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

	async getRemainingSemesters(db: DB, semesterId: string) {
		return await db.query.semesters.findMany({
			where: (semester, { ne }) => ne(semester.id, semesterId),
		});
	},
};
