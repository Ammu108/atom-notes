import "~/styles/globals.css";

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";
import { AppShell } from "~/components/app-shell";
import { Toaster } from "~/components/ui/sonner";
import { TRPCReactProvider } from "~/trpc/react";
import { HydrateClient } from "~/trpc/server";

export const metadata: Metadata = {
	title: "Atom - Hospital Booking System",
	description: "A hospital booking system built with Next.js",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	variable: "--font-roboto",
});

export default async function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html className={roboto.variable} lang="en">
			<body className="bg-background">
				<TRPCReactProvider>
					<HydrateClient>
						<AppShell>{children}</AppShell>
						<Toaster position="top-center" />
					</HydrateClient>
				</TRPCReactProvider>

				<Script
					src="https://checkout.razorpay.com/v1/checkout.js"
					strategy="afterInteractive"
				/>
			</body>
		</html>
	);
}
