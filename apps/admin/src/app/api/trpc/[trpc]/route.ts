import { appRouter, createTRPCContext } from "@repo/api";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { NextRequest } from "next/server";
import { env } from "~/env";

const createContext = async (req: NextRequest) => {
	const resHeaders = new Headers();

	return createTRPCContext({
		headers: req.headers,
		resHeaders,
		jwtSecret: env.ADMIN_JWT_SECRET,
		app: "admin",
	});
};

const handler = (req: NextRequest) =>
	fetchRequestHandler({
		endpoint: "/api/trpc",
		req,
		router: appRouter,
		createContext: () => createContext(req),
		responseMeta({ ctx }) {
			return {
				headers: ctx?.resHeaders,
			};
		},
		onError:
			env.NODE_ENV === "development"
				? ({ path, error }) => {
						console.error(
							`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
						);
					}
				: undefined,
	});

export { handler as GET, handler as POST };
