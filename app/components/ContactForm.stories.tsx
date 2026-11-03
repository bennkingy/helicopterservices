import type { Meta, StoryObj } from "@storybook/nextjs";
import ContactForm from "./ContactForm";

// Sending uses EmailJS and reCAPTCHA, which need real keys, so submitting
// won't work here. Use it to check layout, validation and autofill.
const services = {
	Training: [
		{ label: "Private Pilot Licence", slug: "private-pilot-licence" },
		{ label: "Commercial Pilot Licence", slug: "commercial-pilot-licence" },
	],
	Flights: [
		{ label: "Trial lessons", slug: "trial-lessons" },
		{ label: "London sightseeing tours", slug: "london-sightseeing-tours" },
	],
	Industry: [
		{ label: "Load lifting", slug: "load-lifting" },
		{ label: "Photography & filming", slug: "photography-filming" },
	],
};

const meta: Meta<typeof ContactForm> = {
	title: "Contact/ContactForm",
	component: ContactForm,
	args: { services },
	parameters: { layout: "padded" },
	decorators: [
		(Story) => (
			<div className="max-w-2xl">
				<Story />
			</div>
		),
	],
};
export default meta;
export const Default: StoryObj<typeof ContactForm> = {};
export const Phone: StoryObj<typeof ContactForm> = { globals: { viewport: { value: "mobile" } } };
