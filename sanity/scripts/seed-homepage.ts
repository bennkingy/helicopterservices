/**
 * Copies the homepage's built-in content into Sanity as an unpublished draft,
 * so editors start from what the site shows today instead of empty fields.
 *
 * Run from the sanity folder after `npx sanity login`:
 *   pnpm sanity exec scripts/seed-homepage.ts --with-user-token
 *
 * It only writes a draft. Review it in the Studio and press Publish when happy.
 * Running it again replaces that draft, and images are never uploaded twice.
 */
import { homepageDefaults as d } from "../../lib/homepage-defaults";
import { client, image, key } from "./seed-utils";

async function section(s: typeof d.training) {
	return {
		tag: s.tag,
		heading: s.heading,
		body: s.body.join("\n\n"),
		mainImage: await image(s.mainImage.src, s.mainImage.alt),
		secondaryImage: await image(s.secondaryImage.src, s.secondaryImage.alt),
	};
}

const linkTypes: Record<string, string> = {
	flights: "flights",
	training: "training",
	industry: "industry",
	"about-us": "about",
};

async function slides() {
	const items = [];
	for (const slide of d.flights.slides) {
		const [, section, slug] = slide.link.split("/");
		const pageId = await client.fetch<string | null>(
			`*[_type == $type && slug.current == $slug && !(_id in path("drafts.**"))][0]._id`,
			{ type: linkTypes[section], slug },
		);
		if (!pageId) {
			console.warn(`Skipped slide "${slide.title}": no page found for ${slide.link}`);
			continue;
		}
		items.push({
			_key: key(),
			_type: "carouselItem",
			page: { _type: "reference", _ref: pageId },
			title: slide.title,
			description: slide.description,
			image: await image(slide.img),
		});
	}
	return items;
}

async function run() {
	const existing = await client.fetch<{ _id: string; title?: string } | null>(
		`*[_type == "homepage" && !(_id in path("drafts.**"))][0]{_id, title}`,
	);
	const id = existing?._id ?? "homepage";

	const draft = {
		_id: `drafts.${id}`,
		_type: "homepage",
		title: existing?.title || "Homepage",
		heroTitle: d.heroTitle,
		services: d.services,
		about: {
			...(await section(d.about)),
			bulletPoints: d.about.bulletPoints,
			signatureName: d.about.signatureName,
			signatureRole: d.about.signatureRole,
			signatureCompany: d.about.signatureCompany,
		},
		training: await section(d.training),
		flightsTag: d.flights.tag,
		flightsHeading: d.flights.heading,
		carouselSection: await slides(),
		industry: await section(d.industry),
		seoTitle: d.seoTitle,
		seoDescription: d.seoDescription,
	};

	await client.createOrReplace(draft);
	console.log(
		`Saved draft ${draft._id}. Open the Homepage in the Studio, check it, and press Publish.`,
	);
}

run().catch((error) => {
	console.error(error);
	process.exit(1);
});
