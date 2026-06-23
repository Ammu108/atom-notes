import type { DB } from "@repo/db";
import { TRPCError } from "@trpc/server";
import { authAdminRepository } from "../repositories/auth-admin-repositary";
import { verifyPassword } from "../utils/password";
import { generateRefreshToken, hashRefreshToken } from "../utils/token";

export const authAdminService = {
	async createSession(db: DB, userId: string, refreshToken: string) {
		const hashedToken = hashRefreshToken(refreshToken);
		await authAdminRepository.createSession(db, userId, hashedToken);
	},

	async rotateSession(db: DB, refreshToken: string) {
		const hashedToken = hashRefreshToken(refreshToken);
		const session = await authAdminRepository.findSessionByRefreshToken(
			db,
			hashedToken,
		);

		if (!session) {
			throw new TRPCError({
				code: "UNAUTHORIZED",
			});
		}

		if (session.expiresAt.getTime() < Date.now()) {
			await authAdminRepository.deleteSessionByRefreshToken(db, hashedToken);

			throw new TRPCError({
				code: "UNAUTHORIZED",
			});
		}

		const admin = await authAdminRepository.findUserById(db, session.userId);

		// Add a check to ensure the admin actually exists
		if (!admin) {
			throw new TRPCError({
				code: "UNAUTHORIZED",
				message: "User associated with this session no longer exists.",
			});
		}

		// DELETE OLD SESSION
		await authAdminRepository.deleteSessionByRefreshToken(db, hashedToken);

		// CREATE NEW REFRESH TOKEN
		const newRefreshToken = generateRefreshToken();

		await this.createSession(db, admin.id, newRefreshToken);

		return {
			admin,
			refreshToken: newRefreshToken,
		};
	},

	async login(email: string, password: string, db: DB) {
		const admin = await authAdminRepository.findByEmail(db, email);

		if (!admin) {
			throw new TRPCError({
				code: "UNAUTHORIZED",
				message: "Invalid email or password. Please try again.",
			});
		}

		const isPasswordValid = await verifyPassword(password, admin.password);

		if (!isPasswordValid) {
			throw new TRPCError({
				code: "UNAUTHORIZED",
				message: "Invalid email or password. Please try again.",
			});
		}

		const role = await authAdminRepository.getRoleById(db, admin.id);

		if (role !== "admin") {
			throw new TRPCError({
				code: "FORBIDDEN",
				message: "You do not have permission to access this resource.",
			});
		}

		return admin;
	},
};
