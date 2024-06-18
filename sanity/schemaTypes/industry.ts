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
      name: "fleetItems",
      title: "Helicopters That Provide This Service",
      type: "array",
      of: [{ type: "reference", to: { type: "fleet" } }],
    }),
		defineField({
			name: "pilot",
			title: "Pilot",
			type: "reference",
			to: [{ type: "pilots" }],
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
			title: "Hero Image",
			type: "image",
			hidden: ({ document }) => document?.isLandingPage === true,
		}),
		defineField({
			name: "body",
			title: "Content",
			type: "blockContent",
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
