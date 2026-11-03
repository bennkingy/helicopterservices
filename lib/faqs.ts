import { type Faq, faqDefaults } from "./faq-defaults";
import { client } from "./sanity";

export type { Faq };

// FAQs from Sanity (Settings > FAQs). Falls back to the built-in list while
// that field is empty, so the FAQ page and its Google FAQ data never go blank.
export async function getFaqs(): Promise<Faq[]> {
	try {
		const items = await client.fetch<Faq[] | null>(
			`*[_type == "settings" && !(_id in path("drafts.**"))][0].faqs[]{ question, answer }`,
			{},
			{ next: { revalidate: 60 } },
		);
		const valid = (items || []).filter((f) => f?.question?.trim() && f?.answer?.trim());
		return valid.length ? valid : faqDefaults;
	} catch (error) {
		console.error("Failed to load FAQs from Sanity", error);
		return faqDefaults;
	}
}

// Google FAQ rich-result data for the same list.
export const faqJsonLd = (faqs: Faq[]) => ({
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: faqs.map(({ question, answer }) => ({
		"@type": "Question",
		name: question,
		acceptedAnswer: { "@type": "Answer", text: answer },
	})),
});
