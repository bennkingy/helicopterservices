import type { Meta, StoryObj } from "@storybook/nextjs";
import { MainServices } from "./MainServices";

const meta: Meta<typeof MainServices> = {
	title: "Homepage/MainServices",
	component: MainServices,
	decorators: [(Story) => (<div className="py-20 bg-brand-dark-blue"><div className="container"><Story /></div></div>)],
};
export default meta;
export const Default: StoryObj<typeof MainServices> = {};
export const Phone: StoryObj<typeof MainServices> = { globals: { viewport: { value: "mobile" } } };
