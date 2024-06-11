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
			name: "role",
			title: "Role",
			type: "string",
		}),
		defineField({
			name: "mainImage",
			title: "Profile Picture",
			type: "image",
			hidden: ({ document }) => document?.isLandingPage === true,
		}),
		defineField({
			name: "bio",
			title: "Qualifications",
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
