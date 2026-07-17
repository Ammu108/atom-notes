import { Container } from "~/components/container";
import ContactForm from "./contact-forn";

const Contact = () => {
	return (
		<Container className="mx-auto">
			<div className="w-full">
				{/* ── HERO SECTION ── */}
				<section className="mx-auto max-w-6xl px-4 pt-24 pb-16">
					<div className="text-center">
						<div>
							<h1 className="font-bold font-playfair text-4xl text-foreground leading-tight sm:text-6xl">
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
						<ContactForm />
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
									className="group rounded-2xl border border-border/50 bg-card p-4"
									key={title}
								>
									<div className="mb-3 text-3xl">{icon}</div>
									<h3 className="mb-2 font-semibold text-foreground">
										{title}
									</h3>
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
								className="group rounded-2xl border border-border/50 bg-card p-4"
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
			</div>
		</Container>
	);
};

export default Contact;
