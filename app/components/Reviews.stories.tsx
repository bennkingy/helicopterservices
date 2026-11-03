import type { Meta, StoryObj } from "@storybook/nextjs";
import Reviews from "./Reviews";

const meta: Meta<typeof Reviews> = { title: "Homepage/Reviews", component: Reviews, args: { className: "py-20" } };
export default meta;
export const Default: StoryObj<typeof Reviews> = {};
export const Phone: StoryObj<typeof Reviews> = { globals: { viewport: { value: "mobile" } } };
