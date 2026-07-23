import { Container } from "~/components/container";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "~/components/ui/accordion";

const FAQS = [
	{
		id: "1",
		question: "Are the notes free to access?",
		answer:
			"Yes. Most notes on Atom Notes are completely free to read online. Premium resources may be introduced in the future.",
	},
	{
		id: "2",
		question: "Which courses are currently supported?",
		answer:
			"Currently, Atom Notes focuses on BCA (Bachelor of Computer Applications) notes, organized semester-wise and subject-wise.",
	},
	{
		id: "3",
		question: "Do I need to create an account?",
		answer:
			"You can browse notes without an account, but signing in lets you save your progress and access future personalized features.",
	},
	{
		id: "4",
		question: "Can I download notes as PDF?",
		answer:
			"Not yet. At the moment, notes are available in an optimized online reading experience. PDF downloads may be added in the future.",
	},
	{
		id: "5",
		question: "How often are new notes added?",
		answer:
			"We continuously update existing notes and add new subjects, chapters, and semesters to keep the content relevant.",
	},
];

const Faqs = () => {
	return (
		<Container className="mx-auto">
			<section className="flex w-full flex-col gap-8">
				<div className="flex items-center justify-center">
					<div className="flex flex-col gap-3">
						<h2 className="text-center font-bold text-3xl text-foreground sm:text-4xl">
							Frequently Asked Questions
						</h2>
						<p className="max-w-2xl text-center text-muted-foreground text-sm sm:text-base">
							Find answers to common questions about our platform, features, and
							services.
						</p>
					</div>
				</div>

				<Accordion className="mx-auto flex w-full max-w-4xl flex-col gap-4">
					{FAQS.map((faq) => (
						<AccordionItem
							className="rounded-2xl bg-card px-4 py-2"
							key={faq.id}
							value={faq.id}
						>
							<AccordionTrigger className="cursor-pointer text-left font-semibold text-base">
								{faq.question}
							</AccordionTrigger>
							<AccordionContent className="p-2 text-muted-foreground leading-7">
								{faq.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</section>
		</Container>
	);
};

export default Faqs;
