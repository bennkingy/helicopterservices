import { aboutDefaults as defaults } from "./about-defaults";
import { imageProjection as image, paragraphs, sanityImage, text } from "./cms";
import { client } from "./sanity";

const linkedPage = `{
	title,
	"slug": slug.current,
	seoTitle,
	seoDescription,
	"mainImage": {
		...hero.image,
		"image": hero.image.asset->url,
		"metadata": hero.image.asset->metadata {
			dimensions,
			lqip
		},
		"altText": coalesce(hero.image.alt, hero.image.asset->altText)
	}
}`;

const query = `*[_type == "about" && slug.current == "about-us"][0]{
	seoTitle,
	seoDescription,
	heroTitle,
	intro{
		tag,
		heading,
		body,
		signatureName,
		signatureRole,
		signatureCompany,
		"mainImage": mainImage${image},
		"secondaryImage": secondaryImage${image}
	},
	award{
		heading,
		body,
		"mainImage": mainImage${image},
		"secondaryImage": secondaryImage${image},
		"logo": logo${image}
	},
	moreHeading,
	moreNote,
	servicesHeading,
	"aboutPages": aboutSection[]->${linkedPage},
	"servicePages": servicesSection[]->${linkedPage}
}`;

export type AboutPage = ReturnType<typeof buildAboutPage>;

// Main about page content from Sanity, with every empty field filled from the
// built-in defaults.
export async function getAboutPage() {
	let data: any = null;
	try {
		data = await client.fetch(query);
	} catch (error) {
		console.error("Failed to load about page content from Sanity", error);
	}
	return buildAboutPage(data);
}

export function buildAboutPage(data: any) {
	const intro = data?.intro;
	const award = data?.award;
	const d = defaults;

	return {
		seoTitle: text(data?.seoTitle, d.seoTitle),
		seoDescription: text(data?.seoDescription, d.seoDescription),
		heroTitle: text(data?.heroTitle, d.heroTitle),
		intro: {
			tag: text(intro?.tag, d.intro.tag),
			heading: text(intro?.heading, d.intro.heading),
			body: paragraphs(intro?.body, d.intro.body),
			signatureName: text(intro?.signatureName, d.intro.signatureName),
			signatureRole: text(intro?.signatureRole, d.intro.signatureRole),
			signatureCompany: text(intro?.signatureCompany, d.intro.signatureCompany),
			mainImage: sanityImage(intro?.mainImage, d.intro.mainImage, 1000),
			secondaryImage: sanityImage(
				intro?.secondaryImage,
				d.intro.secondaryImage,
				240,
			),
		},
		award: {
			heading: text(award?.heading, d.award.heading),
			body: paragraphs(award?.body, d.award.body),
			mainImage: sanityImage(award?.mainImage, d.award.mainImage, 1000),
			secondaryImage: sanityImage(
				award?.secondaryImage,
				d.award.secondaryImage,
				240,
			),
			logo: sanityImage(award?.logo, d.award.logo, 1000),
		},
		moreHeading: text(data?.moreHeading, d.moreHeading),
		moreNote: text(data?.moreNote, d.moreNote),
		servicesHeading: text(data?.servicesHeading, d.servicesHeading),
		aboutPages: (data?.aboutPages || []).filter(Boolean),
		servicePages: (data?.servicePages || []).filter(Boolean),
	};
}
