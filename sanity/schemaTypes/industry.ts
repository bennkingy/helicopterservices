import { defineField, defineType } from "sanity";

// @ts-ignore
const shouldShow = (document) => {
	return document.conditionField === "show";
};

export default defineType({
	name: "industry",
	title: "Industry",
	type: "document",
	fields: [
		defineField({
			name: "isLandingPage",
			title: "Main page",
			type: "boolean",
			initialValue: false,
			description:
				"Indicates if this is the main landing page for the industry section.",
		}),
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description: "The main title of the industry page.",
			validation: (Rule) =>
				Rule.required()
					.min(1)
					.max(100)
					.warning("Titles should be between 1 and 100 characters."),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
			description: "The unique identifier for the page, used in URLs.",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "quoteMessage",
			title: "Quote Message",
			type: "string",
			description: "A message to go inside the quote.",
			validation: (Rule) =>
				Rule.max(50).warning("Quote message should be at most 40 characters."),
		}),
		defineField({
			name: "hero",
			type: "hero",
			hidden: ({ document }) => document?.isLandingPage !== true,
			description: "Hero section for the landing page.",
		}),
		defineField({
			name: "fleetItems",
			title: "Helicopters That Provide This Service",
			type: "array",
			of: [{ type: "reference", to: { type: "fleet" } }],
			description: "References to the helicopters that provide this service.",
		}),
		defineField({
			name: "pilot",
			title: "Pilot",
			type: "reference",
			to: [{ type: "pilots" }],
			description: "Reference to the lead pilot associated with this industry.",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "service",
			title: "Services",
			type: "array",
			of: [{ type: "service" }],
			hidden: ({ document }) => document?.isLandingPage !== true,
			description: "List of services provided, shown only on the landing page.",
		}),
		defineField({
			name: "mainImage",
			title: "Hero Image",
			type: "image",
			hidden: ({ document }) => document?.isLandingPage === true,
			options: { hotspot: true },
			description: "The main image for the industry page.",
			validation: (rule) =>
				rule.custom((currentValue, { document }) => {
					if (shouldShow(document) && currentValue === undefined)
						return "This is required.";
					return true;
				}),
		}),
		defineField({
			name: "body",
			title: "Content",
			type: "blockContent",
			description: "The main content of the industry page.",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "seoDescription",
			title: "SEO Description",
			type: "string",
			description: "Description for SEO purposes.",
			validation: (Rule) =>
				Rule.max(160).warning(
					"SEO Descriptions should be at most 160 characters.",
				),
		}),
		defineField({
			name: "seoTitle",
			title: "SEO Title",
			type: "string",
			description: "Title for SEO purposes.",
			validation: (Rule) =>
				Rule.max(60).warning("SEO Titles should be at most 60 characters."),
		}),
	],
	preview: {
		select: {
			title: "title",
			heroImage: "hero.image",
			mainImage: "mainImage",
		},
		prepare(selection) {
			return {
				title: selection.title,
				media: selection.heroImage || selection.mainImage,
			};
		},
	},
});
