import { defineField, defineType } from "sanity";

export default defineType({
	name: "fleet",
	title: "Fleet",
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
		}),
		defineField({
			name: "service",
			title: "Helicopters",
			type: "array",
			of: [{ type: "service" }],
			hidden: ({ document }) => document?.isLandingPage !== true,
		}),
		defineField({
			name: "helicopterType",
			title: "Helicopter Type",
			type: "object",
			fields: [
				{
					name: "guimbalType",
					title: "Guimbal Type",
					type: "boolean",
					initialValue: false,
				},
				{
					name: "robinsonType",
					title: "Robinson Type",
					type: "boolean",
					initialValue: false,
				},
				{
					name: "aerospatialeEurocopterAirbusType",
					title: "Aérospatiale, Eurocopter & Airbus Type",
					type: "boolean",
					initialValue: false,
				},
				{
					name: "agustaType",
					title: "Agusta Type",
					type: "boolean",
					initialValue: false,
				},
				{
					name: "bellType",
					title: "Bell Type",
					type: "boolean",
					initialValue: false,
				},
			],
			hidden: ({ document }) => document?.isLandingPage === true,
			validation: (Rule) =>
				Rule.custom((fields) => {
					const selectedFields = [
						fields?.agustaType,
						fields?.bellType,
						fields?.aerospatialeEurocopterAirbusType,
						fields?.robinsonType,
						fields?.guimbalType,
					].filter(Boolean);

					return selectedFields.length > 1
						? "Only one helicopter type can be selected"
						: true;
				}),
		}),
		defineField({
			name: "workType",
			title: "Work Type",
			type: "object",
			fields: [
				{
					name: "trainingHelicopter",
					title: "Training Helicopter",
					type: "boolean",
					initialValue: false,
				},
				{
					name: "charterHelicopter",
					title: "Charter Helicopter",
					type: "boolean",
					initialValue: false,
				},
				{
					name: "aerialWorkHelicopter",
					title: "Aerial Work Helicopter",
					type: "boolean",
					initialValue: false,
				},
			],
			hidden: ({ document }) => document?.isLandingPage === true,
		}),
		defineField({
			name: "engineType",
			title: "Engine Type",
			type: "string",
			description: "Single or Twin?",
			hidden: ({ document }) => document?.isLandingPage === true,
		}),
		defineField({
			name: "capacity",
			title: "Capacity",
			type: "number",
			description: "Number of passengers the helicopter can carry",
			hidden: ({ document }) => document?.isLandingPage === true,
		}),
		defineField({
			name: "ifrcapable",
			title: "IFR Capable",
			type: "boolean",
			hidden: ({ document }) => document?.isLandingPage === true,
		}),
		defineField({
			name: "cruiseSpeed",
			title: "Cruise Speed",
			type: "number",
			description: "Cruising speed in knots",
			hidden: ({ document }) => document?.isLandingPage === true,
		}),
		defineField({
			name: "base",
			title: "Base",
			type: "string",
			hidden: ({ document }) => document?.isLandingPage === true,
		}),
		defineField({
			name: "body",
			title: "Description",
			type: "blockContent",
		}),
		defineField({
			name: "gallery",
			type: "gallery",
			description: "Perfect for displaying 2 or more images",
			hidden: ({ document }) => document?.isLandingPage === true,
		}),
		defineField({
			name: "gallerySingle",
			title: "Gallery single",
			type: "image",
			description: "Perfect for displaying 1 large image",
			hidden: ({ document }) => document?.isLandingPage === true,
		}),
		defineField({
			name: "threedVideoUrl",
			title: "3D video url",
			type: "url",
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
			gallerySingle: "gallerySingle",
		},
		prepare(selection) {
			return {
				title: selection.title,
				media:
					selection.heroImage || selection.gallerySingle,
			};
		},
	},
});
