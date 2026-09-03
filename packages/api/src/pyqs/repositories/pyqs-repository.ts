import {
	courses,
	type DB,
	pyqPurchases,
	pyqs,
	semesters,
	subjects,
} from "@repo/db";
import type { PyqsFormValues } from "@repo/validators";
import { TRPCError } from "@trpc/server";
import { and, desc, eq, sql } from "drizzle-orm";
import { pyqPaymentRepository } from "../../pyq-payment/repositories/pyq-payment-repository";

export const pyqRepository = {
	async create(db: DB, data: PyqsFormValues) {
		return await db.transaction(async (tx) => {
			const [pyq] = await tx
				.insert(pyqs)
				.values({
					title: data.title,
					year: data.year,
					subjectId: data.subjectId,
					questionPdfUrl: data.questionPdfUrl,
					questionPdfKey: data.questionPdfKey,
					solutionPdfUrl: data.solutionPdfUrl,
					solutionPdfKey: data.solutionPdfKey,
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
					questionPdfUrl: data.questionPdfUrl,
					questionPdfKey: data.questionPdfKey,
					solutionPdfUrl: data.solutionPdfUrl,
					solutionPdfKey: data.solutionPdfKey,
					isPaid: data.isPaid,
					price: data.price,
				})
				.where(eq(pyqs.id, id))
				.returning();

			if (!updatedPyq) {
				throw new Error("PYQ not found");
			}

			return updatedPyq;
		});
	},

	async getAllPyqs(db: DB) {
		const result = await db
			.select({
				id: pyqs.id,
				title: pyqs.title,
				year: pyqs.year,
				subjectName: subjects.name,
				semester: semesters.semesterNumber,
				price: pyqs.price,
				updatedAt: pyqs.updatedAt,
			})
			.from(pyqs)
			.innerJoin(subjects, eq(pyqs.subjectId, subjects.id))
			.innerJoin(semesters, eq(subjects.semesterId, semesters.id))
			.groupBy(
				pyqs.id,
				pyqs.title,
				pyqs.year,
				subjects.name,
				semesters.semesterNumber,
				pyqs.updatedAt,
			)
			.orderBy(desc(pyqs.updatedAt));

		return result;
	},

	async getPyqsById(db: DB, userId: string | undefined, id: string) {
		const [pyq] = await db
			.select({
				id: pyqs.id,
				title: pyqs.title,
				year: pyqs.year,
				subjectId: pyqs.subjectId,
				subjectName: subjects.name,
				solutionPdfUrl: pyqs.solutionPdfUrl,
				solutionPdfKey: pyqs.solutionPdfKey,
				isPaid: pyqs.isPaid,
				price: pyqs.price,
				questionPdfUrl: pyqs.questionPdfUrl,
				questionPdfKey: pyqs.questionPdfKey,
				course: courses.name,
				semester: semesters.semesterNumber,
				createdAt: pyqs.createdAt,
				updatedAt: pyqs.updatedAt,
			})
			.from(pyqs)
			.innerJoin(subjects, eq(pyqs.subjectId, subjects.id))
			.innerJoin(semesters, eq(subjects.semesterId, semesters.id))
			.innerJoin(courses, eq(semesters.courseId, courses.id))
			.where(eq(pyqs.id, id))
			.limit(1);

		const hasPurchased =
			pyq?.isPaid && userId
				? await pyqPaymentRepository.hasPurchased(userId, pyq.id, db)
				: false;

		if (!pyq) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "Pyq not found!",
			});
		}

		// const questions = await db
		// 	.select({
		// 		id: pyqQuestions.id,
		// 		question: pyqQuestions.question,
		// 	})
		// 	.from(pyqQuestions)
		// 	.where(eq(pyqQuestions.pyqId, id));

		return { ...pyq, hasPurchased };
	},

	async getStats(db: DB, noteId: string) {
		const [stats] = await db
			.select({
				revenue: sql<number>`COALESCE(SUM(${pyqPurchases.amount}),0)`,
				totalPurchases: sql<number>`COUNT(*)`,
			})
			.from(pyqPurchases)
			.where(
				and(eq(pyqPurchases.pyqId, noteId), eq(pyqPurchases.status, "PAID")),
			);

		return stats;
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
