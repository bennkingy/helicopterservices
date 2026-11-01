import type { Meta, StoryObj } from "@storybook/nextjs";
import OpenClosed from "./OpenClosed";

// Shows the live status for "now" in UK time. The rules are unit-tested in
// lib/opening-hours.test.ts (pnpm test:unit).
const meta: Meta<typeof OpenClosed> = {
	title: "Site/Navbar/OpenClosed",
	component: OpenClosed,
	parameters: { layout: "padded" },
};
export default meta;
export const HeaderStyle: StoryObj<typeof OpenClosed> = { args: { showPeriod: false } };
export const WithAmPm: StoryObj<typeof OpenClosed> = { args: { showPeriod: true } };
