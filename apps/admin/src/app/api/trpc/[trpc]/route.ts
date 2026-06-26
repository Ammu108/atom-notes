import { appRouter } from "@repo/api";
import { createAdminTRPCContext } from "@repo/api/trpc";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (req: Request) =>
	fetchRequestHandler({
		endpoint: "/api/trpc",
		req,
		router: appRouter,
		createContext: () => createAdminTRPCContext({ headers: req.headers }),
		onError:
			process.env.NODE_ENV === "development"
				? ({ error }) => console.error("tRPC error:", error)
				: undefined,
	});

export { handler as GET, handler as POST };
