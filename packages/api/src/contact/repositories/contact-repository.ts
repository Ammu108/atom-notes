import { contacts, type DB } from "@repo/db";
import { eq } from "drizzle-orm";

export const contactRepository = {
	async create(
		db: DB,
		input: { name: string; email: string; subject: string; message: string },
	) {
		return await db.insert(contacts).values({
			name: input.name,
			email: input.email,
			subject: input.subject,
			message: input.message,
		});
	},

	async getAll(db: DB) {
		const result = await db.select().from(contacts);
		return result;
	},

	async deleteById(db: DB, id: string) {
		await db.delete(contacts).where(eq(contacts.id, id));
		return true;
	},
};
