import { contacts, type DB, user } from "@repo/db";
import { eq } from "drizzle-orm";

export const contactRepository = {
	async create(
		db: DB,
		input: {
			userId: string;
			name: string;
			email: string;
			subject: string;
			message: string;
		},
	) {
		return await db.insert(contacts).values({
			userId: input.userId,
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

	async getById(db: DB, id: string) {
		const [result] = await db
			.select({
				id: contacts.id,
				userId: contacts.userId,
				userName: user.name,
				userEmail: user.email,
				name: contacts.name,
				email: contacts.email,
				subject: contacts.subject,
				message: contacts.message,
				createdAt: contacts.createdAt,
			})
			.from(contacts)
			.innerJoin(user, eq(contacts.userId, user.id))
			.where(eq(contacts.id, id));

		return result;
	},

	async deleteById(db: DB, id: string) {
		await db.delete(contacts).where(eq(contacts.id, id));
		return true;
	},
};
