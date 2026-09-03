import type { DB } from "@repo/db";
import type { PyqsFormValues, UpdatePyqValues } from "@repo/validators";
import { pyqRepository } from "../repositories/pyqs-repository";

export const pyqService = {
	async createPyq(input: PyqsFormValues, db: DB) {
		return await pyqRepository.create(db, {
			title: input.title,
			year: input.year,
			subjectId: input.subjectId,
			questionPdfUrl: input.questionPdfUrl,
			questionPdfKey: input.questionPdfKey,
			solutionPdfUrl: input.solutionPdfUrl,
			solutionPdfKey: input.solutionPdfKey,
			isPaid: input.isPaid,
			price: input.price,
		});
	},

	async updatePyq(input: UpdatePyqValues, db: DB) {
		return await pyqRepository.update(db, input.id, {
			title: input.title,
			year: input.year,
			subjectId: input.subjectId,
			questionPdfUrl: input.questionPdfUrl,
			questionPdfKey: input.questionPdfKey,
			solutionPdfUrl: input.solutionPdfUrl,
			solutionPdfKey: input.solutionPdfKey,
			isPaid: input.isPaid,
			price: input.price,
		});
	},
};
