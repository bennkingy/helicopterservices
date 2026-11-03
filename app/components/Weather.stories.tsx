import type { Meta, StoryObj } from "@storybook/nextjs";
import Weather from "./Weather";

// Live weather for White Waltham, shown in the footer.
// OpenWeatherMap is stubbed for every story in .storybook/preview.tsx.
const meta: Meta<typeof Weather> = {
	title: "Site/Footer/Weather",
	component: Weather,
	parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Weather>;

// As it sits in the footer: on the navy band, beside the links.
const inFooter = (Story: () => JSX.Element) => (
	<div className="bg-brand-dark-blue border-t-4 border-brand-light-blue py-16 px-8">
		<div className="container mx-auto flex justify-end">
			<Story />
		</div>
	</div>
);

export const Default: Story = {};

export const Desktop: Story = {
	name: "Desktop (in the footer)",
	decorators: [inFooter],
	parameters: { layout: "fullscreen" },
	globals: { viewport: { value: "desktop" } },
};

export const Phone: Story = {
	name: "Phone (in the footer)",
	decorators: [inFooter],
	parameters: { layout: "fullscreen" },
	globals: { viewport: { value: "mobile" } },
};

export const OtherAirfield: Story = {
	name: "Another airfield (Denham)",
	args: { airport: "Denham Aerodrome", lat: 51.588, lon: -0.513 },
};
