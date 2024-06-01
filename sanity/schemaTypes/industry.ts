import { defineField, defineType } from "sanity";

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
		}),
		defineField({
			name: "title",
			title: "Title",
			type: "string",
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
		}),
		defineField({
			name: "hero",
			type: "hero",
			hidden: ({ document }) => document?.isLandingPage !== true,
		}),
		defineField({
			name: "service",
			title: "Services",
			type: "array",
			of: [{ type: "service" }],
			hidden: ({ document }) => document?.isLandingPage !== true,
		}),
		defineField({
			name: "mainImage",
			title: "Main image",
			type: "image",
			hidden: ({ document }) => document?.isLandingPage === true,
		}),
		defineField({
			name: "body",
			title: "Body",
			type: "blockContent",
		}),
		defineField({
			name: "gallery",
			type: "gallery",
			description: "Perfect for displaying 2 or more images.",
			hidden: ({ document }) => document?.isLandingPage === true,
		}),
		defineField({
			name: "gallerySingle",
			title: "Gallery single",
			type: "image",
			description: "Perfect for displaying 1 large image.",
			fields: [
				defineField({
					name: "alt",
					type: "string",
					title: "Alternative text",
				}),
				defineField({
					name: "blur",
					type: "string",
					title: "Blur hash",
				}),
			],
			hidden: ({ document }) => document?.isLandingPage === true,
		}),
		defineField({
			name: "seoDescription",
			title: "SEO Description",
			type: "string",
		}),
		defineField({
			name: "seoTitle",
			title: "SEO Title",
			type: "string",
		}),
	],
	preview: {
		select: {
			title: "title",
			heroImage: "hero.image",
			mainImage: "mainImage",
		},
		// @ts-ignore
		prepare(selection) {
			return {
				title: selection.title,
				media: selection.heroImage || selection.mainImage,
			};
		},
	},
});
