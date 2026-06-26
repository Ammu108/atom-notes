import { appRouter } from "@repo/api";
import { createUserTRPCContext } from "@repo/api/trpc";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { NextRequest } from "next/server";
import { env } from "~/env";

// /**
//  * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
//  * handling a HTTP request (e.g. when you make requests from Client Components).
//  */
// const createContext = async (req: NextRequest) => {
// 	const resHeaders = new Headers();

// 	return createTRPCContext({
// 		headers: req.headers,
// 		resHeaders,
// 		jwtSecret: env.USER_JWT_SECRET,
// 		app: "web",
// 	});
// };

const handler = (req: NextRequest) =>
	fetchRequestHandler({
		endpoint: "/api/trpc",
		req,
		router: appRouter,
		createContext: () => createUserTRPCContext({ headers: req.headers }),
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
