import type { Meta, StoryObj } from "@storybook/nextjs";
import ScrollTop from "./ScrollTop";

const meta: Meta<typeof ScrollTop> = {
	title: "Site/ScrollTop",
	component: ScrollTop,
	decorators: [(Story) => (<div style={{ height: "300vh", padding: 24 }}>Scroll down to see the button.<Story /></div>)],
};
export default meta;
export const Default: StoryObj<typeof ScrollTop> = {};
