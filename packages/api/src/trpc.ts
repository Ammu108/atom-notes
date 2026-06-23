/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */

import { db } from "@repo/db";
import { initTRPC, TRPCError } from "@trpc/server";
import { parse } from "cookie";
import superjson from "superjson";
import { ZodError } from "zod";
import { refreshAdminToken } from "./auth/utils/refresh-admin-access-token";
import { refreshUserToken } from "./auth/utils/refresh-user-access-token";
import { verifyAccessToken } from "./auth/utils/token";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opts: {
	headers: Headers;
	resHeaders: Headers;
	jwtSecret: string;
	app: "admin" | "web";
}) => {
	const cookieHeader = opts.headers.get("cookie");

	let user = null;

	if (cookieHeader) {
		const cookies = parse(cookieHeader);

		const accessToken =
			opts.app === "admin"
				? cookies.admin_access_token
				: cookies.user_access_token;

		const refreshToken =
			opts.app === "admin"
				? cookies.admin_refresh_token
				: cookies.user_refresh_token;

		if (process.env.NODE_ENV === "development") {
			console.log(
				`[auth][${opts.app}] access token:`,
				accessToken ? "present" : "missing",
			);

			console.log(
				`[auth][${opts.app}] refresh token:`,
				refreshToken ? "present" : "missing",
			);
		}

		// 1. Try access token first
		if (accessToken) {
			try {
				user = await verifyAccessToken(accessToken, opts.jwtSecret);

				if (process.env.NODE_ENV === "development") {
					console.log(`[auth][${opts.app}] access token verified successfully`);
				}
			} catch {
				if (process.env.NODE_ENV === "development") {
					console.log(
						`[auth][${opts.app}] access token expired/invalid, attempting refresh`,
					);
				}

				user = null;
			}
		}

		// 2. If access token missing OR invalid, use refresh token
		if (!user && refreshToken) {
			try {
				user =
					opts.app === "admin"
						? await refreshAdminToken(
								refreshToken,
								db,
								opts.jwtSecret,
								opts.resHeaders,
							)
						: await refreshUserToken(
								refreshToken,
								db,
								opts.jwtSecret,
								opts.resHeaders,
							);

				if (process.env.NODE_ENV === "development") {
					console.log(
						`[auth][${opts.app}] refreshed access token successfully`,
					);
				}
			} catch {
				if (process.env.NODE_ENV === "development") {
					console.log(`[auth][${opts.app}] refresh token invalid/expired`);
				}

				user = null;
			}
		}
	}

	return {
		db,
		user,
		...opts,
	};
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
	transformer: superjson,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError:
					error.cause instanceof ZodError ? error.cause.flatten() : null,
			},
		};
	},
});

/**
 * Create a server-side caller.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Middleware for timing procedure execution and adding an artificial delay in development.
 *
 * You can remove this if you don't like it, but it can help catch unwanted waterfalls by simulating
 * network latency that would occur in production but not in local development.
 */
const timingMiddleware = t.middleware(async ({ next, path }) => {
	const start = Date.now();

	if (t._config.isDev) {
		// artificial delay in dev
		const waitMs = Math.floor(Math.random() * 400) + 100;
		await new Promise((resolve) => setTimeout(resolve, waitMs));
	}

	const result = await next();

	const end = Date.now();
	console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

	return result;
});

export const protectedProcedure = t.procedure
	.use(timingMiddleware)
	.use(({ ctx, next }) => {
		if (!ctx.user) {
			throw new TRPCError({
				code: "UNAUTHORIZED",
			});
		}

		return next({
			ctx: {
				...ctx,
				user: ctx.user,
			},
		});
	});

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure.use(timingMiddleware);

// eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ImJiZGM1NmRkLWQ2NzUtNDFiOC1iMGZhLTQ2MmI1ZWQ3ZWVmZSIsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJ0eXBlIjoiYWRtaW4iLCJpYXQiOjE3ODIxNTA5NDgsImV4cCI6MTc4MjE1MTI0OH0.FlT2MEf73Zi0LFx3TBZGghFT6gO1GAlxv-7DFVu1vQI
