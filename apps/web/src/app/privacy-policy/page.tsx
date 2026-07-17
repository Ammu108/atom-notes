const PrivacyPolicy = () => {
	const sections = [
		{
			id: "introduction",
			title: "Introduction",
			content:
				"At Atom Notes, we respect your privacy. This Privacy Policy explains what information we collect, how we use it, and how we protect it when you use our website and services.",
		},
		{
			id: "information",
			title: "Information We Collect",
			subsections: [
				{
					subtitle: "Account Information",
					text: "When you create an account, we may collect your name, email address, and other basic profile information.",
				},
				{
					subtitle: "Usage Information",
					text: "We automatically collect information such as your browser type, device information, IP address, and how you interact with our platform to improve your experience.",
				},
				{
					subtitle: "Payment Information",
					text: "If you purchase premium content, payments are processed securely through third-party payment providers. We do not store your complete payment details.",
				},
			],
		},
		{
			id: "usage",
			title: "How We Use Your Information",
			subsections: [
				{
					subtitle: "Provide Our Services",
					text: "To create your account, give you access to notes, manage purchases, and maintain the platform.",
				},
				{
					subtitle: "Improve User Experience",
					text: "We analyze usage patterns to improve website performance, features, and overall user experience.",
				},
				{
					subtitle: "Communication",
					text: "We may send important account updates, purchase confirmations, and support-related communications.",
				},
			],
		},
		{
			id: "cookies",
			title: "Cookies",
			content:
				"We use cookies and similar technologies to keep you signed in, remember your preferences, and improve the functionality of our website.",
		},
		{
			id: "security",
			title: "Data Security",
			content:
				"We use industry-standard security measures to protect your personal information. While no online platform can guarantee absolute security, we continuously work to safeguard your data.",
		},
		{
			id: "third-party",
			title: "Third-Party Services",
			content:
				"We may use trusted third-party services for authentication, payment processing, analytics, cloud storage, and other essential features. These providers have their own privacy policies governing the information they collect.",
		},
		{
			id: "rights",
			title: "Your Rights",
			content:
				"You may request access to, correction of, or deletion of your personal information by contacting us. You may also unsubscribe from promotional emails at any time.",
		},
		{
			id: "changes",
			title: "Changes to This Policy",
			content:
				"We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.",
		},
	];

	return (
		<main className="min-h-screen bg-background">
			{/* Hero */}
			<section className="border-border/30 border-b bg-linear-to-b from-primary/5 to-background px-6 py-16 pt-24 text-center">
				<div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-3">
					<h1 className="font-bold font-playfair text-4xl text-foreground sm:text-5xl md:text-6xl">
						Privacy Policy
					</h1>

					<p className="text-lg text-muted-foreground md:px-24">
						Your privacy matters to us. Learn how Atom Notes collects, uses, and
						protects your information.
					</p>

					<p className="text-muted-foreground/70 text-sm">
						Last updated: July 18, 2026
					</p>
				</div>
			</section>

			<div className="mx-auto max-w-4xl px-4 py-12">
				<div className="space-y-8">
					{sections.map((section) => (
						<section className="space-y-2" id={section.id} key={section.id}>
							<h2 className="font-bold font-playfair text-foreground text-xl md:text-2xl">
								{section.title}
							</h2>

							{section.content && (
								<p className="text-muted-foreground leading-8">
									{section.content}
								</p>
							)}

							{section.subsections && (
								<div className="space-y-5">
									{section.subsections.map((item) => (
										<div
											className="rounded-xl border border-border/50 bg-card/40 p-4"
											key={item.subtitle}
										>
											<h3 className="mb-2 font-semibold text-lg">
												{item.subtitle}
											</h3>

											<p className="text-muted-foreground leading-7">
												{item.text}
											</p>
										</div>
									))}
								</div>
							)}
						</section>
					))}

					{/* Contact */}
					<section className="rounded-2xl border border-border/50 bg-primary/5 p-8">
						<h2 className="mb-3 font-bold font-playfair text-2xl">
							Contact Us
						</h2>

						<p className="mb-6 text-muted-foreground">
							If you have any questions regarding this Privacy Policy or how we
							handle your information, feel free to contact us.
						</p>

						<div>
							<p className="font-semibold">Email</p>
							<a
								className="text-primary hover:underline"
								href="mailto:support@atomnotes.in"
							>
								support@atomnotes.in
							</a>
						</div>
					</section>
				</div>
			</div>
		</main>
	);
};

export default PrivacyPolicy;
