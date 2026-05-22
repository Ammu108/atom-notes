import "~/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "~/components/providers/theme-provider";
import { Toaster } from "~/components/ui/sonner";
import { TooltipProvider } from "~/components/ui/tooltip";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
	title: "Atom Hospital - Admin Dashboard",
	description: "Admin dashboard for Atom Hospital",
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
		<html className={`${geist.variable}`} lang="en">
			<body>
				<TRPCReactProvider>
					<TooltipProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							disableTransitionOnChange
							enableSystem
						>
							{children}
							<Toaster />
						</ThemeProvider>
					</TooltipProvider>
				</TRPCReactProvider>
			</body>
		</html>
	);
}
