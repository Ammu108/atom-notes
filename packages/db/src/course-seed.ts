// seed-course.ts

import "dotenv/config";

import { db } from "./index";
import { chapters, courses, semesters, subjects } from "./schemas";

async function seedCourse() {
	try {
		const payload = {
			name: "B.Tech Computer Science",
			slug: "b-tech-computer-science",

			semesters: [
				{
					number: 1,

					subjects: [
						{
							name: "Mathematics",

							units: [
								{
									name: "Linear Algebra",
								},
								{
									name: "Calculus",
								},
								{
									name: "Differential Equations",
								},
							],
						},

						{
							name: "Programming Fundamentals",

							units: [
								{
									name: "Variables",
								},
								{
									name: "Functions",
								},
								{
									name: "Arrays",
								},
							],
						},
					],
				},

				{
					number: 2,

					subjects: [
						{
							name: "Data Structures",

							units: [
								{
									name: "Linked List",
								},
								{
									name: "Stacks",
								},
								{
									name: "Queues",
								},
							],
						},

						{
							name: "Database Management System",

							units: [
								{
									name: "SQL Basics",
								},
								{
									name: "Normalization",
								},
								{
									name: "Transactions",
								},
							],
						},
					],
				},
			],
		};
		const result = await db.transaction(async (tx) => {
			const [createdCourse] = await tx
				.insert(courses)
				.values({ name: payload.name, slug: payload.slug })
				.returning();

			if (!createdCourse) {
				throw new Error("Failed to create course.");
			}

			// Create semesters with subjects and units
			for (const sem of payload.semesters) {
				const [createdSemester] = await tx
					.insert(semesters)
					.values({ number: sem.number, courseId: createdCourse.id })
					.returning();

				if (!createdSemester) {
					throw new Error("Failed to create semester.");
				}

				for (const subj of sem.subjects) {
					const [createdSubject] = await tx
						.insert(subjects)
						.values({ name: subj.name, semesterId: createdSemester.id })
						.returning();

					if (!createdSubject) {
						throw new Error("Failed to create subject.");
					}

					for (const unit of subj.units) {
						await tx
							.insert(chapters)
							.values({ name: unit.name, subjectId: createdSubject.id });
					}
				}
			}

			return createdCourse;
		});

		console.log("✅ Course seeded successfully");

		console.dir(result, {
			depth: null,
		});
	} catch (error) {
		console.error("❌ Seed failed", error);

		process.exit(1);
	}
}

seedCourse();
