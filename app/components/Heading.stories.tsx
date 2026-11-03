import type { Meta, StoryObj } from "@storybook/nextjs";
import Heading from "./Heading";

const meta: Meta<typeof Heading> = {
	title: "Content/Heading",
	component: Heading,
	parameters: { layout: "padded" },
	args: {
		title: "From beginner to advanced, you're in expert hands",
		tag: "Training",
		iconType: "Training",
		titleStyles: "text-3xl sm:text-4xl",
	},
	argTypes: {
		iconType: { control: "select", options: ["Training", "Flights", "Industry", "Company"] },
		as: { control: "select", options: ["h1", "h2", "h3"] },
	},
};
export default meta;
type Story = StoryObj<typeof Heading>;

export const OnWhite: Story = {};
export const Centred: Story = {
	args: { center: true, tag: "Flights", iconType: "Flights", title: "For gifts, swift transfers and private charters" },
};
export const OnDarkBlue: Story = {
	args: { titleStyles: "text-3xl sm:text-4xl text-white" },
	decorators: [
		(Story) => (
			<div className="bg-brand-dark-blue p-10">
				<Story />
			</div>
		),
	],
};
