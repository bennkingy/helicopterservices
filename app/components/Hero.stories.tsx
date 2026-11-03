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
	args: { reviews: { rating: 4.9, count: 312, sourceUrl: "https://www.tripadvisor.co.uk" } },
};
export const AboutPage: Story = { args: { title: "About Helicopter<br/>Services", subtitle: undefined } };
export const Phone: Story = { globals: { viewport: { value: "mobile" } } };
