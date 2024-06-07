import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const link = defineType({
	name: "link",
	title: "Link",
	type: "object",
	icon: CogIcon,
	fields: [
		defineField({
			name: "title",
			title: "Menu item title",
			type: "string",
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
		}),
		defineField({
			name: "subLinks",
			type: "array",
			of: [{ type: "link" }],
			title: "Sub-Links",
		}),
	],
});

export const dayHours = defineType({
	name: "dayHours",
	title: "Day Hours",
	type: "object",
	fields: [
		defineField({
			name: "open",
			title: "Opening Time",
			type: "string",
			description: "Opening time in HH:MM format",
		}),
		defineField({
			name: "close",
			title: "Closing Time",
			type: "string",
			description: "Closing time in HH:MM format",
		}),
	],
});

export default defineType({
	name: "settings",
	title: "Settings",
	type: "document",
	fields: [
		defineField({
			name: "logoLightMode",
			title: "Logo - Light Mode",
			type: "image",
			description: "Upload the logo for light mode display settings",
		}),
		defineField({
			name: "logoDarkMode",
			title: "Logo - Dark Mode",
			type: "image",
			description: "Upload the logo for dark mode display settings",
		}),
		defineField({
			name: "navigationMenu",
			title: "Navigation Menu",
			type: "array",
			of: [{ type: "link" }],
			description: "Define the navigation headers and their respective links",
		}),
		defineField({
			name: "openingHours",
			title: "Opening Hours",
			type: "object",
			fields: [
				defineField({
					name: "generalEnquiries",
					title: "General Enquiries",
					type: "array",
					of: [{ type: "dayHours" }],
					description: "Opening hours for general enquiries",
				}),
				defineField({
					name: "charterEnquiries",
					title: "Charter Enquiries",
					type: "array",
					of: [{ type: "dayHours" }],
					description: "Opening hours for charter enquiries",
				}),
			],
		}),
	],

	preview: {
		select: {
			title: "seoTitle",
			media: "logoLightMode",
		},
		prepare(selection) {
			const { title, media } = selection;
			return {
				title: title || "Settings",
				media: media,
			};
		},
	},
});
