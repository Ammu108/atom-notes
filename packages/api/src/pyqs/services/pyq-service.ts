import type { DB } from "@repo/db";
import type { PyqsFormValues, UpdatePyqValues } from "@repo/validators";
import { pyqRepository } from "../repositories/pyqs-repository";

export const pyqService = {
	async createPyq(input: PyqsFormValues, db: DB) {
		return await pyqRepository.create(db, {
			title: input.title,
			year: input.year,
			subjectId: input.subjectId,
			pdfUrl: input.pdfUrl,
			pdfKey: input.pdfKey,
			isPaid: input.isPaid,
			price: input.price,
			questions: input.questions,
		});
	},

	async updatePyq(input: UpdatePyqValues, db: DB) {
		return await pyqRepository.update(db, input.id, {
			title: input.title,
			year: input.year,
			subjectId: input.subjectId,
			pdfUrl: input.pdfUrl,
			pdfKey: input.pdfKey,
			isPaid: input.isPaid,
			price: input.price,
			questions: input.questions,
		});
	},
};
