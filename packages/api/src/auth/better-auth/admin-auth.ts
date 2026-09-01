import { account, db, session, user, verification } from "@repo/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

const adminUrl = process.env.BETTER_AUTH_ADMIN_URL;

if (!adminUrl) {
	throw new Error(
		"BETTER_AUTH_WEB_URL and BETTER_AUTH_ADMIN_URL environment variables must be set",
	);
}

export const adminAuth = betterAuth({
	baseURL: process.env.BETTER_AUTH_ADMIN_URL,

	database: drizzleAdapter(db, {
		provider: "pg",
		schema: {
			user,
			session,
			account,
			verification,
		},
	}),

	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60, // 5 minutes cache duration
		},
	},

	advanced: {
		cookiePrefix: "admin", // → cookie: "admin.session_token"
		defaultCookieAttributes: {
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
		},
	},

	trustedOrigins: [adminUrl],

	user: {
		additionalFields: {
			role: {
				type: "string",
				defaultValue: "USER",
			},
		},
	},

	emailAndPassword: {
		enabled: true,
	},
});

export type AdminAuth = typeof adminAuth;
