import type { DB } from "@repo/db";
import { TRPCError } from "@trpc/server";
import { authRepository } from "../repositories/auth-repositary";

/**
 * Auth Service
 * Business logic only - calls repository for DB operations
 */

export const authService = {
	/**
	 * Get user by ID
	 */
	async getUserById(userId: string, db: DB) {
		// Use repository to find user (DB operation)
		const user = await authRepository.findById(db, userId);

		if (!user) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "User not found",
			});
		}

		return user;
	},
};
