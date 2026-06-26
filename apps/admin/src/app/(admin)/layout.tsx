import { adminAuth } from "@repo/api/admin-auth";
import { headers } from "next/headers";
import { AppSidebar } from "~/components/app-sidebar";
import { LoginPage } from "~/components/login-page";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";

export default async function AdminLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const session = await adminAuth.api.getSession({ headers: await headers() });

	if (!session?.user) {
		return <LoginPage />;
	}

	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 72)",
					"--header-height": "calc(var(--spacing) * 12)",
				} as React.CSSProperties
			}
		>
			<AppSidebar variant="inset" />
			<SidebarInset>{children}</SidebarInset>
		</SidebarProvider>
	);
}
