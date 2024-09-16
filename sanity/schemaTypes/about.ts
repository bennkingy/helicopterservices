import { defineField, defineType } from "sanity";

export default defineType({
	name: "about",
	title: "About",
	type: "document",
	fields: [
		// Other fields remain the same
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description: "The main title of the about page.",
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
			name: "isLandingPage",
			title: "Main page",
			type: "boolean",
			initialValue: false,
			description: "Indicates if this is the main about us page.",
		}),
		defineField({
			name: "quoteMessage",
			title: "Quote Message",
			type: "string",
			description: "A message to go inside the quote.",
			validation: (Rule) =>
				Rule.max(70).warning("Quote message should be at most 70 characters."),
			hidden: ({ document }) => document?.isLandingPage === true,
		}),
		defineField({
			name: "mainImage",
			title: "Hero Image",
			type: "image",
			options: { hotspot: true },
			description: "Main image for the about page.",
			hidden: ({ document }) => document?.isLandingPage === true,
		}),
		defineField({
			name: "hero",
			type: "hero",
			description: "Hero section for the fleet page.",
		}),
		defineField({
			name: "body",
			title: "Content",
			type: "blockContent",
			description: "The main content of the about page.",
			validation: (Rule) =>
				Rule.custom((value, context) => {
					if (context.document?.isLandingPage) {
						// Field is not required for landing pages
						return true;
					}
					// For non-landing pages, the field is required
					return value && value.length > 0
						? true
						: "Content is required for non-landing pages.";
				}),
			hidden: ({ document }) => document?.isLandingPage === true,
		}),
		defineField({
			name: "threedVideoUrl",
			title: "3D Video URL",
			type: "url",
			description: "URL for a 3D video related to the about page.",
			hidden: ({ document }) => document?.isLandingPage === true,
		}),
		// Updated fields with hidden properties
		defineField({
			name: "aboutSection",
			title: "About Pages",
			type: "array",
			of: [
				{
					type: "reference",
					to: [{ type: "about" }, { type: "fleet" }],
					description: "Select about pages to display.",
				},
			],
			description: "Select about pages to display.",
			hidden: ({ document }) => document?.isLandingPage !== true, // Hide when it's a landing page
		}),
		defineField({
			name: "servicesSection",
			title: "Services Pages",
			type: "array",
			of: [
				{
					type: "reference",
					to: [{ type: "flights" }, { type: "industry" }, { type: "training" }],
					description: "Select services pages to display.",
				},
			],
			description: "Select services pages to display.",
			hidden: ({ document }) => document?.isLandingPage !== true, // Hide when it's a landing page
		}),
		// Remaining fields
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
			media: "mainImage",
		},
		prepare(selection) {
			return { title: selection.title, media: selection.media };
		},
	},
});
