import Image from "next/image";
import Link from "next/link";
import { Container } from "./container";

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
			<Container className="mx-auto">
				<div className="w-full px-4 py-12">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
						<div className="flex max-w-sm flex-col gap-4">
							{/* Logo */}
							<div className="flex flex-row items-center gap-2">
								<Image
									alt="Logo"
									className="h-10 w-10"
									height={32}
									src="/atomsNote-logo.webp"
									width={32}
								/>
								<span className="font-bold text-2xl text-foreground tracking-tight">
									AtomsNote
								</span>
							</div>

							{/* Description */}
							<p className="text-muted-foreground text-sm leading-relaxed">
								Comprehensive, organized notes for every semester and subject.
								Your academic success starts here. Access, revise, and excel
								with ease. Say goodbye to scattered materials and hello to
								streamlined studying.
							</p>

							{/* Social icons */}
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
						</div>
					</div>
				</div>
			</Container>

			{/* ── Divider + Copyright ── */}
			<div className="border-slate-400/40 border-t">
				<div className="mx-auto max-w-7xl px-6 py-4 text-center">
					<p className="text-muted-foreground text-sm">
						© 2026 AtomsNote App. All Rights Reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
