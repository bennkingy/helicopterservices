import type { Meta, StoryObj } from "@storybook/nextjs";
import { navigation } from "../../.storybook/fixtures";
import NavbarHeader from "./NavBarHeader";

const meta: Meta<typeof NavbarHeader> = {
	title: "Site/Navbar/NavBarHeader",
	component: NavbarHeader,
	args: { menuData: navigation } as any,
};
export default meta;
export const Desktop: StoryObj<typeof NavbarHeader> = {};
export const OnAPage: StoryObj<typeof NavbarHeader> = { parameters: { nextjs: { navigation: { pathname: "/flights/trial-lessons" } } } };
export const Phone: StoryObj<typeof NavbarHeader> = { globals: { viewport: { value: "mobile" } } };
