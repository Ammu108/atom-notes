"use client";

import {
	CameraIcon,
	ChartBarIcon,
	CircleHelpIcon,
	FileTextIcon,
	FolderIcon,
	LayoutDashboardIcon,
	ListIcon,
	SearchIcon,
	Settings2Icon,
	UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type * as React from "react";
import { NavMain } from "~/components/nav-main";
import { NavSecondary } from "~/components/nav-secondary";
import { NavUser } from "~/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "~/components/ui/sidebar";
import { api } from "~/trpc/react";

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
			icon: <ListIcon />,
		},
		{
			title: "All Notes",
			url: "/notes",
			icon: <ChartBarIcon />,
		},
		{
			title: "Projects",
			url: "#",
			icon: <FolderIcon />,
		},
		{
			title: "Team",
			url: "#",
			icon: <UsersIcon />,
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
	const { data: currentUser } = api.auth.me.useQuery(undefined, {
		retry: false,
	});

	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							className="data-[slot=sidebar-menu-button]:p-1.5!"
							render={<Link href="/" />}
						>
							<div className="relative aspect-square w-12">
								<Image alt="logo" fill objectFit="contain" src="/logo.webp" />
							</div>
							<span className="font-semibold text-base">Atom Notes </span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavSecondary className="mt-auto" items={data.navSecondary} />
			</SidebarContent>
			<SidebarFooter>
				{currentUser && <NavUser user={currentUser} />}
			</SidebarFooter>
		</Sidebar>
	);
}
