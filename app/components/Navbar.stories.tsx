import type { Meta, StoryObj } from "@storybook/nextjs";
import Navbar from "./Navbar";

const meta: Meta<typeof Navbar> = {
	title: "Site/Navbar",
	component: Navbar,
	parameters: { docs: { description: { component: "Async server component. Navigation comes from the Sanity mock (fixtures/navigation.json)." } } },
};
export default meta;
export const Desktop: StoryObj<typeof Navbar> = {};
export const Phone: StoryObj<typeof Navbar> = { globals: { viewport: { value: "mobile" } } };
