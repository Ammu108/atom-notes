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

	async getUserDetails(db: DB, id: string) {
		const rows = await authRepository.findUserDetailsById(db, id);

		if (rows.length === 0) {
			return null;
		}

		const purchases = rows.flatMap((purchase) =>
			purchase.noteId != null
				? [
						{
							purchaseId: purchase.purchaseId,
							noteId: purchase.noteId,
							noteTitle: purchase.noteTitle ?? null,
							amount: purchase.amount,
							status: purchase.status,
							purchasedAt: purchase.purchasedAt,
						},
					]
				: [],
		);

		const paidPurchases = purchases.filter(
			(purchase) => purchase.status === "PAID",
		);

		const pendingPurchases = purchases.filter(
			(purchase) => purchase.status === "PENDING",
		);

		const totalSpent = paidPurchases.reduce(
			(total, purchase) => total + Number(purchase.amount ?? 0),
			0,
		);

		const first = rows[0];
		if (!first) {
			return null;
		}

		return {
			id: first.id,
			name: first.name,
			email: first.email,
			emailVerified: first.emailVerified,
			stats: {
				totalPurchases: paidPurchases.length,
				totalSpent,
				pendingPurchases: pendingPurchases.length,
			},

			purchases,
			createdAt: first.createdAt,
		};
	},
};
