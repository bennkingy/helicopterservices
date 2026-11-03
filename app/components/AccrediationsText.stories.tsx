import type { Meta, StoryObj } from "@storybook/nextjs";
import AccrediationsText from "./AccrediationsText";

// The blue strip above the navbar. Hidden on the homepage and About page
// (their hero already says it), so these stories use another page's URL.
const meta: Meta<typeof AccrediationsText> = {
	title: "Site/Navbar/AccrediationsText",
	component: AccrediationsText,
	parameters: { nextjs: { navigation: { pathname: "/flights/trial-lessons" } } },
};
export default meta;
export const Default: StoryObj<typeof AccrediationsText> = {};
export const SmallPhone: StoryObj<typeof AccrediationsText> = { globals: { viewport: { value: "mobile" } } };
export const HiddenOnHomepage: StoryObj<typeof AccrediationsText> = {
	parameters: { nextjs: { navigation: { pathname: "/" } } },
};
