import { TRPCError } from "@trpc/server";
import { serialize } from "cookie";
import z from "zod";
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "../../trpc";
import {
	authRepository,
	SESSION_CONFIG,
} from "../repositories/auth-repositary";
import { authService } from "../services/auth-service";
import { generateRefreshToken, signAccessToken } from "../utils/token";
import { deleteUserSchema, signupSchema } from "../validators/auth-validator";

// async function createSession(userId: string, refreshToken: string) {
// 	await authService.createSession(ctx.db, userId, refreshToken);
// }
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

			// Create tokens
			const accessToken = await signAccessToken(
				{
					id: user.id,
					name: user.name,
					email: user.email,
					role: user.role,
					type: "user",
				},
				ctx.jwtSecret,
			);

			const refreshToken = generateRefreshToken();

			// Persist session
			await authService.createSession(ctx.db, user.id, refreshToken);

			ctx.resHeaders.append(
				"set-cookie",
				serialize("user_access_token", accessToken, {
					httpOnly: true,
					secure: process.env.NODE_ENV === "production",
					sameSite: "lax",
					path: "/",
					maxAge: SESSION_CONFIG.ACCESS_TOKEN_MINUTES * 60,
				}),
			);

			ctx.resHeaders.append(
				"set-cookie",
				serialize("user_refresh_token", refreshToken, {
					httpOnly: true,
					secure: process.env.NODE_ENV === "production",
					sameSite: "lax",
					path: "/",
					maxAge: SESSION_CONFIG.REFRESH_TOKEN_DAYS * 24 * 60 * 60,
				}),
			);

			if (process.env.NODE_ENV === "development") {
				console.log("[auth][signup] appended Set-Cookie header");
			}

			return { message: "Signup successful", user };
		}),

	login: publicProcedure
		.input(z.object({ email: z.string(), password: z.string() }))
		.mutation(async ({ input, ctx }) => {
			// Login using service (handles business logic & password verification)
			const user = await authService.login(input.email, input.password, ctx.db);

			// Create tokens
			const accessToken = await signAccessToken(
				{
					id: user.id,
					name: user.name,
					email: user.email,
					role: user.role,
					type: "user",
				},
				ctx.jwtSecret,
			);

			const refreshToken = generateRefreshToken();

			// Persist session
			await authService.createSession(ctx.db, user.id, refreshToken);

			// Set secure HTTP-only cookie
			ctx.resHeaders.append(
				"set-cookie",
				serialize("user_access_token", accessToken, {
					httpOnly: true,
					secure: process.env.NODE_ENV === "production",
					sameSite: "lax",
					path: "/",
					// maxAge: SESSION_CONFIG.ACCESS_TOKEN_MINUTES * 60, // 15 minutes
					maxAge: 5 * 60, // 15 minutes --- TEMPORARY FOR TESTING ---
				}),
			);

			ctx.resHeaders.append(
				"set-cookie",
				serialize("user_refresh_token", refreshToken, {
					httpOnly: true,
					secure: process.env.NODE_ENV === "production",
					sameSite: "lax",
					path: "/",
					maxAge: SESSION_CONFIG.REFRESH_TOKEN_DAYS * 24 * 60 * 60,
				}),
			);

			if (process.env.NODE_ENV === "development") {
				console.log("[auth][login] appended Set-Cookie header");
			}

			return { message: "Login successful", user };
		}),

	logout: publicProcedure.mutation(async ({ ctx }) => {
		ctx.resHeaders.append(
			"set-cookie",
			serialize("user_access_token", "", {
				httpOnly: true,
				expires: new Date(0),
				path: "/",
			}),
		);

		ctx.resHeaders.append(
			"set-cookie",
			serialize("user_refresh_token", "", {
				httpOnly: true,
				expires: new Date(0),
				path: "/",
			}),
		);

		if (process.env.NODE_ENV === "development") {
			console.log("[auth][logout] appended Set-Cookie header");
		}

		return { message: "Logout successful" };
	}),

	getAllUsers: protectedProcedure.query(async ({ ctx }) => {
		if (!ctx.user || ctx.user.role !== "admin") {
			throw new TRPCError({
				code: "FORBIDDEN",
				message: "Only admins can view users",
			});
		}

		const users = await authRepository.getAllUsers(ctx.db);
		return users;
	}),

	deleteUser: protectedProcedure
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
