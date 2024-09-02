import { defineField, defineType } from "sanity";

export default defineType({
	name: "about",
	title: "About",
	type: "document",
	fields: [
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
			name: "quoteMessage",
			title: "Quote Message",
			type: "string",
			description: "A message to go inside the quote.",
			validation: (Rule) =>
				Rule.max(50).warning("Quote message should be at most 40 characters."),
		}),
		defineField({
			name: "mainImage",
			title: "Hero Image",
			type: "image",
			options: { hotspot: true },
			description: "Main image for the about page.",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "body",
			title: "Content",
			type: "blockContent",
			description: "The main content of the about page.",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "threedVideoUrl",
			title: "3D Video URL",
			type: "url",
			description: "URL for a 3D video related to the about page.",
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
			media: "mainImage",
		},
		prepare(selection) {
			return { title: selection.title, media: selection.media };
		},
	},
});
