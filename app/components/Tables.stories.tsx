import type { Meta, StoryObj } from "@storybook/nextjs";
import { ComparisonTable } from "./ComparisonTable";
import TransferTimesTable from "./TransferTimesTable";
import TrainingMap from "./TrainingMap";

const helicopters = [
	{ id: "r22", title: "R22", engineType: "Single", capacity: 1, ifrcapable: false, cruiseSpeed: 96, base: "White Waltham", workType: { trainingHelicopter: true, charterHelicopter: false, aerialWorkHelicopter: false } },
	{ id: "r44", title: "R44", engineType: "Single", capacity: 3, ifrcapable: false, cruiseSpeed: 110, base: "White Waltham", workType: { trainingHelicopter: true, charterHelicopter: true, aerialWorkHelicopter: true } },
	{ id: "as355", title: "AS355", engineType: "Twin", capacity: 5, ifrcapable: true, cruiseSpeed: 120, base: "White Waltham", workType: { trainingHelicopter: true, charterHelicopter: true, aerialWorkHelicopter: true } },
];

const meta: Meta = { title: "Content/Tables and maps", parameters: { layout: "padded" } };
export default meta;

export const FleetComparison: StoryObj = { render: () => <ComparisonTable data={helicopters} /> };
export const AirportTransferTimes: StoryObj = { render: () => <TransferTimesTable /> };
export const TrainingPathway: StoryObj = { render: () => <TrainingMap /> };
export const TrainingPathwayPhone: StoryObj = { render: () => <TrainingMap />, globals: { viewport: { value: "mobile" } } };
