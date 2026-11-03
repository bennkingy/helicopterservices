import type { Meta, StoryObj } from "@storybook/nextjs";
import Hero from "./Hero";

const meta: Meta<typeof Hero> = {
	title: "Site/Hero",
	component: Hero,
	args: {
		title: "Helicopter Training, Tours<br/>& Charter from White Waltham",
		subtitle: "Exceeding exacting industry standards since 1998.",
		height: "h-[80vh]",
	},
};
export default meta;
type Story = StoryObj<typeof Hero>;

export const Homepage: Story = {};
export const WithReviewScore: Story = {
	args: {
		reviews: {
			stars: [
				{ source: "Tripadvisor", rating: 4.9, count: 9, sourceUrl: "https://www.tripadvisor.co.uk" },
				{ source: "Google", rating: 4.6, count: 28 },
			],
			facebook: { percent: 100, count: 15, sourceUrl: "https://www.facebook.com/heliservicesuk/reviews" },
		},
	},
};
export const AboutPage: Story = { args: { title: "About Helicopter<br/>Services", subtitle: undefined } };
export const Phone: Story = { globals: { viewport: { value: "mobile" } } };
