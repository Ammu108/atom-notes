import { type DB, sessions, users } from "@repo/db";
import { eq } from "drizzle-orm";

export const SESSION_CONFIG = {
	ACCESS_TOKEN_MINUTES: 15,
	REFRESH_TOKEN_DAYS: 30,
};

export const authAdminRepository = {
	async createSession(db: DB, userId: string, hashedToken: string) {
		await db.insert(sessions).values({
			userId,
			refreshToken: hashedToken,
			expiresAt: new Date(
				Date.now() + SESSION_CONFIG.REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000,
			), // 30 days from now
		});
	},

	async findSessionByRefreshToken(db: DB, hashedToken: string) {
		const result = await db
			.select()
			.from(sessions)
			.where(eq(sessions.refreshToken, hashedToken))
			.limit(1);

		return result[0];
	},

	async deleteSessionByRefreshToken(db: DB, hashedToken: string) {
		await db.delete(sessions).where(eq(sessions.refreshToken, hashedToken));
	},

	async findUserById(db: DB, userId: string) {
		const result = await db
			.select()
			.from(users)
			.where(eq(users.id, userId))
			.limit(1);

		return result[0];
	},

	async findByEmail(db: DB, email: string) {
		const result = await db
			.select()
			.from(users)
			.where(eq(users.email, email))
			.limit(1);

		return result[0];
	},

	async getRoleById(db: DB, userId: string) {
		const result = await db
			.select()
			.from(users)
			.where(eq(users.id, userId))
			.limit(1);

		const role = result[0]?.role;

		return role;
	},
};
