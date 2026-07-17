import "~/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AppShell } from "~/components/app-shell";
import { Toaster } from "~/components/ui/sonner";
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
	return (
		<html className={` ${geist.variable}`} lang="en">
			<body className="bg-background">
				<TRPCReactProvider>
					<HydrateClient>
						<AppShell>{children}</AppShell>
						<Toaster position="top-center" />
					</HydrateClient>
				</TRPCReactProvider>
			</body>
		</html>
	);
}
