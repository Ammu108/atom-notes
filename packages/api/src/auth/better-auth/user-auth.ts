import { account, db, session, user, verification } from "@repo/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

const webUrl = process.env.BETTER_AUTH_WEB_URL;

if (!webUrl) {
  throw new Error(
    "BETTER_AUTH_WEB_URL and BETTER_AUTH_ADMIN_URL environment variables must be set",
  );
}

export const userAuth = betterAuth({
  baseURL: process.env.BETTER_AUTH_WEB_URL,

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
    cookiePrefix: "user", // → cookie: "user.session_token"
    defaultCookieAttributes: {
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      domain: process.env.COOKIE_DOMAIN, // e.g. ".yourapp.com"
    },
  },

  trustedOrigins: [webUrl],

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
      },
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      prompt: "select_account",
    },
  },

  emailAndPassword: {
    enabled: true,
  },
});
