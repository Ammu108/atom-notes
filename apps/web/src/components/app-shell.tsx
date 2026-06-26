// "use client";

// import { usePathname } from "next/navigation";
// import Footer from "~/components/footer";
// import Navbar from "~/components/navbar";

// type AppShellProps = Readonly<{
// 	children: React.ReactNode;
// }>;

// export function AppShell({ children }: AppShellProps) {
// 	const pathname = usePathname();
// 	const hideChrome = pathname.startsWith("/auth");

// 	return (
// 		<>
// 			{!hideChrome ? <Navbar /> : null}
// 			{children}
// 			{!hideChrome ? <Footer /> : null}
// 		</>
// 	);
// }

"use client";

export function AppShell({ children }: { children: React.ReactNode }) {
	return children;
}
