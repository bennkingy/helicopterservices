import { BellIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { imageWithAlt } from "./fields";

// A full-screen advert that pops up once per visitor between two dates.
// To reuse one, duplicate it (or edit it) and set new dates.
export default defineType({
	name: "promoPopup",
	title: "Popup advert",
	type: "document",
	icon: BellIcon,
	fields: [
		defineField({
			name: "title",
			title: "Name",
			type: "string",
			description: "For finding it in the Studio. Not shown on the site.",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "enabled",
			title: "Switched on",
			type: "boolean",
			initialValue: true,
			description:
				"Turn off to hide the popup straight away, whatever the dates say.",
		}),
		defineField({
			name: "startDate",
			title: "Show from",
			type: "datetime",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "endDate",
			title: "Show until",
			type: "datetime",
			validation: (Rule) =>
				Rule.required().custom((end, context) => {
					const start = (context.document as { startDate?: string })
						?.startDate;
					return start && end && end <= start
						? "The end must be after the start."
						: true;
				}),
		}),
		defineField({
			name: "showOn",
			title: "Show on",
			type: "string",
			initialValue: "homepage",
			options: {
				list: [
					{ title: "Homepage only", value: "homepage" },
					{ title: "Every page", value: "all" },
				],
				layout: "radio",
			},
		}),
		{
			...imageWithAlt(
				"image",
				"Image",
				"The advert itself. A portrait image around 800 × 1000 works best.",
			),
			validation: (Rule: any) => Rule.required(),
		},
		defineField({
			name: "link",
			title: "Link",
			type: "url",
			description:
				"Where clicking the advert goes. Can be a web address, a page such as /enquire, or mailto:someone@helicopterservices.co.uk.",
			validation: (Rule) =>
				Rule.uri({
					allowRelative: true,
					scheme: ["http", "https", "mailto", "tel"],
				}),
		}),
		defineField({
			name: "ctaLabel",
			title: "Button heading",
			type: "string",
			description: "Small heading in the bar under the image, e.g. Register your place.",
		}),
		defineField({
			name: "ctaText",
			title: "Button text",
			type: "string",
			description: "Main text in the bar, e.g. an email address or Book now.",
		}),
		defineField({
			name: "delaySeconds",
			title: "Delay before showing (seconds)",
			type: "number",
			initialValue: 4,
			validation: (Rule) => Rule.min(0).max(60),
		}),
	],
	orderings: [
		{
			title: "Show from, newest first",
			name: "startDateDesc",
			by: [{ field: "startDate", direction: "desc" }],
		},
	],
	preview: {
		select: {
			title: "title",
			start: "startDate",
			end: "endDate",
			enabled: "enabled",
			media: "image",
		},
		prepare({ title, start, end, enabled, media }) {
			const day = (value?: string) =>
				value ? new Date(value).toLocaleDateString("en-GB") : "?";
			return {
				title,
				subtitle: `${enabled === false ? "Off · " : ""}${day(start)} to ${day(end)}`,
				media,
			};
		},
	},
});
