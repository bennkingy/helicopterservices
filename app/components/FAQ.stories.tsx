import type { Meta, StoryObj } from "@storybook/nextjs";
import { FAQ } from "./FAQ";

const meta: Meta<typeof FAQ> = { title: "Content/FAQ", component: FAQ, parameters: { layout: "padded" } };
export default meta;
export const Default: StoryObj<typeof FAQ> = {};
export const WithTitle: StoryObj<typeof FAQ> = { args: { title: "Frequently asked questions" } };
