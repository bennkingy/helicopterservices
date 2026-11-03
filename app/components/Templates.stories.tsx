import type { Meta, StoryObj } from "@storybook/nextjs";
import { fleetAll, fleetR44, trialLessons } from "../../.storybook/fixtures";
import Template from "./Template";
import TemplateTwo from "./TemplateTwo";

// Whole page bodies, filled with real content from the fixtures.
const meta: Meta = {
	title: "Pages/Templates",
	parameters: { nextjs: { navigation: { pathname: "/flights/trial-lessons" } } },
};
export default meta;

export const FlightsPage: StoryObj = {
	name: "Template: flights page (trial lessons)",
	render: () => (
		<Template data={trialLessons} iconType="Flights" />
	),
};

export const FlightsPagePhone: StoryObj = {
	...FlightsPage,
	name: "Template: flights page (phone)",
	globals: { viewport: { value: "mobile" } },
};

export const FleetPage: StoryObj = {
	name: "TemplateTwo: fleet page (R44)",
	parameters: { nextjs: { navigation: { pathname: "/fleet/r44" } } },
	render: () => <TemplateTwo data={fleetR44 as any} helicopterData={fleetAll} />,
};
