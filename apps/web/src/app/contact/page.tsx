"use client";

import { Button, Input, Label } from "@repo/ui";
import { useState } from "react";

const Contact = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		subject: "",
		message: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<
		"idle" | "success" | "error"
	>("idle");

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			// Simulate form submission
			await new Promise((resolve) => setTimeout(resolve, 1500));
			setSubmitStatus("success");
			setFormData({
				name: "",
				email: "",
				phone: "",
				subject: "",
				message: "",
			});

			setTimeout(() => setSubmitStatus("idle"), 3000);
		} catch {
			setSubmitStatus("error");
			setTimeout(() => setSubmitStatus("idle"), 3000);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<main>
			{/* ── HERO SECTION ── */}
			<section className="mx-auto max-w-6xl px-4 pt-24 pb-16">
				<div className="space-y-6 text-center">
					<div>
						<h1 className="font-bold font-playfair text-5xl text-foreground leading-tight sm:text-6xl">
							We'd Love to <span className="text-primary">Hear From You</span>
						</h1>
					</div>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
						Have questions or need assistance? Our dedicated support team is
						here to help. Reach out to us today and we'll get back to you as
						soon as possible.
					</p>
				</div>
			</section>

			{/* ── MAIN CONTENT ── */}
			<section className="mx-auto max-w-6xl px-4 pb-20">
				<div className="grid items-center justify-center gap-12 lg:grid-cols-3">
					{/* ── CONTACT FORM ── */}
					<div className="animate-fadeUp-1 lg:col-span-2">
						<div className="rounded-2xl border border-border/50 bg-card p-8">
							<h2 className="mb-8 font-bold font-playfair text-2xl text-foreground">
								Send us a Message
							</h2>

							<form className="space-y-6" onSubmit={handleSubmit}>
								<div className="grid gap-4 sm:grid-cols-2">
									<div className="space-y-2">
										<Label htmlFor="name">Full Name</Label>
										<Input
											id="name"
											name="name"
											onChange={handleChange}
											placeholder="John Doe"
											required
											type="text"
											value={formData.name}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="email">Email Address</Label>
										<Input
											id="email"
											name="email"
											onChange={handleChange}
											placeholder="john@example.com"
											required
											type="email"
											value={formData.email}
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="phone">Phone Number</Label>
									<Input
										id="phone"
										name="phone"
										onChange={handleChange}
										placeholder="+1 (555) 000-0000"
										type="tel"
										value={formData.phone}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="subject">Subject</Label>
									<Input
										id="subject"
										name="subject"
										onChange={handleChange}
										placeholder="How can we help?"
										required
										type="text"
										value={formData.subject}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="message">Message</Label>
									<textarea
										className="min-h-32 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-base outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
										id="message"
										name="message"
										onChange={handleChange}
										placeholder="Tell us more about your inquiry..."
										required
										value={formData.message}
									/>
								</div>

								{submitStatus === "success" && (
									<div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-green-400 text-sm">
										✓ Message sent successfully! We'll get back to you soon.
									</div>
								)}

								{submitStatus === "error" && (
									<div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400 text-sm">
										✗ Failed to send message. Please try again.
									</div>
								)}

								<Button
									className="w-full"
									disabled={isSubmitting}
									size="lg"
									type="submit"
									variant="primary"
								>
									{isSubmitting ? "Sending..." : "Send Message"}
								</Button>
							</form>
						</div>
					</div>

					{/* ── CONTACT INFO ── */}
					<div className="animate-fadeUp-2 space-y-6">
						{/* Info Cards */}
						{[
							{
								icon: "📍",
								title: "Location",
								content: "123 Medical Street, Health City, HC 12345",
							},
							{
								icon: "📞",
								title: "Phone",
								content: "+1 (555) 123-4567",
							},
							{
								icon: "🕐",
								title: "Hours",
								content: "24/7 Available",
							},
						].map(({ icon, title, content }) => (
							<div
								className="group rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-accent hover:bg-secondary/50"
								key={title}
							>
								<div className="mb-3 text-3xl">{icon}</div>
								<h3 className="mb-2 font-semibold text-foreground">{title}</h3>
								<p className="text-muted-foreground text-sm leading-relaxed">
									{content}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── FAQ SECTION ── */}
			<section className="mx-auto max-w-6xl px-4 pb-20">
				<div className="mb-16 text-center">
					<h2 className="mb-4 font-bold font-playfair text-4xl text-foreground">
						Frequently Asked Questions
					</h2>
					<p className="mx-auto max-w-2xl text-muted-foreground">
						Find answers to common questions about our services
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-2">
					{[
						{
							question: "What is your response time?",
							answer:
								"We aim to respond to all inquiries within 24 hours. For urgent matters, please call our support line.",
						},
						{
							question: "Do you provide emergency services?",
							answer:
								"Yes, we offer 24/7 emergency services. Call our emergency hotline for immediate assistance.",
						},
						{
							question: "How do I book an appointment?",
							answer:
								"You can book an appointment through our website, mobile app, or by calling our support team directly.",
						},
						{
							question: "What payment methods do you accept?",
							answer:
								"We accept all major credit cards, debit cards, digital wallets, and health insurance plans.",
						},
					].map(({ question, answer }) => (
						<div
							className="group rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-accent hover:bg-secondary/50"
							key={question}
						>
							<h3 className="mb-3 font-semibold text-foreground text-lg">
								{question}
							</h3>
							<p className="text-muted-foreground text-sm leading-relaxed">
								{answer}
							</p>
						</div>
					))}
				</div>
			</section>
		</main>
	);
};

export default Contact;
