import { defineField, defineType } from "sanity";
import { bodyText, imageWithAlt } from "./fields";

// Fields for the main about page only. Anything left empty shows the site's
// built-in default content.
const landingOnly = ({ document }: { document?: any }) =>
	document?.isLandingPage !== true;

const signatureFields = [
	defineField({ name: "signatureName", title: "Signed by", type: "string" }),
	defineField({ name: "signatureRole", title: "Signatory's role", type: "string" }),
	defineField({
		name: "signatureCompany",
		title: "Signatory's company",
		type: "string",
	}),
];

const secondaryImage = imageWithAlt(
	"secondaryImage",
	"Small overlapping image",
	"Shown framed in white over the corner of the main image.",
);

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
			name: "heroTitle",
			title: "Hero heading",
			type: "text",
			rows: 2,
			description:
				"The large heading over the video. Press Enter for a line break.",
			hidden: landingOnly,
		}),
		defineField({
			name: "intro",
			title: "Introduction",
			type: "object",
			hidden: landingOnly,
			fields: [
				defineField({ name: "tag", title: "Tag", type: "string" }),
				defineField({ name: "heading", title: "Heading", type: "string" }),
				bodyText,
				...signatureFields,
				imageWithAlt("mainImage", "Main image"),
				secondaryImage,
			],
		}),
		defineField({
			name: "award",
			title: "Award section",
			type: "object",
			hidden: landingOnly,
			fields: [
				defineField({ name: "heading", title: "Heading", type: "string" }),
				bodyText,
				imageWithAlt("mainImage", "Main image"),
				secondaryImage,
				imageWithAlt("logo", "Logo", "Shown under the text."),
			],
		}),
		defineField({
			name: "hero",
			title: "About Us Image",
			type: "hero",
			description: "About us image for the about page.",
			hidden: ({ document }) => document?.isLandingPage === true,
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
					return Array.isArray(value) && value.length > 0
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
			name: "moreHeading",
			title: "About pages heading",
			type: "string",
			hidden: landingOnly,
		}),
		defineField({
			name: "moreNote",
			title: "3D tours note",
			type: "string",
			description: "Shown with the 3D icon above the about pages list.",
			hidden: landingOnly,
		}),
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
			name: "servicesHeading",
			title: "Services pages heading",
			type: "string",
			hidden: landingOnly,
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
