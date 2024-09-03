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
			description:
				"Indicates if this is the main landing page for the fleet section.",
		}),
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description: "The main title of the fleet page.",
			validation: (Rule) =>
				Rule.required()
					.min(1)
					.max(100)
					.warning("Titles should be between 1 and 100 characters."),
		}),
		defineField({
			name: "quoteMessage",
			title: "Quote Message",
			type: "string",
			description: "A message to go inside the quote",
			validation: (Rule) =>
				Rule.max(70).warning("Quote message should be at most 40 characters."),
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
			name: "hero",
			type: "hero",
			description: "Hero section for the fleet page.",
		}),
		defineField({
			name: "service",
			title: "Helicopters",
			type: "array",
			of: [{ type: "service" }],
			hidden: ({ document }) => document?.isLandingPage !== true,
			description:
				"List of helicopters provided, shown only on the landing page.",
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
					description: "Indicates if the helicopter is a Guimbal type.",
				},
				{
					name: "robinsonType",
					title: "Robinson Type",
					type: "boolean",
					initialValue: false,
					description: "Indicates if the helicopter is a Robinson type.",
				},
				{
					name: "aerospatialeEurocopterAirbusType",
					title: "Aérospatiale, Eurocopter & Airbus Type",
					type: "boolean",
					initialValue: false,
					description:
						"Indicates if the helicopter is an Aérospatiale, Eurocopter or Airbus type.",
				},
				{
					name: "agustaType",
					title: "Agusta Type",
					type: "boolean",
					initialValue: false,
					description: "Indicates if the helicopter is an Agusta type.",
				},
				{
					name: "bellType",
					title: "Bell Type",
					type: "boolean",
					initialValue: false,
					description: "Indicates if the helicopter is a Bell type.",
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
			description: "Specify the type of helicopter.",
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
					description: "Indicates if the helicopter is used for training.",
				},
				{
					name: "charterHelicopter",
					title: "Charter Helicopter",
					type: "boolean",
					initialValue: false,
					description: "Indicates if the helicopter is used for charters.",
				},
				{
					name: "aerialWorkHelicopter",
					title: "Aerial Work Helicopter",
					type: "boolean",
					initialValue: false,
					description: "Indicates if the helicopter is used for aerial work.",
				},
			],
			hidden: ({ document }) => document?.isLandingPage === true,
			description: "Specify the type of work the helicopter is used for.",
		}),
		defineField({
			name: "engineType",
			title: "Engine Type",
			type: "string",
			description: "Single or Twin engine?",
			hidden: ({ document }) => document?.isLandingPage === true,
		}),
		defineField({
			name: "capacity",
			title: "Capacity",
			type: "number",
			description: "Number of passengers the helicopter can carry.",
			hidden: ({ document }) => document?.isLandingPage === true,
		}),
		defineField({
			name: "ifrcapable",
			title: "IFR Capable",
			type: "boolean",
			description: "Indicates if the helicopter is IFR capable.",
			hidden: ({ document }) => document?.isLandingPage === true,
		}),
		defineField({
			name: "cruiseSpeed",
			title: "Cruise Speed",
			type: "number",
			description: "Cruising speed in knots.",
			hidden: ({ document }) => document?.isLandingPage === true,
		}),
		defineField({
			name: "base",
			title: "Base",
			type: "string",
			description: "Base location of the helicopter.",
			hidden: ({ document }) => document?.isLandingPage === true,
		}),
		defineField({
			name: "body",
			title: "Description",
			type: "blockContent",
			description: "Detailed description of the helicopter.",
		}),
		defineField({
			name: "gallery",
			type: "gallery",
			description: "Gallery for displaying multiple images of the helicopter.",
			hidden: ({ document }) => document?.isLandingPage === true,
		}),
		defineField({
			name: "gallerySingle",
			title: "Gallery Single",
			type: "image",
			description: "Perfect for displaying a single large image.",
			hidden: ({ document }) => document?.isLandingPage === true,
		}),
		defineField({
			name: "threedVideoUrl",
			title: "3D Video URL",
			type: "url",
			description: "URL for a 3D video of the helicopter.",
			hidden: ({ document }) => document?.isLandingPage === true,
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
			heroImage: "hero.image",
			gallerySingle: "gallerySingle",
		},
		prepare(selection) {
			return {
				title: selection.title,
				media: selection.heroImage || selection.gallerySingle,
			};
		},
	},
});
