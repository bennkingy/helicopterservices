import type { Metadata } from "next";
import ContactForm from "../components/ContactForm";

export const metadata: Metadata = {
	title: "Contact - Helicopter Services",
	description: "Helicopter Services",
};

export default async function Enquire() {
	return (
		<main className="container  pt-14 pb-20 overflow-x-hidden">
			<h1 className="text-5xl font-bold mb-10" data-testId="enquiryTitle">
				Enquire
			</h1>
			<ContactForm />
		</main>
	);
}
