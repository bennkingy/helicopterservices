import type { Meta, StoryObj } from "@storybook/nextjs";
import { HANGAR_IMAGE, sanityImage, trialLessons } from "../../.storybook/fixtures";
import Header from "./Header";

// The page banner at the top of every inner page (training, flights, industry,
// fleet, about). Not the homepage: that uses the Hero video.
//
// Sanity: each page's "Hero" fields, or failing that its title and main image.
//   hero.heading  -> title     hero.tagline -> tag (else the section name)
//   hero.image    -> image     (else the page's Main image)
const img = (ref: string, alt: string) => sanityImage(ref, alt) as any;

const meta: Meta<typeof Header> = {
	title: "Site/Page banner (Header)",
	component: Header,
	args: { tag: "Flights", iconType: "Flights" },
	argTypes: { iconType: { control: "select", options: ["Training", "Flights", "Industry", "Company"] } },
};
export default meta;
type Story = StoryObj<typeof Header>;

export const TrialLessonsNow: Story = {
	name: "Flights: trial lessons (current photo, 1672×419)",
	args: { title: "Helicopter Trial Lessons & Gifts", image: (trialLessons as any).mainImage },
};

export const TrialLessonsHangar: Story = {
	name: "Flights: trial lessons (hangar photo, suggested)",
	args: {
		title: "Helicopter Trial Lessons & Gifts",
		image: img(HANGAR_IMAGE, "Robinson R22 and R44 helicopters in the hangar at White Waltham"),
	},
};

export const LondonTours: Story = {
	name: "Flights: London tours",
	args: {
		title: "London Sightseeing Tours",
		image: img("image-e9abd8e8d140c4496ef1429f2aaa375601473765-1680x419-jpg", "Twin Squirrel helicopter flying past the Canary Wharf skyline"),
	},
};

export const Training: Story = {
	name: "Training: night rating",
	args: {
		title: "Night Rating",
		tag: "Training",
		iconType: "Training",
		image: img("image-2d0ba939e97f3d4d687c3fb8c7685c0501dc8876-1680x419-jpg", "Helicopter cockpit instruments glowing during a night flight"),
	},
};

export const Industry: Story = {
	name: "Industry: load lifting",
	args: {
		title: "Load Lifting",
		tag: "Industry",
		iconType: "Industry",
		image: img("image-9c34dc7cc369bb54afd28ad4611f6ab89a74273b-1679x419-png", "Helicopter lifting an underslung load over the hills"),
	},
};

export const Filming: Story = {
	name: "Industry: photography & filming",
	args: {
		title: "Photography & Filming",
		tag: "Industry",
		iconType: "Industry",
		image: img("image-2c9262636f3315890615df07f01a56bc9c82768c-1680x419-jpg", "Helicopter filming a Spitfire on a grass airfield"),
	},
};

export const Company: Story = {
	name: "About: the hangar",
	args: {
		title: "The Hangar",
		tag: "About us",
		iconType: "Company",
		image: img("image-89f2367e26b21b6d32fc388f91fb4ea5eec6b895-2107x984-jpg", "Helicopters parked inside the Helicopter Services hangar at White Waltham"),
	},
};

export const LongTitle: Story = {
	name: "Edge case: long title",
	args: {
		title: "Flight Instructor Refresher Seminars and Revalidation Courses",
		tag: "Training",
		iconType: "Training",
		image: img("image-43f82e5118786418324cfa1c8de75e6e93bae80c-1680x419-jpg", "Instructor at the FNPT II helicopter simulator control station"),
	},
};

export const Phone: Story = {
	...TrialLessonsHangar,
	name: "Phone: trial lessons",
	globals: { viewport: { value: "mobile" } },
};
