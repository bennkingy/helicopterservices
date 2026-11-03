import type { Meta, StoryObj } from "@storybook/nextjs";
import { slides } from "../../.storybook/fixtures";
import Carousel from "./Carousel";

const meta: Meta<typeof Carousel> = {
	title: "Homepage/Carousel",
	component: Carousel,
	args: { slides },
	decorators: [(Story) => (<div className="py-10 bg-brand-light-grey"><div className="sm:container"><Story /></div></div>)],
};
export default meta;
export const Default: StoryObj<typeof Carousel> = {};
export const Phone: StoryObj<typeof Carousel> = { globals: { viewport: { value: "mobile" } } };
