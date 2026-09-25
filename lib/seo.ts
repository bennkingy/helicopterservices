import type { Metadata } from "next";
import { client } from "./sanity";

export const SITE_URL = "https://www.helicopterservices.co.uk";
export const SITE_NAME = "Helicopter Services";
export const DEFAULT_DESCRIPTION =
	"Helicopter training, charter, London tours, aerial filming and load lifting from White Waltham Airfield near Maidenhead, with over 25 years' operating experience.";

const clean = (value: unknown) =>
	typeof value === "string" && value.trim() ? value.trim() : undefined;

// Adds a self-referencing canonical URL plus matching Open Graph and Twitter
// tags. `path` is relative to metadataBase, which the root layout sets.
export function pageMetadata(meta: Metadata, path: string): Metadata {
	const title = clean(meta.title) || SITE_NAME;
	const description = clean(meta.description) || DEFAULT_DESCRIPTION;
	return {
		...meta,
		title,
		description,
		alternates: { canonical: path },
		openGraph: {
			type: "website",
			locale: "en_GB",
			siteName: SITE_NAME,
			url: path,
			title,
			description,
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
		},
	};
}

// Metadata from the SEO fields of a Sanity document.
export async function sanityMetadata(
	filter: string,
	params: Record<string, string>,
	path: string,
	fallbackTitle: string,
): Promise<Metadata> {
	let data: { seoTitle?: string; seoDescription?: string } | null = null;
	try {
		data = await client.fetch(
			`*[${filter}][0]{ seoTitle, seoDescription }`,
			params,
		);
	} catch (error) {
		console.error(`Failed to load SEO fields for ${path}`, error);
	}
	return pageMetadata(
		{
			title: clean(data?.seoTitle) || fallbackTitle,
			description: data?.seoDescription,
		},
		path,
	);
}
