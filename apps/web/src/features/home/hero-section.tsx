"use client";

import Link from "next/link";
import { Container } from "~/components/container";
import { Button } from "~/components/ui/button";

const stats = [
	{ value: "12+", label: "Study Notes" },
	{ value: "BCA", label: "All Semesters" },
	{ value: "50+", label: "PYQ Questions" },
	{ value: "Free", label: "Reading Access" },
];

export default function HeroSection() {
	return (
		<section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 py-28 sm:py-24">
			{/* Subtle background texture dots */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 opacity-[0.1]"
				style={{
					backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
					backgroundSize: "28px 28px",
				}}
			/>

			{/* Content wrapper */}
			<Container>
				<div className="z-10 flex w-full flex-col items-center justify-center gap-10">
					<div className="flex flex-col items-center justify-center gap-6">
						{/* Badge */}
						<div className="flex items-center justify-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-center shadow-sm backdrop-blur-sm transition-all duration-700 ease-out">
							{/* mini flag emoji representation */}
							<span aria-hidden="true" className="text-base">
								🇮🇳
							</span>
							<span className="font-medium text-gray-600 text-xs tracking-wide sm:text-sm">
								India&apos;s Smartest College Student Notes Platform
							</span>
						</div>

						{/* Headline */}
						<h1 className="text-center font-bold font-serif text-5xl text-foreground leading-[1.1] tracking-tight transition-all delay-100 duration-700 ease-out sm:text-5xl md:text-6xl lg:text-7xl">
							Study Smarter with
							<br />
							<span className="text-primary italic">Curated Notes</span> &amp;
							PYQs
						</h1>

						{/* Subheadline */}
						<p className="max-w-md text-center text-base text-foreground leading-relaxed transition-all delay-200 duration-700 ease-out sm:max-w-lg sm:text-lg">
							Semester-wise notes, unit-by-unit coverage, and year-wise PYQ
							questions — all in one place.
						</p>
					</div>

					{/* CTA Buttons */}
					<div className="flex flex-col items-center gap-3 transition-all delay-300 duration-700 ease-out sm:flex-row sm:gap-4">
						<Link href={"/browse"}>
							<Button>Browse Notes</Button>
						</Link>
						<Link href={"/pyqs"}>
							<Button variant="outline">View PYQs</Button>
						</Link>
					</div>

					{/* Stats Grid */}
					<div className="grid w-full max-w-3xl grid-cols-2 gap-3 transition-all delay-400 duration-700 ease-out sm:grid-cols-4 sm:gap-4">
						{stats.map(({ value, label }) => (
							<div
								className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-border bg-card px-6 py-6 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md sm:py-7"
								key={label}
							>
								<span className="font-bold font-serif text-2xl text-primary sm:text-3xl">
									{value}
								</span>
								<span className="font-medium text-gray-400 text-xs tracking-wide sm:text-sm">
									{label}
								</span>
							</div>
						))}
					</div>
				</div>
			</Container>
		</section>
	);
}
