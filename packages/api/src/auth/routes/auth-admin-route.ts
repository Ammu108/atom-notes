import { parse, serialize } from "cookie";
import { z } from "zod";
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "../../trpc";
import {
	authAdminRepository,
	SESSION_CONFIG,
} from "../repositories/auth-admin-repositary";
import { authAdminService } from "../services/auth-admin-service";
import {
	generateRefreshToken,
	hashRefreshToken,
	signAccessToken,
} from "../utils/token";

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
				{
					id: admin.id,
					name: admin.name,
					email: admin.email,
					role: admin.role,
					type: "admin",
				},
				ctx.jwtSecret,
			);

			const refreshToken = generateRefreshToken();

			// persist session
			await authAdminService.createSession(ctx.db, admin.id, refreshToken);

			// Set secure HTTP-only cookie
			ctx.resHeaders.append(
				"set-cookie",
				serialize("admin_access_token", accessToken, {
					httpOnly: true,
					secure: process.env.NODE_ENV === "production",
					sameSite: "lax",
					path: "/",
					maxAge: 15 * 60, // 15 minutes
				}),
			);

			ctx.resHeaders.append(
				"set-cookie",
				serialize("admin_refresh_token", refreshToken, {
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
		const cookieHeader = ctx.headers.get("cookie");

		if (cookieHeader) {
			const cookies = parse(cookieHeader);

			const refreshToken = cookies.admin_refresh_token;

			if (refreshToken) {
				const hashedToken = hashRefreshToken(refreshToken);

				await authAdminRepository.deleteSessionByRefreshToken(
					ctx.db,
					hashedToken,
				);
			}
		}

		ctx.resHeaders.append(
			"set-cookie",
			serialize("admin_access_token", "", {
				httpOnly: true,
				expires: new Date(0),
				path: "/",
			}),
		);

		ctx.resHeaders.append(
			"set-cookie",
			serialize("admin_refresh_token", "", {
				httpOnly: true,
				expires: new Date(0),
				path: "/",
			}),
		);

		return { message: "Logout successful" };
	}),

	me: protectedProcedure.query(async ({ ctx }) => {
		if (!ctx.user) {
			return null;
		}

		return ctx.user;
	}),
});
