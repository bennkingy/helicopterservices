import type { Meta, StoryObj } from "@storybook/nextjs";
import PromoPopup from "./PromoPopup";

const popup = {
	id: `storybook-${Date.now()}`, // new id each load, so it isn't remembered as dismissed
	startDate: "2020-01-01T00:00:00Z",
	endDate: "2099-01-01T00:00:00Z",
	showOn: "all" as const,
	link: "/flights/trial-lessons",
	ctaLabel: "Gift vouchers",
	ctaText: "Buy a trial lesson",
	delaySeconds: 0,
	image: { src: "/images/open-day-v2.png", alt: "Open day at White Waltham", width: 600, height: 600 },
};

const meta: Meta<typeof PromoPopup> = { title: "Site/PromoPopup", component: PromoPopup, args: { popups: [popup] } };
export default meta;
export const Default: StoryObj<typeof PromoPopup> = {};
export const NoButton: StoryObj<typeof PromoPopup> = { args: { popups: [{ ...popup, id: `${popup.id}-2`, ctaLabel: null, ctaText: null }] } };
