import type { Meta, StoryObj } from "@storybook/nextjs";
import { Checkbox } from "./checkbox";
import { Input } from "./input";
import { Label } from "./label";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Textarea } from "./textarea";

const meta: Meta = { title: "UI kit/Form controls", parameters: { layout: "padded" } };
export default meta;

export const TextFields: StoryObj = {
	render: () => (
		<div className="grid gap-4 max-w-sm">
			<div className="grid gap-1.5">
				<Label htmlFor="sb-name">Name</Label>
				<Input id="sb-name" type="text" autoComplete="name" placeholder="Please enter your name" />
			</div>
			<div className="grid gap-1.5">
				<Label htmlFor="sb-email">Email</Label>
				<Input id="sb-email" type="email" autoComplete="email" />
			</div>
			<div className="grid gap-1.5">
				<Label htmlFor="sb-disabled">Disabled</Label>
				<Input id="sb-disabled" disabled value="Can't edit this" readOnly />
			</div>
			<div className="grid gap-1.5">
				<Label htmlFor="sb-msg">Message</Label>
				<Textarea id="sb-msg" rows={4} />
			</div>
		</div>
	),
};

export const Choices: StoryObj = {
	render: () => (
		<div className="grid gap-6 max-w-sm">
			<label className="flex items-center gap-2 text-sm">
				<Checkbox id="sb-terms" /> I agree to the terms and conditions
			</label>
			<RadioGroup defaultValue="training" aria-label="Requirement">
				{["Training", "Flights", "Industry"].map((option) => (
					<label key={option} className="flex items-center gap-2 text-sm">
						<RadioGroupItem value={option.toLowerCase()} /> {option}
					</label>
				))}
			</RadioGroup>
			<Select>
				<SelectTrigger aria-label="Service">
					<SelectValue placeholder="Choose a service" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="ppl">Private Pilot Licence</SelectItem>
					<SelectItem value="cpl">Commercial Pilot Licence</SelectItem>
					<SelectItem value="trial">Trial lesson</SelectItem>
				</SelectContent>
			</Select>
		</div>
	),
};
