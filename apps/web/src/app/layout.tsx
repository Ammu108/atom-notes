import "~/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AppShell } from "~/components/app-shell";
import { Toaster } from "~/components/ui/sonner";
import { getCurrentUser } from "~/lib/get-current-user";
import { TRPCReactProvider } from "~/trpc/react";
import { HydrateClient } from "~/trpc/server";

export const metadata: Metadata = {
	title: "Atom - Hospital Booking System",
	description: "A hospital booking system built with Next.js",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default async function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const user = await getCurrentUser();

	return (
		<html className={`${geist.variable}`} lang="en">
			<body className="bg-background">
				<TRPCReactProvider>
					<HydrateClient>
						<AppShell user={user}>
							{children}
							<Toaster position="top-center" />
						</AppShell>
					</HydrateClient>
				</TRPCReactProvider>
			</body>
		</html>
	);
}
