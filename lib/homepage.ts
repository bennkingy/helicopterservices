import {
	imageProjection as image,
	list,
	paragraphs,
	sanityImage,
	text,
} from "./cms";
import {
	type HomepageSlide,
	homepageDefaults as defaults,
} from "./homepage-defaults";
import { client, urlFor } from "./sanity";

const section = `{
	tag,
	heading,
	body,
	"mainImage": mainImage${image},
	"secondaryImage": secondaryImage${image}
}`;

const query = `*[_type == "homepage"] | order(_updatedAt desc)[0]{
	heroTitle,
	services,
	"about": about{
		tag,
		heading,
		body,
		bulletPoints,
		signatureName,
		signatureRole,
		signatureCompany,
		"mainImage": mainImage${image},
		"secondaryImage": secondaryImage${image}
	},
	"training": training${section},
	flightsTag,
	flightsHeading,
	"slides": carouselSection[_type == "carouselItem" && defined(page)]{
		title,
		description,
		"image": image${image},
		"page": page->{
			_type,
			title,
			isLandingPage,
			"slug": slug.current,
			"mainImage": mainImage${image}
		}
	},
	"industry": industry${section},
	seoTitle,
	seoDescription
}`;

const sectionPaths: Record<string, string> = {
	flights: "/flights",
	training: "/training",
	industry: "/industry",
	about: "/about-us",
};

const pageLink = (page: any) => {
	const base = sectionPaths[page?._type] || "";
	if (!page?.slug || page.isLandingPage) return base || "/";
	return `${base}/${page.slug}`;
};

// Empty slide fields fall back to the built-in slide for the same page, then
// to the linked page's own title and main image.
const slide = (item: any): HomepageSlide | null => {
	const page = item.page;
	if (!page) return null;
	const link = pageLink(page);
	const builtIn = defaults.flights.slides.find((s) => s.link === link);
	const img = item.image?.asset ? item.image : page.mainImage;
	return {
		title: text(item.title, builtIn?.title || page.title || ""),
		description: text(item.description, builtIn?.description || ""),
		link,
		img: item.image?.asset || !builtIn
			? img?.asset
				? urlFor(img).width(740).height(740).fit("crop").auto("format").url()
				: defaults.flights.slides[0].img
			: builtIn.img,
	};
};

const contentSection = (value: any, fallback: typeof defaults.training) => ({
	tag: text(value?.tag, fallback.tag),
	heading: text(value?.heading, fallback.heading),
	body: paragraphs(value?.body, fallback.body),
	mainImage: sanityImage(value?.mainImage, fallback.mainImage, 1000),
	secondaryImage: sanityImage(value?.secondaryImage, fallback.secondaryImage, 240),
});

const serviceCard = (
	value: any,
	fallback: { title: string; description: string },
) => ({
	title: text(value?.title, fallback.title),
	description: text(value?.description, fallback.description),
});

export type Homepage = ReturnType<typeof buildHomepage>;

// Homepage content from Sanity, with every empty field filled from the
// built-in defaults so a half-edited document never leaves a gap on the page.
export async function getHomepage() {
	let data: any = null;
	try {
		data = await client.fetch(query);
	} catch (error) {
		console.error("Failed to load homepage content from Sanity", error);
	}
	return buildHomepage(data);
}

export function buildHomepage(data: any) {
	const slides = (data?.slides || [])
		.map(slide)
		.filter(Boolean) as HomepageSlide[];

	return {
		seoTitle: text(data?.seoTitle, defaults.seoTitle),
		seoDescription: text(data?.seoDescription, defaults.seoDescription),
		heroTitle: text(data?.heroTitle, defaults.heroTitle),
		services: {
			training: serviceCard(data?.services?.training, defaults.services.training),
			flights: serviceCard(data?.services?.flights, defaults.services.flights),
			industry: serviceCard(data?.services?.industry, defaults.services.industry),
			company: serviceCard(data?.services?.company, defaults.services.company),
		},
		about: {
			...contentSection(data?.about, defaults.about),
			bulletPoints: list(data?.about?.bulletPoints, defaults.about.bulletPoints),
			signatureName: text(data?.about?.signatureName, defaults.about.signatureName),
			signatureRole: text(data?.about?.signatureRole, defaults.about.signatureRole),
			signatureCompany: text(
				data?.about?.signatureCompany,
				defaults.about.signatureCompany,
			),
		},
		training: contentSection(data?.training, defaults.training),
		flights: {
			tag: text(data?.flightsTag, defaults.flights.tag),
			heading: text(data?.flightsHeading, defaults.flights.heading),
			slides: slides.length ? slides : defaults.flights.slides,
		},
		industry: contentSection(data?.industry, defaults.industry),
	};
}
