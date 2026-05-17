import { chapters, courses, type DB, semesters, subjects } from "@repo/db";
import { eq } from "drizzle-orm";
import { normalizeString } from "packages/shared/helpers/normalize-string";

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
	async createCourse(
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
					const normalizedSubjectName = normalizeString(subjectData.name);

					const [createdSubject] = await tx
						.insert(subjects)
						.values({
							name: normalizedSubjectName,

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
						const normalizedUnitName = normalizeString(unitData.name);

						const [createdUnit] = await tx
							.insert(chapters)
							.values({
								name: normalizedUnitName,

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
};
