import type { Meta, StoryObj } from "@storybook/nextjs";
import Breadcrumbs from "./Breadcrumbs";
import PromoPopupServer from "./PromoPopupServer";

const meta: Meta = { title: "Misc/Other components", parameters: { layout: "padded" } };
export default meta;

export const FleetBreadcrumbs: StoryObj = { render: () => <Breadcrumbs slug="R44" /> };



export const PromoPopupFromSanity: StoryObj = {
	name: "PromoPopupServer (popup loaded from the Sanity mock)",
	render: () => <PromoPopupServer />,
};
