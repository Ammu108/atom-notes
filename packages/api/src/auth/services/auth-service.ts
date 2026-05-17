import type { DB } from "@repo/db";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import type z from "zod";
import { authRepository } from "../repositories/auth-repositary";
import type { signupSchema } from "../validators/auth-validator";

/**
 * Auth Service
 * Business logic only - calls repository for DB operations
 */

export const authService = {
	/**
	 * Sign up a new user
	 */
	async signUp(input: z.infer<typeof signupSchema>, db: DB) {
		// Validate password
		if (input.password.length < 6) {
			throw new TRPCError({
				code: "BAD_REQUEST",
				message: "Password must be at least 6 characters long.",
			});
		}

		// Hash password (business logic)
		const hashedPassword = await bcrypt.hash(input.password, 10);

		// Use repository to create user (DB operation)
		const user = await authRepository.create(db, {
			name: input.name,
			email: input.email,
			password: hashedPassword,
			role: input.role || "user",
		});

		if (!user) {
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Failed to create user",
			});
		}

		return user;
	},

	/**
	 * Login a user
	 */
	async login(email: string, password: string, db: DB) {
		// Use repository to find user (DB operation)
		const user = await authRepository.findByEmail(db, email);

		if (!user) {
			throw new TRPCError({
				code: "UNAUTHORIZED",
				message: "Invalid email or password. Please try again.",
			});
		}

		// Verify password (business logic)
		const isPasswordValid = await bcrypt.compare(password, user.password || "");

		if (!isPasswordValid) {
			throw new TRPCError({
				code: "UNAUTHORIZED",
				message: "Invalid email or password. Please try again.",
			});
		}

		return user;
	},

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
