"use client";

import {
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui";
import { IconCalendar, IconUserCircle } from "@tabler/icons-react";
import { FileText, LogOut } from "lucide-react";
import Link from "next/link";
import * as React from "react";

interface Profile {
  name: string;
  email: string;
  avatar: string;
  subscription?: string;
  model?: string;
}

interface MenuItem {
  label: string;
  value?: string;
  href: string;
  icon: React.ReactNode;
  external?: boolean;
}

const SAMPLE_PROFILE_DATA: Profile = {
  name: "Eugene An",
  email: "eugene@kokonutui.com",
  avatar:
    "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/profile-mjss82WnWBRO86MHHGxvJ2TVZuyrDv.jpeg",
  subscription: "PRO",
  model: "Gemini 2.0 Flash",
};

interface ProfileDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: Profile;
  showTopbar?: boolean;
  onSignOut?: () => void;
}

export default function ProfileDropdown({
  data = SAMPLE_PROFILE_DATA,
  className,
  onSignOut,
  ...props
}: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuItems: MenuItem[] = [
    {
      label: "My Appointments",
      href: "/my-appointments",
      icon: <IconCalendar className="h-4 w-4" />,
    },
    {
      label: "Terms & Policies",
      href: "/privacy-policy",
      icon: <FileText className="h-4 w-4" />,
      external: true,
    },
  ];

  return (
    <div className={cn("relative", className)} {...props}>
      <DropdownMenu onOpenChange={setIsOpen}>
        <div className="group relative">
          <DropdownMenuTrigger className="flex items-center gap-16 rounded-full bg-muted p-0.5 transition-all duration-200 hover:cursor-pointer md:px-2 md:py-1">
            <div className="h-7 w-7 rounded-full p-0.5 md:h-10 md:w-10">
              <IconUserCircle className="h-full w-full rounded-full text-card-foreground" />
            </div>
          </DropdownMenuTrigger>

          {/* Bending line indicator on the right */}
          <div
            className={cn(
              "absolute top-1/2 -right-3 -translate-y-1/2 transition-all duration-200",
              isOpen ? "opacity-100" : "opacity-60 group-hover:opacity-100",
            )}
          >
            <svg
              aria-hidden="true"
              className={cn(
                "transition-all duration-200",
                isOpen
                  ? "scale-110 text-blue-500 dark:text-blue-400"
                  : "text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300",
              )}
              fill="none"
              height="24"
              viewBox="0 0 12 24"
              width="12"
            >
              <path
                d="M2 4C6 8 6 16 2 20"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          <DropdownMenuContent
            align="end"
            className="data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 w-64 origin-top-right rounded-2xl bg-white p-2 shadow-xl shadow-zinc-900/5 data-[state=closed]:animate-out data-[state=open]:animate-in"
            sideOffset={4}
          >
            <div className="space-y-1">
              <div className="p-2">
                <div className="font-medium text-sm capitalize leading-tight tracking-tight">
                  {data.name}
                </div>
                <div className="text-sm text-zinc-500 leading-tight tracking-tight dark:text-zinc-400">
                  {data.email}
                </div>
              </div>
              {menuItems.map((item: MenuItem) => (
                <DropdownMenuItem
                  key={item.label}
                  render={
                    <Link
                      className="group flex cursor-pointer items-center rounded-xl border border-transparent p-3 transition-all duration-200"
                      href={item.href}
                    />
                  }
                >
                  <div className="flex flex-1 items-center gap-2">
                    {item.icon}
                    <span className="whitespace-nowrap font-medium text-sm text-zinc-900 leading-tight tracking-tight transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <div className="ml-auto shrink-0 text-accent-foreground">
                    {item.value && <span>{item.value}</span>}
                  </div>
                </DropdownMenuItem>
              ))}
            </div>

            <DropdownMenuSeparator className="my-3 bg-linear-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-800" />

            <DropdownMenuItem
              nativeButton={true}
              render={
                <button
                  className="group flex w-full cursor-pointer items-center gap-3 rounded-xl border border-transparent bg-red-500/10 p-3 transition-all duration-200 hover:bg-red-500/15"
                  onClick={onSignOut}
                  type="button"
                />
              }
            >
              <LogOut className="h-4 w-4 text-red-500 group-hover:text-red-600" />
              <span className="font-medium text-red-500 text-sm group-hover:text-red-600">
                Sign Out
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </div>
      </DropdownMenu>
    </div>
  );
}
