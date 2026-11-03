import type { Meta, StoryObj } from "@storybook/nextjs";
import { HANGAR_IMAGE, R22_IMAGE, pilot, sanityImage, trialLessons } from "../../.storybook/fixtures";
import HelicopterCard from "./HelicopterCard";
import ServiceCard from "./ServiceCard";
import Team from "./Team";

// Cards link to other pages. They share the brand card look: white, shadow,
// 4px light-blue bottom border and a light-blue corner triangle with an arrow.
const meta: Meta = { title: "Cards/Cards", parameters: { layout: "padded" } };
export default meta;

const [r22, r44] = (trialLessons as any).fleetItems;
const img = (ref: string, alt: string) => sanityImage(ref, alt);

// ServiceCard is used on the Training, Flights and Industry landing pages.
// Sanity: each page's title, short description and main image.
export const ServiceCards: StoryObj = {
	name: "Service cards (one per section)",
	render: () => (
		<div className="grid gap-8 max-w-5xl">
			<ServiceCard
				heading="Private Pilot Licence"
				url="/training/private-pilot-licence"
				description="Learn to fly a helicopter for fun with the UK's most experienced instructors."
				category="Training"
				image={img("image-9d0854d6fa988d5b535c636676f44f8e8f2c10cd-1680x994-webp", "Private pilot flying a Robinson helicopter")}
			/>
			<ServiceCard
				heading="Helicopter Trial Lessons"
				url="/flights/trial-lessons"
				description="Discover the fun and manoeuvrability of a helicopter with a trial lesson from White Waltham."
				category="Flights"
				image={img(HANGAR_IMAGE, "Robinson helicopters in the hangar")}
			/>
			<ServiceCard
				heading="Load Lifting"
				url="/industry/load-lifting"
				description="Underslung loads to remote and hard-to-reach sites, planned and flown by specialists."
				category="Industry"
				image={img("image-9c34dc7cc369bb54afd28ad4611f6ab89a74273b-1679x419-png", "Helicopter lifting an underslung load")}
			/>
		</div>
	),
};

export const ServiceCardPhone: StoryObj = {
	...ServiceCards,
	name: "Service cards (phone)",
	globals: { viewport: { value: "mobile" } },
};

export const ServiceCardNoImage: StoryObj = {
	name: "Service card without an image",
	render: () => (
		<div className="max-w-4xl">
			<ServiceCard
				heading="Airport Transfers"
				url="/flights/airport-transfers"
				description="Heathrow to central London in minutes."
				category="Flights"
			/>
		</div>
	),
};

// HelicopterCard is used on the Fleet page and in page sidebars.
// Sanity: each Fleet document's title and "Gallery single" image.
export const Helicopter: StoryObj = {
	name: "Helicopter cards (fleet page)",
	render: () => (
		<div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
			<HelicopterCard helicopter={r22} url="/fleet/" type="Single engine" />
			<HelicopterCard helicopter={r44} url="/fleet/" type="Single engine" />
		</div>
	),
};

export const HelicopterCompact: StoryObj = {
	name: "Helicopter cards (compact, page sidebar)",
	render: () => (
		<div className="max-w-[500px]">
			<HelicopterCard helicopter={r22} url="/fleet/" />
			<HelicopterCard helicopter={r44} url="/fleet/" />
		</div>
	),
};

// Team is used on About > Meet the team. Sanity: Pilot documents.
export const TeamMembers: StoryObj = {
	name: "Team (meet the team)",
	render: () => (
		<div className="grid sm:grid-cols-3 gap-10">
			{/* @ts-ignore Team takes { pilotData } */}
			<Team
				pilotData={[
					{ ...pilot, slug: { current: "pilot-1" } },
					{ ...pilot, name: "Captain Leon Smith", role: "Head of Training and Chief Pilot", slug: { current: "pilot-2" } },
					{ ...pilot, name: "Sample Instructor", role: "Flight Instructor", slug: { current: "pilot-3" }, mainImage: sanityImage(R22_IMAGE) },
				]}
			/>
		</div>
	),
};
