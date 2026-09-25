import { client } from "@/lib/sanity";
import { SITE_URL } from "@/lib/seo";
import type { MetadataRoute } from "next";

export const revalidate = 3600;

type Page = { slug: string; updated: string; isLandingPage?: boolean };

// Sanity document type and the URL section its pages live under.
const sections = [
	{ type: "training", path: "training" },
	{ type: "industry", path: "industry" },
	{ type: "flights", path: "flights" },
	{ type: "fleet", path: "fleet" },
	{ type: "about", path: "about-us" },
	{ type: "legal", path: "legal" },
] as const;

const query = `*[_type == $type && defined(slug.current) && !(_id in path("drafts.**"))]{
	"slug": slug.current,
	"updated": _updatedAt,
	isLandingPage
}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const today = new Date().toISOString().split("T")[0];
	const entry = (path: string, lastModified: string = today) => ({
		url: `${SITE_URL}${path}`,
		changeFrequency: "weekly" as const,
		lastModified,
	});

	const pagesBySection = await Promise.all(
		sections.map(({ type }) => client.fetch<Page[]>(query, { type })),
	);

	const sectionEntries = sections.flatMap(({ path }, index) => {
		const pages = pagesBySection[index];
		const landing = pages.find(
			(page) => page.isLandingPage || page.slug === path,
		);
		const children = pages
			.filter((page) => page !== landing)
			.map((page) => entry(`/${path}/${page.slug}`, page.updated));
		// Legal has no landing page of its own.
		return path === "legal"
			? children
			: [entry(`/${path}`, landing?.updated), ...children];
	});

	return [entry("/"), ...sectionEntries, entry("/enquire")];
}
