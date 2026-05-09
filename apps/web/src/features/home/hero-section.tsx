import { Button } from "@repo/ui";
import Image from "next/image";

const HeroSection = () => {
	return (
		<section className="relative mb-16 w-full overflow-hidden py-18 md:py-32">
			{/* ── BACKGROUND IMAGE ── */}
			<div className="absolute inset-0 w-full animate-scaleIn">
				<Image
					alt="hero banner"
					className="object-cover object-center"
					fill
					src="/hero-bg.webp"
				/>
			</div>

			{/* dark gradient from bottom-left */}
			<div className="absolute inset-0 bg-linear-to-tr from-black via-black/40 to-transparent" />
			{/* Top vignette */}
			{/* <div className="absolute inset-0 bg-linear-to-b from-slate-950/30 via-transparent to-slate-950/70" /> */}

			{/* ── CONTENT ── */}
			<div className="relative z-10 mx-auto flex max-w-6xl flex-col justify-center gap-8 px-4 pt-12">
				<div className="flex flex-col justify-center gap-4">
					{/* Title */}
					<h1 className="animate-fadeUp-2 font-bold font-playfair text-4xl text-white leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
						Find Semester, <span className="text-[#D9EAFD] italic">Notes</span>
						<br className="hidden sm:block" />
						<span className="mt-1 block">Without the Chaos</span>
					</h1>

					{/* Description */}
					<p className="max-w-xl animate-fadeUp-3 text-base text-white/80 leading-relaxed sm:text-lg">
						Access comprehensive, organized notes, PYQs and study material. Say
						goodbye to scattered materials and hello to streamlined studying.
						Your academic success starts here.
					</p>
				</div>

				<div className="flex flex-col justify-center gap-4">
					{/* Action Buttons */}
					<div className="flex animate-fadeUp-4 flex-col gap-4 sm:flex-row">
						{/* Primary CTA */}
						<Button size="lg" variant="primary">
							Access Notes
						</Button>
					</div>

					{/* Features */}
					<div className="flex animate-fadeUp-4 flex-row justify-start gap-3">
						<div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-sm">
							<svg
								aria-hidden="true"
								className="h-4 w-4 text-white/90"
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M12 5v14M5 12h14" />
							</svg>
							<p className="font-medium text-white/90 text-xs md:text-sm">
								New notes added regularly
							</p>
						</div>
						<div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-sm">
							<svg
								aria-hidden="true"
								className="h-4 w-4 text-white/90"
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect height="16" rx="2" width="18" x="3" y="4" />
								<path d="M16 2v4M8 2v4" />
							</svg>
							<p className="font-medium text-white/90 text-xs md:text-sm">
								Semester-wise organization
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
