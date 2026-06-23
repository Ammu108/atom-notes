// apps/web/src/context/session-context.tsx
"use client";

import { createContext, useContext } from "react";
import { api } from "~/trpc/react";

type User = { id: string; name: string; email: string; role: string };

const SessionContext = createContext<{
	user: User | null;
}>({ user: null });

export function SessionProvider({ children }: { children: React.ReactNode }) {
	const { data } = api.auth.me.useQuery(undefined, {
		// ✅ If null (guest), don't keep retrying
		retry: false,

		// ✅ Silent refresh every 4 min
		staleTime: 4 * 60 * 1000,
		refetchInterval: 4 * 60 * 1000,
		refetchOnWindowFocus: true,

		// ✅ KEY: on error (401 after logout), don't throw — just return null user
		// This is what stops the "unauthorized error on screen" after logout
		throwOnError: false,
		// initialData: null,
	});

	// data is undefined when unauthenticated query returns error
	// We treat that as guest — never show an error
	const user = data ?? null;

	return (
		<SessionContext.Provider value={{ user }}>
			{children}
		</SessionContext.Provider>
	);
}

export const useSession = () => useContext(SessionContext);
