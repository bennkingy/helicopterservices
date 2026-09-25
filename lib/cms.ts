// Helpers for pages whose content comes from Sanity but falls back to
// built-in defaults for any field an editor leaves empty.
import type { HomepageImage } from "./homepage-defaults";
import { urlFor } from "./sanity";

export type CmsImage = HomepageImage;

// GROQ projection for an image field with alt text and dimensions.
export const imageProjection = `{
	asset,
	crop,
	hotspot,
	"alt": coalesce(alt, asset->altText),
	"dimensions": asset->metadata.dimensions
}`;

export const text = (value: unknown, fallback: string) =>
	typeof value === "string" && value.trim() ? value.trim() : fallback;

// Paragraphs are separated by a blank line in the Studio text box.
export const paragraphs = (value: unknown, fallback: string[]) => {
	if (typeof value !== "string") return fallback;
	const parts = value
		.split(/\n\s*\n/)
		.map((part) => part.trim())
		.filter(Boolean);
	return parts.length ? parts : fallback;
};

export const list = (value: unknown, fallback: string[]) => {
	const items = Array.isArray(value)
		? value
				.filter((item) => typeof item === "string" && item.trim())
				.map((item: string) => item.trim())
		: [];
	return items.length ? items : fallback;
};

export const sanityImage = (
	value: any,
	fallback: CmsImage,
	displayWidth: number,
): CmsImage => {
	if (!value?.asset) return fallback;
	const natural = value.dimensions;
	const width = Math.min(displayWidth, natural?.width || displayWidth);
	const height = natural?.width
		? Math.round((width * natural.height) / natural.width)
		: width;
	return {
		src: urlFor(value).width(width * 2).auto("format").url(),
		alt: value.alt || fallback.alt,
		width,
		height,
	};
};
