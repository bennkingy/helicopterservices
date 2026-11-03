import type { Meta, StoryObj } from "@storybook/nextjs";
import IconsHelper from "./IconsHelper";
import StatusIcon from "./StatusIcon";

const meta: Meta = { title: "Content/Icons", parameters: { layout: "padded" } };
export default meta;

const types = ["Training", "Flights", "Industry", "Company"] as const;
const colours = ["Blue", "Dark", "White"] as const;

export const SectionIcons: StoryObj = {
	render: () => (
		<div className="grid gap-4">
			{colours.map((colour) => (
				<div key={colour} className={`flex gap-6 p-4 ${colour === "White" ? "bg-brand-dark-blue" : ""}`}>
					{types.map((type) => (
						<IconsHelper key={type} iconType={type} iconColor={colour} iconSize={32} />
					))}
				</div>
			))}
		</div>
	),
};


export const Status: StoryObj = {
	render: () => (
		<div className="flex gap-6 items-center">
			<span className="flex items-center gap-2">
				<StatusIcon status /> Yes
			</span>
			<span className="flex items-center gap-2">
				<StatusIcon status={false} /> No
			</span>
		</div>
	),
};
