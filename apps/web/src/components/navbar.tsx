"use client";

import { userAuthClient } from "@repo/api/user-client";
import { Button } from "@repo/ui";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import ProfileDropdown from "./kokonutui/profile-dropdown";

const NAV_LINKS = [
	{ label: "Home", href: "/" },
	{ label: "About", href: "/about" },
	{ label: "Browse", href: "/browse" },
	{ label: "Pyqs", href: "/pyqs" },
	{ label: "Contact", href: "/contact" },
];

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const pathname = usePathname();
	const router = useRouter();
	const { data: session } = userAuthClient.useSession();

	const handleSignUp = () => {
		router.push("/auth?tab=signup");
		setMenuOpen(false);
	};

	const handleSignOut = async () => {
		await userAuthClient.signOut();

		router.push("/");
		router.refresh();
	};

	const user = session?.user;

	const profileData = user // ✅ user comes from useSession now
		? {
				name: user.name,
				email: user.email,
				avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8ABC&color=fff`,
			}
		: undefined;

	return (
		<nav className="fixed top-0 right-0 left-0 z-50 w-full border-border border-b bg-card transition-all duration-300">
			<div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3">
				{/* ── LEFT: Logo ── */}
				<Link
					className="group flex shrink-0 flex-row items-center gap-1"
					href="/"
				>
					<div className="relative h-10 w-10">
						<Image
							alt="Logo"
							className="rounded-sm"
							fill
							src="/atomsNote-logo.webp"
						/>
					</div>
					<h1 className="font-bold text-foreground text-lg">Atom Notes</h1>
				</Link>

				{/* ── CENTER: Nav Links (desktop) ── */}
				<ul className="hidden items-center gap-1 md:flex">
					{NAV_LINKS.map(({ label, href }) => {
						const isActive = pathname === href;
						return (
							<li key={label}>
								<Link
									className={`group relative px-4 py-1.5 font-medium text-sm transition-colors duration-200 ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
									href={href}
								>
									{label}
									<span
										className={`absolute right-4 bottom-0 left-4 h-0.5 origin-left rounded-full bg-primary transition-all duration-300 ${isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-40"}`}
									/>
								</Link>
							</li>
						);
					})}
				</ul>

				{/* ── RIGHT: CTA + Hamburger ── */}
				<div className="flex items-center gap-2">
					{profileData ? (
						<ProfileDropdown
							className="hidden md:block"
							data={profileData}
							onSignOut={handleSignOut}
						/>
					) : (
						<div className="hidden md:block">
							<Button onClick={handleSignUp} size="sm" variant="primary">
								Sign Up / Login
							</Button>
						</div>
					)}
					{/* Hamburger — mobile */}
					<div className="flex items-center">
						{profileData ? (
							<ProfileDropdown
								className="md:hidden"
								data={profileData}
								onSignOut={handleSignOut}
							/>
						) : (
							<div className="md:hidden">
								<Button onClick={handleSignUp} size="xs" variant="primary">
									Sign Up / Login
								</Button>
							</div>
						)}
						<button
							aria-label="Toggle menu"
							className="p-2 text-foreground md:hidden"
							onClick={() => setMenuOpen(!menuOpen)}
							type="button"
						>
							{menuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
						</button>
					</div>
				</div>
			</div>

			{/* ── MOBILE MENU ── */}
			<div
				className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
					menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
				} border-border border-t bg-background`}
			>
				<div className="flex flex-col gap-2 px-6 py-6">
					{NAV_LINKS.map(({ label, href }) => {
						const isActive = pathname === href;
						return (
							<Link
								className={`rounded-lg px-4 py-3 font-medium text-base transition-all ${
									isActive
										? "border-primary border-l-4 bg-primary/10 text-primary"
										: "border-transparent border-l-4 text-muted-foreground hover:bg-accent hover:text-foreground"
								}`}
								href={href}
								key={label}
								onClick={() => {
									setMenuOpen(false);
								}}
							>
								{label}
							</Link>
						);
					})}
				</div>
			</div>
		</nav>
	);
}
