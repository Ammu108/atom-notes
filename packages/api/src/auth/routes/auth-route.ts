// import { authService, createToken } from "@repo/auth";
import { TRPCError } from "@trpc/server";
import { serialize } from "cookie";
import z from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { authRepository } from "../repositories/auth-repositary";
import { authService } from "../services/auth-service";
import { createToken } from "../utils/auth.util";
import { deleteUserSchema, signupSchema } from "../validators/auth-validator";

/**
 * Auth Router
 * API endpoints only - uses service for business logic
 */

export const authRouter = createTRPCRouter({
	signUp: publicProcedure
		.input(signupSchema)
		.mutation(async ({ input, ctx }) => {
			// Check if user already exists using repository
			const userExists = await authRepository.findByEmail(ctx.db, input.email);

			if (userExists) {
				throw new TRPCError({
					code: "CONFLICT",
					message:
						"A user with this email already exists. Please use a different email.",
				});
			}

			// Sign up using service (handles business logic)
			const user = await authService.signUp(input, ctx.db);

			// Create JWT token
			const token = createToken(user.id, ctx.jwtSecret, user.role);

			// Set secure HTTP-only cookie
			const cookie = serialize("token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "lax",
				path: "/",
				maxAge: 60 * 60 * 24 * 7,
			});

			ctx.resHeaders.append("set-cookie", cookie);

			if (process.env.NODE_ENV === "development") {
				console.log("[auth][signup] appended Set-Cookie header");
			}

			return { user };
		}),

	login: publicProcedure
		.input(z.object({ email: z.string(), password: z.string() }))
		.mutation(async ({ input, ctx }) => {
			// Login using service (handles business logic & password verification)
			const user = await authService.login(input.email, input.password, ctx.db);

			// Create JWT token
			const token = createToken(user.id, ctx.jwtSecret, user.role);

			// Set secure HTTP-only cookie
			const cookie = serialize("token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "lax",
				path: "/",
				maxAge: 60 * 60 * 24 * 7,
			});

			ctx.resHeaders.append("set-cookie", cookie);

			if (process.env.NODE_ENV === "development") {
				console.log("[auth][login] appended Set-Cookie header");
			}

			return { user };
		}),

	logout: publicProcedure.mutation(async ({ ctx }) => {
		const cookie = serialize("token", "", {
			httpOnly: true,
			expires: new Date(0),
			path: "/",
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
		});

		ctx.resHeaders.append("set-cookie", cookie);

		if (process.env.NODE_ENV === "development") {
			console.log("[auth][logout] appended Set-Cookie header");
		}

		return { success: true };
	}),

	me: publicProcedure.query(async ({ ctx }) => {
		const authUser = ctx.user;

		if (!authUser) {
			return null;
		}

		// Use repository to get current user
		const user = await authRepository.findById(ctx.db, authUser.userId);

		return user;
	}),

	getAllUsers: publicProcedure.query(async ({ ctx }) => {
		if (!ctx.user || ctx.user.role !== "admin") {
			throw new TRPCError({
				code: "FORBIDDEN",
				message: "Only admins can view users",
			});
		}

		const users = await authRepository.getAllUsers(ctx.db);
		return users;
	}),

	deleteUser: publicProcedure
		.input(deleteUserSchema)
		.mutation(async ({ input, ctx }) => {
			if (!ctx.user || ctx.user.role !== "admin") {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "Only admins can delete users",
				});
			}

			// Check if user exists using repository
			const userExist = await authRepository.findById(ctx.db, input.id);

			if (!userExist) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "User not found",
				});
			}

			// Delete user using repository
			return await authRepository.deleteById(ctx.db, input.id);
		}),
});
