import { defineField, defineType } from "sanity";

export default defineType({
	name: "pilots",
	title: "Pilots",
	type: "document",
	fields: [
		defineField({
			name: "name",
			title: "Name",
			type: "string",
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "name",
				maxLength: 96,
			},
		}),
		defineField({
			name: "mainImage",
			title: "Main image",
			type: "image",
			hidden: ({ document }) => document?.isLandingPage === true,
			options: { hotspot: true },
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
		}),
		defineField({
			name: "bio",
			title: "Bio",
			type: "array",
			of: [
				{
					title: "Block",
					type: "block",
					styles: [{ title: "Normal", value: "normal" }],
					lists: [],
				},
			],
		}),
	],
	preview: {
		select: {
			title: "name",
			media: "mainImage",
		},
	},
});
