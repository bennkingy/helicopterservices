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
			description: "The full name/title of the pilot.",
			validation: (Rule) =>
				Rule.required()
					.min(3)
					.max(50)
					.warning("Name should be between 3 and 50 characters."),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "name",
				maxLength: 96,
			},
			description: "The unique identifier for the pilot, used in URLs.",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "role",
			title: "Role",
			type: "string",
			description: "The role or position of the pilot.",
			validation: (Rule) =>
				Rule.required()
					.min(3)
					.max(50)
					.warning("Role should be between 3 and 50 characters."),
		}),
		defineField({
			name: "mainImage",
			title: "Profile Picture",
			type: "image",
			description: "Profile picture of the pilot.",
			options: { hotspot: true },
			validation: (Rule) => Rule.required(),
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
			description:
				"A detailed description of the pilot's qualifications and experience.",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "order",
			title: "Order",
			type: "number",
			description:
				"The order in which the pilot should appear, 1 would be first, 2 would be second.",
			validation: (Rule) =>
				Rule.required()
					.min(0)
					.integer()
					.warning("Order must be a non-negative integer."),
		}),
	],
	preview: {
		select: {
			title: "name",
			media: "mainImage",
		},
	},
});
