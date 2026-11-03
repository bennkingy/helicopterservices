import type { Meta, StoryObj } from "@storybook/nextjs";
import Approvals from "./Approvals";

// Only renders on training pages (it reads the URL).
const meta: Meta<typeof Approvals> = {
	title: "Content/Approvals",
	component: Approvals,
	parameters: { layout: "padded", nextjs: { navigation: { pathname: "/training/private-pilot-licence" } } },
};
export default meta;
export const OnTrainingPage: StoryObj<typeof Approvals> = {};
