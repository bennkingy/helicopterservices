import { defineField, defineType } from "sanity";

export default defineType({
	name: "homepage",
	title: "Homepage",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description: "The title of the homepage",
		}),
		defineField({
			name: "carouselSection",
			title: "Carousel Section",
			type: "array",
			of: [
				{
					type: "reference",
					to: [{ type: "flights" }],
					description: "Select flight items to display in the carousel",
				},
			],
			description: "Carousel section showing selected flight documents",
		}),
	],
});
