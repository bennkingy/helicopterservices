import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
	title: "UI kit/Button",
	component: Button,
	parameters: { layout: "padded" },
	args: { children: "Book a trial lesson" },
	argTypes: {
		variant: { control: "select", options: ["default", "destructive", "outline", "secondary", "ghost", "link"] },
		size: { control: "select", options: ["default", "sm", "lg", "icon"] },
	},
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};
export const AllVariants: Story = {
	render: (args) => (
		<div className="flex flex-wrap gap-3">
			{(["default", "destructive", "outline", "secondary", "ghost", "link"] as const).map((variant) => (
				<Button key={variant} {...args} variant={variant}>
					{variant}
				</Button>
			))}
		</div>
	),
};
export const SiteStyle: Story = {
	name: "As used on the site (orange, square)",
	args: { className: "rounded-none bg-brand-orange hover:bg-brand-dark-blue text-white" },
};
export const Disabled: Story = { args: { disabled: true } };
