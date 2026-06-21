import { serialize } from "cookie";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { SESSION_CONFIG } from "../repositories/auth-admin-repositary";
import { authAdminService } from "../services/auth-admin-service";
import { generateRefreshToken, signAccessToken } from "../utils/token";

export const authAdminRouter = createTRPCRouter({
	login: publicProcedure
		.input(z.object({ email: z.string().email(), password: z.string().min(8) }))
		.mutation(async ({ input, ctx }) => {
			const admin = await authAdminService.login(
				input.email,
				input.password,
				ctx.db,
			);

			// Create tokens
			const accessToken = await signAccessToken(
				admin.id,
				admin.name,
				admin.email,
				admin.role,
			);
			const refreshToken = generateRefreshToken();

			// persist session
			await authAdminService.createSession(ctx.db, admin.id, refreshToken);

			// Set secure HTTP-only cookie
			ctx.resHeaders.append(
				"set-cookie",
				serialize("access_token", accessToken, {
					httpOnly: true,
					secure: process.env.NODE_ENV === "production",
					sameSite: "lax",
					path: "/",
					maxAge: SESSION_CONFIG.ACCESS_TOKEN_MINUTES * 60, // 15 minutes
				}),
			);

			ctx.resHeaders.append(
				"set-cookie",
				serialize("refresh_token", refreshToken, {
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

			return { message: "Login successful", admin };
		}),

	logout: publicProcedure.mutation(async ({ ctx }) => {
		ctx.resHeaders.append(
			"set-cookie",
			serialize("access_token", "", {
				httpOnly: true,
				expires: new Date(0),
				path: "/",
			}),
		);

		ctx.resHeaders.append(
			"set-cookie",
			serialize("refresh_token", "", {
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

	me: publicProcedure.query(async ({ ctx }) => {
		if (!ctx.user) {
			return null;
		}

		return {
			name: ctx.user.name,
			email: ctx.user.email,
			role: ctx.user.role,
		};
	}),
});
