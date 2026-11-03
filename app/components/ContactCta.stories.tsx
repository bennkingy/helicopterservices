import type { Meta, StoryObj } from "@storybook/nextjs";
import { pilot } from "../../.storybook/fixtures";
import ContactCta from "./ContactCta";
import GetInTouch from "./GetInTouch";
import GetinTouchSmall from "./GetinTouchSmall";

const meta: Meta<typeof ContactCta> = {
	title: "Contact/Contact blocks",
	component: ContactCta,
	parameters: { layout: "padded" },
	args: { pilot, service: "a trial lesson" },
};
export default meta;

const narrow = (Story: any) => (
	<div className="max-w-sm mt-16">
		<Story />
	</div>
);

export const ContactCtaWithPilot: StoryObj<typeof ContactCta> = { decorators: [narrow] };
export const ContactCtaDefaultPilot: StoryObj<typeof ContactCta> = { args: { pilot: undefined }, decorators: [narrow] };
export const GetInTouchSmall: StoryObj = { render: () => <GetinTouchSmall />, decorators: [narrow] };
export const GetInTouchBlock: StoryObj = { render: () => <GetInTouch /> };
