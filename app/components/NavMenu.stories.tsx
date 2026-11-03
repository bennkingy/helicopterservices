import type { Meta, StoryObj } from "@storybook/nextjs";
import { navigation } from "../../.storybook/fixtures";
import { NavMenu } from "./NavMenu";

const meta: Meta<typeof NavMenu> = {
	title: "Site/Navbar/NavMenu",
	component: NavMenu,
	args: { menuData: { menuData: navigation } as any, onMobileOpen: () => {} } as any,
	parameters: { layout: "padded", docs: { description: { component: "Desktop mega-menu (hover a section). On phones it renders the MobileMenu." } } },
};
export default meta;
export const Default: StoryObj<typeof NavMenu> = {};
