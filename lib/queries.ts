// Shared GROQ projections for Sanity queries.

// Alt text for an image, in priority order:
// 1. the "alt" field set on this particular use of the image
// 2. the alt text set on the asset in the Media library (sanity-plugin-media)
const imageFields = `
	"imageUrl": asset->url,
	"width": asset->metadata.dimensions.width,
	"height": asset->metadata.dimensions.height,
	"alt": coalesce(alt, asset->altText),
	"blur": coalesce(blur, asset->metadata.lqip)
`;

// Portable Text body with inline images and galleries expanded.
export const bodyQuery = `
	body[]{
		...,
		_type == 'gallery' => {
			...,
			images[]{
				...,
				${imageFields}
			}
		},
		_type == 'image' => {
			...,
			${imageFields}
		},
	}
`;
