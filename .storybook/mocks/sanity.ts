// Sanity client stand-in for Storybook. Returns saved fixture data
// (.storybook/fixtures, real content copied from the production dataset).
import imageUrlBuilder from "@sanity/image-url";
import navigation from "@/.storybook/fixtures/navigation.json"; // "@/" because this file stands in for lib/sanity.ts, so relative paths resolve from lib/

const builder = imageUrlBuilder({ projectId: "0he7nz2b", dataset: "production" });

export function urlFor(source: any) {
	return builder.image(source);
}

export async function slugParams() {
	return [];
}

const promoPopup = {
	_id: "storybook-popup",
	title: "Christmas gift vouchers",
	startDate: "2020-01-01T00:00:00Z",
	endDate: "2099-01-01T00:00:00Z",
	showOn: "all",
	link: "/flights/trial-lessons",
	ctaLabel: "Gift vouchers",
	ctaText: "Buy a trial lesson",
	delaySeconds: 0,
	image: {
		asset: { _ref: "image-4973316ce5d37216181b1491384a2cb7ea9bd218-1672x419-jpg" },
		alt: "Robinson R22 and R44 ready for trial lessons",
		dimensions: { width: 1672, height: 419 },
	},
};

export const client = {
	// next-sanity-image reads the project from here to build image URLs.
	config: () => ({ projectId: "0he7nz2b", dataset: "production", apiVersion: "2023-05-03" }),
	async fetch(query: string) {
		if (query.includes('"fleet"') && query.includes('"legal"')) return navigation;
		if (query.includes("promoPopup")) return [promoPopup];
		if (query.includes("reviewRating")) return { reviewRating: 4.9, reviewCount: 312 };
		if (query.includes("officeHours")) return null; // use the built-in hours
		console.warn("[storybook sanity mock] no fixture for query:", query.slice(0, 120));
		return null;
	},
};
