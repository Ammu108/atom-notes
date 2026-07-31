import { type DB, notes, notesPurchases, user } from "@repo/db";
import { eq } from "drizzle-orm";

/**
 * Auth Repository
 * ONLY database communication - no business logic
 */

export const authRepository = {
	async findUserById(db: DB, userId: string) {
		const result = await db
			.select()
			.from(user)
			.where(eq(user.id, userId))
			.limit(1);

		return result[0];
	},
	/**
	 * Find user by email
	 */
	async findByEmail(db: DB, email: string) {
		const result = await db
			.select()
			.from(user)
			.where(eq(user.email, email))
			.limit(1);

		return result[0] || null;
	},

	/**
	 * Find user by ID
	 */
	async findById(db: DB, id: string) {
		const result = await db.select().from(user).where(eq(user.id, id)).limit(1);

		return result[0] || null;
	},

	async findUserDetailsById(db: DB, id: string) {
		const result = await db
			.select({
				id: user.id,
				emailVerified: user.emailVerified,
				name: user.name,
				email: user.email,
				amount: notesPurchases.amount,
				status: notesPurchases.status,
				purchaseId: notesPurchases.id,
				purchasedAt: notesPurchases.createdAt,
				noteId: notes.id,
				noteTitle: notes.title,
				createdAt: user.createdAt,
			})
			.from(user)
			.leftJoin(notesPurchases, eq(user.id, notesPurchases.userId))
			.leftJoin(notes, eq(notesPurchases.noteId, notes.id))
			.where(eq(user.id, id));

		console.log("FIND USER DETAILS BY ID RESULT: ", id);

		return result;
	},

	async getAllUsers(db: DB) {
		const result = await db.select().from(user);
		return result;
	},

	async deleteById(db: DB, id: string) {
		await db.delete(user).where(eq(user.id, id));
		return true;
	},
};
