import { Button } from "@repo/ui";
import {
	IconBrandFacebook,
	IconBrandInstagram,
	IconBrandLinkedin,
	IconBrandTwitter,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const SOCIAL_ICONS = [
	{ label: "Facebook", icon: IconBrandFacebook },
	{ label: "Twitter", icon: IconBrandTwitter },
	{ label: "Instagram", icon: IconBrandInstagram },
	{ label: "LinkedIn", icon: IconBrandLinkedin },
];

const COMPANY_LINKS = [
	{ label: "About", href: "/about" },
	{ label: "Browse", href: "/browse" },
	{ label: "Contact", href: "/contact" },
	{ label: "Privacy Policy", href: "/privacy-policy" },
];

export default function Footer() {
	return (
		<footer className="mt-16 w-full bg-card">
			{/* ── Main footer content ── */}
			<div className="mx-auto max-w-6xl px-6 py-12 sm:px-10 lg:px-16">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
					<div className="flex max-w-sm flex-col gap-4">
						{/* Logo */}
						<div className="flex flex-row items-center gap-2">
							<Image
								alt="Atom Hospital Logo"
								className="h-10 w-10"
								height={32}
								src="/logo.webp"
								width={32}
							/>
							<span className="font-bold text-2xl text-foreground tracking-tight">
								Atom Hospital
							</span>
						</div>

						{/* Description */}
						<p className="text-muted-foreground text-sm leading-relaxed">
							Comprehensive, organized notes for every semester and subject.
							Your academic success starts here. Access, revise, and excel with
							ease. Say goodbye to scattered materials and hello to streamlined
							studying.
						</p>

						{/* Social icons */}
						<div className="mt-1 flex items-center gap-3">
							{SOCIAL_ICONS.map(({ label, icon: Icon }) => (
								<Link
									aria-label={label}
									className="rounded-full bg-muted p-2 hover:bg-muted/80"
									href="#"
									key={label}
								>
									<div>
										<Icon className="h-5 w-5 text-muted-foreground hover:text-muted-foreground/80" />
									</div>
								</Link>
							))}
						</div>
					</div>

					{/* ── CENTER: Company links ── */}
					<div className="flex flex-col gap-4 sm:items-center">
						<h3 className="font-bold text-foreground text-lg">Company</h3>
						<ul className="flex flex-col gap-3">
							{COMPANY_LINKS.map((link) => (
								<li key={link.href}>
									<Link
										className="text-muted-foreground text-sm hover:text-foreground/80"
										href={link.href}
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* ── RIGHT: Contact + Admin Panel ── */}
					<div className="flex flex-col items-end gap-3">
						<p className="font-semibold text-muted-foreground text-sm">
							+91-999-987-6368
						</p>
						<p className="font-regular text-muted-foreground text-sm">
							atomNotes@gmail.com
						</p>
						<div className="mt-1">
							<Button size="sm" variant="outline">
								Admin Panel
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* ── Divider + Copyright ── */}
			<div className="border-slate-400/40 border-t">
				<div className="mx-auto max-w-7xl px-6 py-4 text-center">
					<p className="text-muted-foreground text-sm">
						© 2024 Atom Hospital App. All Rights Reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
