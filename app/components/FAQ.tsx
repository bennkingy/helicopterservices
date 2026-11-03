import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

import { type Faq, faqDefaults } from "@/lib/faq-defaults";

// Kept for older imports; prefer getFaqs() from lib/faqs.ts.
export const FAQList = faqDefaults;


type props = {
	className?: string; // e.g. 'py-5'
	title?: string; // optional heading above the questions
	items?: Faq[]; // from getFaqs() (Sanity, with built-in fallback)
};

export const FAQ = ({ className, title = "", items = faqDefaults }: props) => {
	return (
		<section className={className}>
			{title ? (
				<h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
			) : null}
			<Accordion type="single" collapsible className="w-full AccordionRoot">
				{items.map(({ question, answer }, index) => (
					<AccordionItem key={question} value={`item-${index + 1}`}>
						<AccordionTrigger className="text-left">
							{question}
						</AccordionTrigger>

						<AccordionContent forceMount>{answer}</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</section>
	);
};
