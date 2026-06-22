import type { DB } from "@repo/db";
import type { ContactSchema } from "@repo/validators";
import { contactRepository } from "../repositories/contact-repository";

export const contactService = {
	async create(input: ContactSchema, db: DB) {
		const result = await contactRepository.create(db, input);
		return result;
	},
};
