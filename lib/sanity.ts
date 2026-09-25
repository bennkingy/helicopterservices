import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

export const client = createClient({
	apiVersion: "2023-05-03",
	dataset: "production",
	projectId: "0he7nz2b",
	useCdn: false, // We use ISR, so we don't need the CDN
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
	return builder.image(source);
}

// Function to generate URL and fetch metadata for an image
// export function urlFor(source: any, includeMetadata = false) {
//   const url = builder.image(source).url();
//   if (!includeMetadata) {
//     return url;
//   }
//   // Assuming metadata is part of the source object
//   // This would require your queries fetching 'source' to include metadata fields
//   const metadata = {
//     dimensions: source.metadata.dimensions,
//     lqip: source.metadata.lqip,
//   };

//   return {
//     url,
//     metadata,
//   };
// // }

// Slugs to pre-build for a [slug] route, so those pages are cached like the
// rest of the site. Slugs with their own dedicated route are left out.
export async function slugParams(type: string, exclude: string[] = []) {
	const slugs = await client.fetch<string[]>(
		`*[_type == $type && isLandingPage != true && defined(slug.current) && !(slug.current in $exclude) && !(_id in path("drafts.**"))].slug.current`,
		{ type, exclude },
	);
	return slugs.map((slug) => ({ slug }));
}
