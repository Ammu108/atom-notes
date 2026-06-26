"use client";

import { adminAuthClient } from "@repo/api/admin-client";
import {
	CameraIcon,
	CircleHelpIcon,
	ContactRound,
	FileTextIcon,
	LayoutDashboardIcon,
	LibraryBig,
	NotebookPen,
	SearchIcon,
	Settings2Icon,
	UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type * as React from "react";
import { NavMain } from "~/components/nav-main";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "~/components/ui/sidebar";
import { NavUser } from "./nav-user";

const data = {
	navMain: [
		{
			title: "Dashboard",
			url: "/",
			icon: <LayoutDashboardIcon />,
		},
		{
			title: "All Users",
			url: "/users",
			icon: <UsersIcon />,
		},
		{
			title: "All Courses",
			url: "/courses",
			icon: <LibraryBig />,
		},
		{
			title: "All Notes",
			url: "/notes",
			icon: <NotebookPen />,
		},
		{
			title: "Contacts",
			url: "/contacts",
			icon: <ContactRound />,
		},
	],
	navClouds: [
		{
			title: "Capture",
			icon: <CameraIcon />,
			isActive: true,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
		{
			title: "Proposal",
			icon: <FileTextIcon />,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
		{
			title: "Prompts",
			icon: <FileTextIcon />,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
	],
	navSecondary: [
		{
			title: "Settings",
			url: "#",
			icon: <Settings2Icon />,
		},
		{
			title: "Get Help",
			url: "#",
			icon: <CircleHelpIcon />,
		},
		{
			title: "Search",
			url: "#",
			icon: <SearchIcon />,
		},
	],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { data: session } = adminAuthClient.useSession();

	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							className="h-12 data-[slot=sidebar-menu-button]:p-1.5!"
							render={<Link href="/" />}
						>
							<div className="relative aspect-square w-12">
								<Image
									alt="logo"
									fill
									objectFit="contain"
									src="/atomsNote-logo.webp"
								/>
							</div>
							<span className="font-semibold text-base">Atom Notes </span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={session?.user ?? null} />
			</SidebarFooter>
		</Sidebar>
	);
}
