import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";
import Button from "./Button";
import CMSLink from "./CMSLink";
import Enquire from "./Enquire";
import TextLink from "./TextLink";

const meta: Meta = { title: "Content/Links and buttons", parameters: { layout: "padded" } };
export default meta;

export const ArrowButton: StoryObj = { render: () => <Button href="/enquire" /> };

export const EnquireLink: StoryObj = {
	render: () => (
		<div className="grid gap-6">
			<Enquire />
			<div className="bg-brand-dark-blue p-6">
				<Enquire textStyle="text-white" />
			</div>
		</div>
	),
};

export const Text: StoryObj = { render: () => <TextLink label="See full fleet" onClick={fn()} /> };

export const CmsLinks: StoryObj = {
	render: () => (
		<div className="grid gap-2">
			<CMSLink href="/flights/trial-lessons">Internal link (same tab)</CMSLink>
			<CMSLink href="https://www.tripadvisor.co.uk">External link (new tab)</CMSLink>
		</div>
	),
};
