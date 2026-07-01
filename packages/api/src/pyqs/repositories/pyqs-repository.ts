import { type DB, pyqQuestions, pyqs, semesters, subjects } from "@repo/db";
import type { PyqsFormValues } from "@repo/validators";
import { TRPCError } from "@trpc/server";
import { desc, eq } from "drizzle-orm";

export const pyqRepository = {
	async create(db: DB, data: PyqsFormValues) {
		return await db.transaction(async (tx) => {
			const [pyq] = await tx
				.insert(pyqs)
				.values({
					title: data.title,
					year: data.year,
					subjectId: data.subjectId,
					pdfUrl: data.pdfUrl,
					pdfKey: data.pdfKey,
					isPaid: data.isPaid,
					price: data.price,
				})
				.returning();

			if (!pyq) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Failed to create pyq",
				});
			}

			await tx.insert(pyqQuestions).values(
				data.questions.map((q, index) => ({
					pyqId: pyq.id,
					question: q.question,
					displayOrder: index,
				})),
			);

			if (!pyq) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Failed to create pyq",
				});
			}

			return pyq;
		});
	},

	async update(db: DB, id: string, data: PyqsFormValues) {
		return await db.transaction(async (tx) => {
			const [updatedPyq] = await tx
				.update(pyqs)
				.set({
					title: data.title,
					year: data.year,
					subjectId: data.subjectId,
					pdfUrl: data.pdfUrl,
					pdfKey: data.pdfKey,
					isPaid: data.isPaid,
					price: data.price,
				})
				.where(eq(pyqs.id, id))
				.returning();

			if (!updatedPyq) {
				throw new Error("PYQ not found");
			}

			await tx.delete(pyqQuestions).where(eq(pyqQuestions.pyqId, id));
			data.questions.length > 0;
			await tx.insert(pyqQuestions).values(
				data.questions.map((q) => ({
					pyqId: id,
					question: q.question,
				})),
			);

			return updatedPyq;
		});
	},

	async getAllPyqs(db: DB) {
		const pyqsResult = await db
			.select({
				id: pyqs.id,
				title: pyqs.title,
				year: pyqs.year,
				subjectName: subjects.name,
				semester: semesters.number,
				price: pyqs.price,
				updatedAt: pyqs.updatedAt,
			})
			.from(pyqs)
			.innerJoin(subjects, eq(pyqs.subjectId, subjects.id))
			.innerJoin(semesters, eq(subjects.semesterId, semesters.id))
			.orderBy(desc(pyqs.updatedAt));

		if (pyqsResult.length === 0) {
			throw new Error("No PYQs found");
		}

		const result = await Promise.all(
			pyqsResult.map(async (pyq) => {
				const questions = await db
					.select({
						question: pyqQuestions.question,
					})
					.from(pyqQuestions)
					.where(eq(pyqQuestions.pyqId, pyq.id));

				return {
					...pyq,
					questions,
				};
			}),
		);

		return result;
	},

	async getPyqsById(db: DB, id: string) {
		const [pyq] = await db
			.select({
				id: pyqs.id,
				title: pyqs.title,
				year: pyqs.year,
				subjectId: pyqs.subjectId,
				subjectName: subjects.name,
				pdfUrl: pyqs.pdfUrl,
				pdfKey: pyqs.pdfKey,
				isPaid: pyqs.isPaid,
				price: pyqs.price,
			})
			.from(pyqs)
			.innerJoin(subjects, eq(pyqs.subjectId, subjects.id))
			.innerJoin(pyqQuestions, eq(pyqs.id, pyqQuestions.pyqId))
			.where(eq(pyqs.id, id))
			.limit(1);

		if (!pyq) {
			throw new Error("PYQ not found");
		}

		const questions = await db
			.select({
				question: pyqQuestions.question,
			})
			.from(pyqQuestions)
			.where(eq(pyqQuestions.pyqId, id));

		return { ...pyq, questions };
	},

	async deletePyq(db: DB, id: string) {
		return await db.transaction(async (tx) => {
			const pyqExist = await tx.query.pyqs.findFirst({
				where: eq(pyqs.id, id),
			});

			if (!pyqExist) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Pyq not found",
				});
			}

			const [deletePyqs] = await tx
				.delete(pyqs)
				.where(eq(pyqs.id, id))
				.returning({ id: pyqs.id });

			if (!deletePyqs) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Failed to delete pyq",
				});
			}

			return {
				message: "Pyq deleted successfully!",
				pyq: deletePyqs,
			};
		});
	},
};
