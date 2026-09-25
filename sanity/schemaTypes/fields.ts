import { defineField } from "sanity";

// Field helpers shared by the page schemas.

export const imageWithAlt = (name: string, title: string, description?: string) =>
	defineField({
		name,
		title,
		type: "image",
		description,
		options: { hotspot: true },
		fields: [
			{
				name: "alt",
				type: "string",
				title: "Alternative text",
				description:
					"Describe the image for screen readers and search engines. Leave blank to use the alt text set on the image in the Media library.",
			},
		],
	});

export const bodyText = defineField({
	name: "body",
	title: "Text",
	type: "text",
	rows: 6,
	description: "Leave a blank line between paragraphs.",
});
