import { type DB, user } from "@repo/db";
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

	async getAllUsers(db: DB) {
		const result = await db.select().from(user);
		return result;
	},

	async deleteById(db: DB, id: string) {
		await db.delete(user).where(eq(user.id, id));
		return true;
	},
};
