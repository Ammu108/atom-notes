import { type DB, users } from "@repo/db";
import { eq } from "drizzle-orm";

/**
 * Auth Repository
 * ONLY database communication - no business logic
 */

export const authRepository = {
	/**
	 * Find user by email
	 */
	async findByEmail(db: DB, email: string) {
		const result = await db
			.select()
			.from(users)
			.where(eq(users.email, email))
			.limit(1);

		return result[0] || null;
	},

	/**
	 * Find user by ID
	 */
	async findById(db: DB, id: string) {
		const result = await db
			.select()
			.from(users)
			.where(eq(users.id, id))
			.limit(1);

		return result[0] || null;
	},

	/**
	 * Create a new user
	 */
	async create(
		db: DB,
		data: {
			name: string;
			email: string;
			password: string;
			role?: string;
		},
	) {
		const result = await db
			.insert(users)
			.values({
				name: data.name,
				email: data.email,
				password: data.password,
				role: data.role || "user",
			})
			.returning();

		return result[0] || null;
	},

	async getAllUsers(db: DB) {
		const result = await db.select().from(users);
		return result;
	},

	async deleteById(db: DB, id: string) {
		await db.delete(users).where(eq(users.id, id));
		return true;
	},
};
