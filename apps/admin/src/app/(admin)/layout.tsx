import { AppSidebar } from "~/components/app-sidebar";
import { LoginPage } from "~/components/login-page";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { getCurrentUser } from "~/lib/get-current-user";

export default async function AdminLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const admin = await getCurrentUser();

	if (!admin || admin.role !== "admin") {
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
