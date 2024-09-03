import { client } from "@/lib/sanity";
import type { MetadataRoute } from "next";
import { unstable_noStore as noStore } from "next/cache";

interface Page {
	currentSlug: string;
	updated: Date;
}

export const revalidate = 30; // revalidate at most 30 seconds

async function fetchData(contentType: string): Promise<Page[]> {
	const query = `*[_type == "${contentType}"] {
		"currentSlug": slug.current,
		"updated": _updatedAt
	}`;
	return await client.fetch(query, { cache: "no-cache" });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	noStore();

	const contentTypes = [
		"training",
		"about",
		"flights",
		"legal",
		"industry",
		"fleet",
	];
	const allData = await Promise.all(contentTypes.map(fetchData));

	const [
		trainingData,
		aboutData,
		flightsData,
		legalData,
		industryData,
		fleetData,
	] = allData;

	const mapPagesToSitemap = (
		data: Page[],
		baseUrl: string,
	): MetadataRoute.Sitemap => {
		return data
			.filter((page: Page) => page.currentSlug !== baseUrl)
			.map((page: Page) => ({
				url: `https://helicopterservices.co.uk/${baseUrl}/${page.currentSlug}`,
				changeFrequency: "weekly",
				lastModified: page.updated,
			}));
	};

	return [
		{
			url: `https://helicopterservices.co.uk`,
			changeFrequency: "weekly",
			lastModified: new Date().toISOString().split("T")[0],
		},
		{
			url: `https://helicopterservices.co.uk/training`,
			changeFrequency: "weekly",
			lastModified: new Date().toISOString().split("T")[0],
		},
		...mapPagesToSitemap(trainingData, "training"),
		{
			url: `https://helicopterservices.co.uk/industry`,
			changeFrequency: "weekly",
			lastModified: new Date().toISOString().split("T")[0],
		},
		...mapPagesToSitemap(industryData, "industry"),
		{
			url: `https://helicopterservices.co.uk/flights`,
			changeFrequency: "weekly",
			lastModified: new Date().toISOString().split("T")[0],
		},
		...mapPagesToSitemap(flightsData, "flights"),
		{
			url: `https://helicopterservices.co.uk/fleet`,
			changeFrequency: "weekly",
			lastModified: new Date().toISOString().split("T")[0],
		},
		...mapPagesToSitemap(fleetData, "fleet"),
		{
			url: `https://helicopterservices.co.uk/about-us`,
			changeFrequency: "weekly",
			lastModified: new Date().toISOString().split("T")[0],
		},
		...mapPagesToSitemap(aboutData, "about-us"),
		{
			url: `https://helicopterservices.co.uk/enquire`,
			changeFrequency: "weekly",
			lastModified: new Date().toISOString().split("T")[0],
		},
		...mapPagesToSitemap(legalData, "legal"),
	];
}
