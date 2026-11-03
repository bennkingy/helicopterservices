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

// One day in Settings > Opening hours. Times are UK time, 24-hour "HH:MM".
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
const timeField = (name: "open" | "close", title: string) =>
	defineField({
		name,
		title,
		type: "string",
		description: 'UK time, 24-hour, e.g. "08:30" or "17:00".',
		hidden: ({ parent }: any) => parent?.status === "closed",
		validation: (Rule) =>
			Rule.custom((value: string | undefined, ctx: any) => {
				if (ctx.parent?.status === "closed") return true;
				if (!value) return "Required unless the day is closed";
				if (!TIME.test(value.trim())) return 'Use 24-hour HH:MM, e.g. "08:30"';
				if (name === "close" && TIME.test(ctx.parent?.open ?? "") && value.trim() <= ctx.parent.open.trim()) {
					return "Must be after the opening time";
				}
				return true;
			}),
	});

export const openingDay = defineType({
	name: "openingDay",
	title: "Opening day",
	type: "object",
	options: { columns: 3 },
	fields: [
		defineField({
			name: "status",
			title: "Status",
			type: "string",
			options: {
				list: [
					{ title: "Open", value: "open" },
					{ title: "By appointment", value: "appointment" },
					{ title: "Closed", value: "closed" },
				],
				layout: "dropdown",
			},
			initialValue: "open",
			validation: (Rule) => Rule.required(),
		}),
		timeField("open", "Opens"),
		timeField("close", "Closes"),
	],
});

export const faq = defineType({
	name: "faq",
	title: "FAQ",
	type: "object",
	fields: [
		defineField({
			name: "question",
			title: "Question",
			type: "string",
			description: "The frequently asked question",
		}),
		defineField({
			name: "answer",
			title: "Answer",
			type: "text",
			description: "The answer to the frequently asked question",
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
		// defineField({
		// 	name: "navigationMenu",
		// 	title: "Navigation Menu",
		// 	type: "array",
		// 	of: [{ type: "link" }],
		// 	description: "Define the navigation headers and their respective links",
		// }),
		defineField({
			name: "officeHours",
			title: "Opening hours",
			type: "object",
			description:
				'Shown in the header ("Open today"), the contact boxes and given to Google. UK time. "By appointment" days show as by appointment, and are not given to Google. Fill in every day: until all seven are filled in correctly, the site shows its built-in hours.',
			fields: (["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const).map((day) =>
				defineField({ name: day, title: day[0].toUpperCase() + day.slice(1), type: "openingDay" }),
			),
		}),
		defineField({
			name: "closedDates",
			title: "Closed dates",
			type: "array",
			of: [{ type: "date" }],
			description:
				"Days the office is shut, e.g. bank holidays. The header won't say \"Open today\" on these days, and Google is told you're closed. Christmas Day and New Year's Day are always closed and don't need adding.",
		}),
		defineField({
			name: "openingHours",
			title: "Opening Hours (old)",
			type: "object",
			// Old, unused format (no day names, "By Appointment" typed as a time).
			// Replaced by "officeHours" above. Hidden; kept so the old data isn't flagged.
			hidden: true,
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
		defineField({
			name: "faqs",
			title: "FAQs",
			type: "array",
			of: [{ type: "faq" }],
			description:
				"Shown on the FAQs page and given to Google as FAQ results. While this list is empty the site shows its built-in questions.",
		}),
		defineField({
			name: "reviewRating",
			title: "Tripadvisor rating",
			type: "number",
			description:
				"Your average Tripadvisor score out of 5, e.g. 4.9. Shown on the homepage (not given to Google: it doesn't allow review stars for reviews from other sites). Leave empty to hide.",
			validation: (rule) => rule.min(1).max(5),
		}),
		defineField({
			name: "reviewCount",
			title: "Number of Tripadvisor reviews",
			type: "number",
			description: "How many reviews the Tripadvisor rating is based on. Leave empty to hide.",
			validation: (rule) => rule.min(1).integer(),
		}),
		defineField({
			name: "reviewSourceUrl",
			title: "Tripadvisor link",
			type: "url",
			description: "Your Tripadvisor page. Leave empty to use the built-in link.",
		}),
		defineField({
			name: "googleReviewRating",
			title: "Google rating",
			type: "number",
			description: "Your average Google score out of 5, e.g. 4.6. Shown on the homepage. Leave empty to hide.",
			validation: (rule) => rule.min(1).max(5),
		}),
		defineField({
			name: "googleReviewCount",
			title: "Number of Google reviews",
			type: "number",
			description: "How many reviews the Google rating is based on. Leave empty to hide.",
			validation: (rule) => rule.min(1).integer(),
		}),
		defineField({
			name: "googleReviewUrl",
			title: "Google reviews link",
			type: "url",
			description: "Optional link to your Google reviews. Without it the word Google isn't a link.",
		}),
		defineField({
			name: "facebookRecommendPercent",
			title: "Facebook: % who recommend",
			type: "number",
			description: "From your Facebook page, e.g. 100 for \"100% recommend\". Shown on the homepage. Leave empty to hide.",
			validation: (rule) => rule.min(0).max(100).integer(),
		}),
		defineField({
			name: "facebookReviewCount",
			title: "Number of Facebook reviews",
			type: "number",
			description: "How many reviews the Facebook figure is based on. Leave empty to hide.",
			validation: (rule) => rule.min(1).integer(),
		}),
		defineField({
			name: "facebookReviewUrl",
			title: "Facebook reviews link",
			type: "url",
			description: "Leave empty to use facebook.com/heliservicesuk/reviews.",
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
