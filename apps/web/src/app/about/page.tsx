import { IconBoltFilled, IconEye } from "@tabler/icons-react";

const About = () => {
	// Move all static data outside render for stable keys + performance
	const highlights = [
		{
			id: "startup",
			number: "Startup",
			label: "Early-stage two-person team",
			emoji: "🚀",
		},
		{
			id: "notes",
			number: "Regular",
			label: "Structured notes & PYQs",
			emoji: "📝",
		},
		{ id: "focus", number: "Focus", label: "Student-first UX", emoji: "🎯" },
	];

	const coreValues = [
		{
			id: "compassion",
			icon: "❤️",
			title: "Compassion",
			description:
				"We prioritize patient wellbeing above all else, treating every person with dignity and empathy.",
		},
		{
			id: "innovation",
			icon: "🔬",
			title: "Innovation",
			description:
				"Constantly pushing boundaries with cutting-edge technology and medical practices.",
		},
		{
			id: "integrity",
			icon: "🤝",
			title: "Integrity",
			description:
				"Transparent, honest, and ethical in all our operations and patient relationships.",
		},
		{
			id: "excellence",
			icon: "🎯",
			title: "Excellence",
			description:
				"Striving for perfection in everything we do, from care to technology.",
		},
	];

	// culturePoints not required for Alphanote founders view

	const testimonials = [
		{
			id: "sarah",
			quote:
				"Atom Hospital made scheduling my specialist appointment incredibly easy. What would have taken weeks took just 15 minutes!",
			author: "Sarah M.",
			role: "Patient",
		},
		{
			id: "patel",
			quote:
				"As a healthcare provider, I'm impressed with how this platform streamlines my practice and helps me reach more patients.",
			author: "Dr. Patel",
			role: "Cardiologist",
		},
		{
			id: "rajesh",
			quote:
				"The 24/7 virtual consultation feature has been a lifesaver for our family. Highly recommended!",
			author: "Rajesh K.",
			role: "Happy Patient",
		},
	];

	const stars = ["star-1", "star-2", "star-3", "star-4", "star-5"];

	return (
		<main>
			{/* ── HERO SECTION ── */}
			<section className="mx-auto max-w-6xl px-4 pt-24 pb-16">
				<div className="grid items-center gap-16 lg:grid-cols-2">
					{/* Left: Intro Text */}
					<div className="animate-fadeUp-1 space-y-6">
						<div>
							<span className="mb-3 inline-block font-semibold text-primary text-xs uppercase tracking-wider">
								About Us
							</span>
							<h1 className="font-bold font-playfair text-5xl text-foreground leading-tight sm:text-6xl">
								Welcome to Alphanote —
								<span className="text-primary">
									Structured Notes, Faster Revision
								</span>
							</h1>
						</div>

						<div className="space-y-4">
							<p className="max-w-xl text-lg text-muted-foreground leading-relaxed">
								Alphanote is a small startup building a focused notes platform
								for students. We publish structured, detailed notes and curated
								PYQs regularly to help you revise efficiently and perform better
								in exams.
							</p>
							<p className="max-w-xl text-base text-muted-foreground leading-relaxed">
								We believe clear structure and concise solutions make learning
								faster — so every note is authored and reviewed for clarity and
								exam relevance.
							</p>
						</div>
					</div>

					{/* Right: Highlight Cards */}
					<div className="animate-fadeUp-2 space-y-5">
						{highlights.map(({ id, number, label, emoji }) => (
							<div
								className="group flex gap-4 rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-accent hover:bg-secondary/50 hover:shadow-lg"
								key={id}
							>
								<div className="shrink-0 pt-1 text-4xl">{emoji}</div>
								<div className="flex flex-col justify-center">
									<div className="font-bold font-playfair text-2xl text-primary">
										{number}
									</div>
									<div className="mt-0.5 text-muted-foreground text-sm">
										{label}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── MISSION & VISION ── */}
			<section className="mx-auto max-w-6xl px-4 py-20">
				<div className="grid gap-12 md:grid-cols-2">
					{/* Mission */}
					<div className="group animate-fadeUp-1">
						<div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-accent">
							<IconBoltFilled className="h-7 w-7 text-primary" />
						</div>
						<h2 className="mb-4 font-bold font-playfair text-3xl text-foreground">
							Our Mission
						</h2>
						<p className="text-base text-muted-foreground leading-relaxed">
							To transform healthcare accessibility by enabling every individual
							to connect with qualified medical professionals instantly,
							regardless of geographical or socioeconomic barriers. We believe
							quality healthcare is a right, not a privilege.
						</p>
					</div>

					{/* Vision */}
					<div className="group animate-fadeUp-2">
						<div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-accent">
							<IconEye className="h-7 w-7 text-primary" />
						</div>
						<h2 className="mb-4 font-bold font-playfair text-3xl text-foreground">
							Our Vision
						</h2>
						<p className="text-base text-muted-foreground leading-relaxed">
							To create a world where healthcare is democratized, personalized,
							and accessible to all. Our vision extends beyond appointments—we
							envision a holistic health ecosystem powered by AI, data, and
							human expertise.
						</p>
					</div>
				</div>
			</section>

			{/* ── CORE VALUES ── */}
			<section className="mx-auto max-w-6xl px-4 py-20">
				<div className="mb-16 text-center">
					<h2 className="mb-4 font-bold font-playfair text-4xl text-foreground">
						Guided by Core Values
					</h2>
					<p className="mx-auto max-w-2xl text-muted-foreground">
						Every decision we make is rooted in these fundamental principles
						that define our culture and commitment to excellence.
					</p>
				</div>

				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
					{coreValues.map(({ id, icon, title, description }) => (
						<div
							className="group animate-fadeUp-1 rounded-2xl border border-border/50 bg-card p-6"
							key={id}
						>
							<div className="mb-4 text-4xl">{icon}</div>
							<h3 className="mb-3 font-bold text-foreground text-lg">
								{title}
							</h3>
							<p className="text-muted-foreground text-sm leading-relaxed">
								{description}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* ── TEAM — FOUNDERS ── */}
			<section className="mx-auto max-w-6xl px-4 py-20">
				<div className="mb-12 text-center">
					<h2 className="mb-4 font-bold font-playfair text-4xl text-foreground">
						Meet the Founders
					</h2>
					<p className="mx-auto max-w-2xl text-muted-foreground">
						Alphanote is built and maintained by a two-person team focused on
						creating high-quality, exam-ready notes.
					</p>
				</div>

				<div className="grid gap-8 md:grid-cols-2">
					<div className="group animate-fadeUp-1 rounded-2xl border border-border/50 bg-card p-6">
						<h3 className="mb-3 font-bold text-foreground text-lg">Aman</h3>
						<p className="text-muted-foreground text-sm leading-relaxed">
							Developer & maintainer. Aman builds and manages the platform,
							implements features, and ensures the site runs reliably. He also
							curates and writes structured, detailed notes and compiles PYQs
							with clear solution explanations.
						</p>
					</div>

					<div className="group animate-fadeUp-2 rounded-2xl border border-border/50 bg-card p-6">
						<h3 className="mb-3 font-bold text-foreground text-lg">Rishabh</h3>
						<p className="text-muted-foreground text-sm leading-relaxed">
							Content lead and UI/UX designer. Rishabh makes sure the
							application should be user focused and feels easy to use and he
							also writes structured, detailed notes and compiles PYQs with
							clear solution explanations.
						</p>
					</div>
				</div>
			</section>

			{/* ── TESTIMONIALS ── */}
			<section className="mx-auto max-w-6xl px-4 py-20">
				<h2 className="mb-16 text-center font-bold font-playfair text-4xl text-foreground">
					Trusted by Thousands
				</h2>

				<div className="grid gap-8 md:grid-cols-3">
					{testimonials.map(({ id, quote, author, role }) => (
						<div
							className="group animate-fadeUp-1 rounded-2xl border border-border/50 bg-card p-8 transition-all duration-300 hover:border-accent hover:bg-secondary/30"
							key={id}
						>
							<div className="mb-4 flex gap-1">
								{stars.map((starId) => (
									<span className="text-lg text-primary" key={starId}>
										★
									</span>
								))}
							</div>
							<p className="mb-6 text-muted-foreground italic">"{quote}"</p>
							<div>
								<p className="font-semibold text-foreground">{author}</p>
								<p className="text-muted-foreground text-sm">{role}</p>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Spacing */}
			<div className="h-8" />
		</main>
	);
};

export default About;
