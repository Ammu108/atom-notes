"use client";

import { usePathname } from "next/navigation";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";

type AppShellProps = Readonly<{
	children: React.ReactNode;
	user: {
		name: string;
		email: string;
	} | null;
}>;

export function AppShell({ children, user }: AppShellProps) {
	const pathname = usePathname();
	const hideChrome = pathname.startsWith("/auth");

	return (
		<>
			{!hideChrome ? <Navbar user={user} /> : null}
			{children}
			{!hideChrome ? <Footer /> : null}
		</>
	);
}
