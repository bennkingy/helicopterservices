import type { Meta, StoryObj } from "@storybook/nextjs";
import { expect, fn, userEvent, within } from "storybook/test";
import { navigation } from "../../.storybook/fixtures";
import MobileMenu from "./MobileMenu";

// The phone menu: a hamburger that opens a full-screen menu with sub-menus
// for Training, Industry, Flights, Fleet and About. Phone widths only.
const meta: Meta<typeof MobileMenu> = {
	title: "Site/Navbar/MobileMenu",
	component: MobileMenu,
	args: { menuData: { menuData: navigation }, onMobileOpen: fn() },
	globals: { viewport: { value: "mobile" } },
	parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof MobileMenu>;

export const Closed: Story = {};

export const Open: Story = {
	play: async ({ canvasElement }) => {
		await userEvent.click(within(canvasElement).getByRole("button", { name: "Open navigation menu" }));
		await expect(await within(document.body).findByText("Training")).toBeInTheDocument();
	},
};
