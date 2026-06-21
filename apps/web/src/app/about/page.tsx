import { IconBrandLinkedin, IconGlobe } from "@tabler/icons-react";
import {
	BookOpen,
	FileText,
	GraduationCap,
	Star,
	Users,
	Zap,
} from "lucide-react";
import Image from "next/image";
import { Container } from "~/components/container";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

const features = [
	{
		icon: <BookOpen className="h-5 w-5" />,
		title: "Semester-wise Notes",
		desc: "Curated notes organized by semester so you always find exactly what you need for your current term.",
		color: "bg-blue-50 text-blue-600",
	},
	{
		icon: <GraduationCap className="h-5 w-5" />,
		title: "Subject-wise Organization",
		desc: "Every note is tagged by subject — Algorithms, DBMS, OS, Networks, ML and more. Filter in seconds.",
		color: "bg-green-50 text-green-600",
	},
	{
		icon: <FileText className="h-5 w-5" />,
		title: "Previous Year Questions",
		desc: "Solved PYQs with explanations for every major subject, helping you ace your exams with confidence.",
		color: "bg-orange-50 text-orange-600",
	},
	{
		icon: <Star className="h-5 w-5" />,
		title: "Exam-Focused Content",
		desc: "Every note highlights key concepts, definitions, and exam tips — written by students, for students.",
		color: "bg-purple-50 text-purple-600",
	},
	{
		icon: <Zap className="h-5 w-5" />,
		title: "Instant PDF Download",
		desc: "One-time purchase, lifetime access. Download as mobile-friendly PDFs and study anywhere, anytime.",
		color: "bg-red-50 text-red-600",
	},
	{
		icon: <Users className="h-5 w-5" />,
		title: "Community Driven",
		desc: "Notes crafted by top-performing students and reviewed for accuracy before publishing.",
		color: "bg-teal-50 text-teal-600",
	},
];

const founders = [
	{
		name: "Aman Kumar",
		role: "Founder & CEO",
		avatar: "/aman-img.webp",
		Education: "MCA - Present",
		bio: "Aman Kumar is the Founder & CEO of Atom Notes, leading the technical vision and development of the platform. With strong expertise in Full Stack Development, he has been responsible for building the core technology behind Atom Notes. From designing scalable web solutions to implementing modern technologies, Aman has worked extensively with TypeScript, React, and other advanced programming technologies to bring the idea of Atom Notes into a fully functional learning platform. His strong understanding of frontend, backend, and complete development workflows helps Atom Notes deliver a smooth, reliable, and user-friendly experience for students. Beyond coding, Aman contributes to the overall product thinking, ensuring that technology and user needs come together to create a meaningful educational platform.",
		linkedin: "https://www.linkedin.com/in/aman-kumar-5464242b8/",
		portfolio: "https://amenx.me/",
	},
	{
		name: "Rishabh Jha",
		role: "Co-Founder & CEO",
		avatar: "/rishabh-img.webp",
		Education: "MCA - Present",
		bio: "Rishabh Jha is the Founder & CEO of Atom Notes, responsible for shaping the platform’s design vision, user experience, and creative direction. With a strong interest in UI/UX Design, user behavior, and digital experiences, Rishabh designed the complete structure, interface, and visual identity of Atom Notes. From planning the website flow to creating an intuitive user journey, he focuses on making the platform simple, engaging, and easy for students to navigate. His work revolves around understanding student needs, creating meaningful designs, and improving the overall experience through thoughtful UX decisions. Along with design, Rishabh also contributes to product strategy, content planning, and building the overall direction of Atom Notes to ensure that the platform solves real problems faced by students.",
		linkedin:
			"https://www.linkedin.com/in/rishabh-jha-7883a3270?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
		portfolio: "https://rishabh-portfolio-tau.vercel.app/",
	},
];

export default function AboutPage() {
	return (
		<Container className="mx-auto">
			<div className="w-full pt-24">
				{/* Hero */}
				<section className="bg-card">
					<div className="mx-auto max-w-5xl px-6 py-16 text-center">
						<Badge className="mb-4 rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary text-xs">
							About AtomsNote
						</Badge>
						<h1 className="mb-4 font-extrabold text-4xl text-foreground leading-tight sm:text-5xl">
							Notes that actually{" "}
							<span className="text-primary">make sense</span>
						</h1>
						<p className="mx-auto max-w-2xl text-foreground text-lg leading-relaxed">
							AtomsNote is a student-built platform delivering semester-wise,
							subject-wise college notes and previous year questions — so you
							spend less time searching and more time learning.
						</p>
					</div>
				</section>

				{/* Mission */}
				<section className="py-8 md:px-6">
					<div className="flex flex-col items-start gap-8 rounded-2xl border border-border bg-card p-8 shadow-sm sm:flex-row">
						<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-2xl text-primary">
							🎯
						</div>
						<div>
							<h2 className="mb-2 font-bold text-foreground text-xl">
								Our Mission
							</h2>
							<p className="text-foreground leading-relaxed">
								College students waste countless hours chasing notes across
								WhatsApp groups, Telegram channels, and random drives. We built
								AtomsNote to fix that. Our mission is simple — give every
								student access to well-structured, exam-ready notes and PYQs,
								organized the way their syllabus is: by{" "}
								<span className="font-semibold text-gray-700">semester</span>{" "}
								and <span className="font-semibold text-gray-700">subject</span>
								. No clutter. No noise. Just the stuff that matters.
							</p>
						</div>
					</div>
				</section>

				{/* What We Offer */}
				<section className="py-8 md:px-6">
					<h2 className="mb-6 font-extrabold text-2xl text-foreground">
						What we offer
					</h2>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{features.map((f) => (
							<Card
								className="rounded-2xl border border-border transition-shadow hover:shadow-md"
								key={f.title}
							>
								<CardContent className="p-2">
									<div
										className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${f.color}`}
									>
										{f.icon}
									</div>
									<h3 className="mb-1 font-bold text-gray-900">{f.title}</h3>
									<p className="text-gray-500 text-sm leading-relaxed">
										{f.desc}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</section>

				{/* Founders */}
				<section className="py-8 pb-16 md:px-6">
					<h2 className="mb-6 font-extrabold text-2xl text-foreground">
						Meet the founders
					</h2>
					<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
						{founders.map((f) => (
							<Card className="rounded-2xl border border-border" key={f.name}>
								<CardContent className="p-6">
									<div className="mb-4 flex items-center gap-4">
										<div className="relative h-16 w-16 rounded-full">
											<Image
												alt="Logo"
												className="rounded-full"
												fill
												src={f.avatar}
											/>
										</div>
										<div>
											<p className="font-extrabold text-foreground text-lg leading-tight">
												{f.name}
											</p>
											<p className="font-semibold text-primary text-sm">
												{f.role}
											</p>
											<p className="text-foreground/70 text-xs">
												{f.Education}
											</p>
										</div>
									</div>
									<p className="mb-4 text-foreground/90 text-sm leading-relaxed">
										{f.bio}
									</p>
									<div className="flex items-center gap-3 border-gray-100 border-t pt-4">
										<a
											className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 font-medium text-gray-600 text-xs transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
											href={f.linkedin}
											rel="noopener noreferrer"
											target="_blank"
										>
											<IconBrandLinkedin className="h-3.5 w-3.5" />
											LinkedIn
										</a>
										<a
											className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 font-medium text-gray-600 text-xs transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
											href={f.portfolio}
											rel="noopener noreferrer"
											target="_blank"
										>
											<IconGlobe className="h-3.5 w-3.5" />
											Portfolio
										</a>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</section>

				{/* CTA */}
				<section className="bg-card">
					<div className="mx-auto max-w-5xl px-6 py-14 text-center">
						<h2 className="mb-3 font-extrabold text-2xl text-foreground sm:text-3xl">
							Ready to study smarter?
						</h2>
						<p className="mb-6 text-gray-500 text-sm">
							Browse notes by your semester and subject — find exactly what you
							need.
						</p>
						<Button size="sm"> Browse Notes</Button>
					</div>
				</section>
			</div>
		</Container>
	);
}
