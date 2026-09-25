import { defineArrayMember, defineField, defineType } from "sanity";
import { bodyText, imageWithAlt } from "./fields";

// Every field is optional. Anything left empty shows the site's built-in
// default content, so the homepage never renders a blank section.

// Text-and-images block used by the About, Training and Industry sections.
const contentSection = (name: string, title: string, group: string) =>
	defineField({
		name,
		title,
		type: "object",
		group,
		fields: [
			defineField({ name: "tag", title: "Tag", type: "string" }),
			defineField({ name: "heading", title: "Heading", type: "string" }),
			bodyText,
			imageWithAlt("mainImage", "Main image"),
			imageWithAlt(
				"secondaryImage",
				"Small overlapping image",
				"Shown framed in white over the corner of the main image.",
			),
		],
	});

const serviceCard = (name: string, title: string) =>
	defineField({
		name,
		title,
		type: "object",
		options: { columns: 1 },
		fields: [
			defineField({ name: "title", title: "Title", type: "string" }),
			defineField({
				name: "description",
				title: "Description",
				type: "text",
				rows: 2,
			}),
		],
	});

export default defineType({
	name: "homepage",
	title: "Homepage",
	type: "document",
	groups: [
		{ name: "hero", title: "Hero", default: true },
		{ name: "services", title: "Service cards" },
		{ name: "about", title: "About" },
		{ name: "training", title: "Training" },
		{ name: "flights", title: "Flights carousel" },
		{ name: "industry", title: "Industry" },
		{ name: "seo", title: "SEO" },
	],
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description: "Name of this document in the Studio. Not shown on the site.",
			group: "hero",
		}),
		defineField({
			name: "heroTitle",
			title: "Hero heading",
			type: "text",
			rows: 2,
			description: "The large heading over the video. Press Enter for a line break.",
			group: "hero",
		}),
		defineField({
			name: "services",
			title: "Service cards",
			type: "object",
			group: "services",
			description:
				"The four cards under the hero. Their icons and links are fixed.",
			fields: [
				serviceCard("training", "Training card"),
				serviceCard("flights", "Flights card"),
				serviceCard("industry", "Industry card"),
				serviceCard("company", "Our company card"),
			],
		}),
		defineField({
			name: "about",
			title: "About section",
			type: "object",
			group: "about",
			fields: [
				defineField({ name: "tag", title: "Tag", type: "string" }),
				defineField({ name: "heading", title: "Heading", type: "string" }),
				bodyText,
				defineField({
					name: "bulletPoints",
					title: "Bullet points",
					type: "array",
					of: [defineArrayMember({ type: "string" })],
				}),
				defineField({
					name: "signatureName",
					title: "Signed by",
					type: "string",
				}),
				defineField({
					name: "signatureRole",
					title: "Signatory's role",
					type: "string",
				}),
				defineField({
					name: "signatureCompany",
					title: "Signatory's company",
					type: "string",
				}),
				imageWithAlt("mainImage", "Main image"),
				imageWithAlt(
					"secondaryImage",
					"Small overlapping image",
					"Shown framed in white over the corner of the main image.",
				),
			],
		}),
		contentSection("training", "Training section", "training"),
		defineField({
			name: "flightsTag",
			title: "Tag",
			type: "string",
			group: "flights",
		}),
		defineField({
			name: "flightsHeading",
			title: "Heading",
			type: "string",
			group: "flights",
		}),
		defineField({
			name: "carouselSection",
			title: "Carousel slides",
			type: "array",
			group: "flights",
			description:
				"Each slide links to a page. Leave the title or image empty to use the linked page's own.",
			of: [
				defineArrayMember({
					name: "carouselItem",
					title: "Slide",
					type: "object",
					fields: [
						defineField({
							name: "page",
							title: "Links to",
							type: "reference",
							to: [
								{ type: "flights" },
								{ type: "training" },
								{ type: "industry" },
								{ type: "about" },
							],
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "title",
							title: "Title",
							type: "string",
							description: "Leave empty to use the linked page's title.",
						}),
						defineField({
							name: "description",
							title: "Description",
							type: "string",
							validation: (Rule) =>
								Rule.max(90).warning(
									"Keep it short so it fits under the image.",
								),
						}),
						imageWithAlt(
							"image",
							"Image",
							"Shown cropped to a circle. Leave empty to use the linked page's main image.",
						),
					],
					preview: {
						select: {
							title: "title",
							pageTitle: "page.title",
							description: "description",
							media: "image",
							pageMedia: "page.mainImage",
						},
						prepare({ title, pageTitle, description, media, pageMedia }) {
							return {
								title: title || pageTitle || "No page selected",
								subtitle: description,
								media: media || pageMedia,
							};
						},
					},
				}),
			],
		}),
		contentSection("industry", "Industry section", "industry"),
		defineField({
			name: "seoTitle",
			title: "SEO title",
			type: "string",
			group: "seo",
			validation: (Rule) =>
				Rule.max(70).warning("SEO titles should be at most 70 characters."),
		}),
		defineField({
			name: "seoDescription",
			title: "SEO description",
			type: "text",
			rows: 3,
			group: "seo",
			validation: (Rule) =>
				Rule.max(160).warning(
					"SEO descriptions should be at most 160 characters.",
				),
		}),
	],
	preview: {
		select: { title: "title" },
		prepare: ({ title }) => ({ title: title || "Homepage" }),
	},
});
