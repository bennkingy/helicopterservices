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
			name: "mainImage",
			title: "Hero Image",
			type: "image",
			options: { hotspot: true },
		}),
		defineField({
			name: "body",
			title: "Content",
			type: "blockContent",
		}),
		defineField({
			name: "threedVideoUrl",
			title: "3D video url",
			type: "url",
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
			media: "mainImage",
		},
		prepare(selection) {
			return { title: selection.title, media: selection.media };
		},
	},
});
