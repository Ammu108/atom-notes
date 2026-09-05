import {
	courses,
	type DB,
	notes,
	pyqs,
	semesters,
	subjects,
	unit,
} from "@repo/db";
import { and, countDistinct, desc, eq, sql } from "drizzle-orm";

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
				semesterNumber: number;
				subjects: {
					name: string;
					code?: string | null;
					units: {
						name: string;
						description: string;
					}[];
				}[];
			}[];
		},
	) {
		return await db.transaction(async (tx) => {
			// insert course
			const [createdCourse] = await tx
				.insert(courses)
				.values({
					name: data.name,
					slug: data.slug,
				})
				.returning({ id: courses.id });

			if (!createdCourse) {
				throw new Error("Failed to create course");
			}

			// insert semesters
			for (const sem of data.semesters) {
				const [newSemester] = await tx
					.insert(semesters)
					.values({
						courseId: createdCourse.id,
						semesterNumber: sem.semesterNumber,
					})
					.returning({ id: semesters.id });

				if (!newSemester) {
					throw new Error("Failed to create semester");
				}

				// 3. Insert Subjects
				for (const sub of sem.subjects) {
					const [newSubject] = await tx
						.insert(subjects)
						.values({
							semesterId: newSemester.id,
							name: sub.name,
							code: sub.code,
						})
						.returning({ id: subjects.id });

					if (!newSubject) {
						throw new Error("Failed to create subject");
					}

					// 4. Batch-insert Units for the subject
					if (sub.units.length > 0) {
						await tx.insert(unit).values(
							sub.units.map((unit) => ({
								subjectId: newSubject.id,
								name: unit.name,
								description: unit.description,
							})),
						);
					}
				}
			}

			return {
				success: true,
				courseId: createdCourse.id,
				message: "Course created successfully",
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

	async getAllSemestersAndResources(db: DB) {
		return await db
			.select({
				name: courses.name,
				totalSemesters: countDistinct(semesters.id),
				totalResources: sql<number>`
                count(distinct ${notes.id}) + count(distinct ${pyqs.id})
            `,
			})
			.from(courses)
			.leftJoin(semesters, eq(semesters.courseId, courses.id))
			.leftJoin(subjects, eq(subjects.semesterId, semesters.id))
			.leftJoin(unit, eq(unit.subjectId, subjects.id))
			.leftJoin(notes, eq(notes.unitId, unit.id))
			.leftJoin(pyqs, eq(pyqs.subjectId, subjects.id))
			.where(eq(courses.slug, "bca"))
			.groupBy(courses.id);
	},

	async getAllSemestersByCourse(db: DB) {
		return await db
			.select({
				id: semesters.id,
				name: courses.name,
				semesterNumber: semesters.semesterNumber,
				totalSubjects: countDistinct(subjects.id),
				totalResources: sql<number>`
				count(distinct ${notes.id}) + count(distinct ${pyqs.id})
			`,
			})
			.from(courses)
			.leftJoin(semesters, eq(semesters.courseId, courses.id))
			.leftJoin(subjects, eq(subjects.semesterId, semesters.id))
			.leftJoin(unit, eq(unit.subjectId, subjects.id))
			.leftJoin(notes, eq(notes.unitId, unit.id))
			.leftJoin(pyqs, eq(pyqs.subjectId, subjects.id))
			.where(eq(courses.slug, "bca"))
			.groupBy(courses.id, semesters.id, semesters.semesterNumber)
			.orderBy(semesters.semesterNumber);
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
				semester: semesters.semesterNumber,
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
