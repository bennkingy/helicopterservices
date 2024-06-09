import Template from "@/app/components/Template";
import { getBase64Blur } from "@/lib/extensions";
import { client, urlFor } from "@/lib/sanity";
import type { Metadata } from "next";
export const revalidate = 30; // revalidate at most 30 seconds

async function getData(slug: string) {
	const query = `
    *[_type == "industry" && slug.current == '${slug}'] {
             "currentSlug": slug.current,
          title,
          seoTitle,
          seoDescription,
					body[]{
					...,
					_type == 'gallery' => {
						...,
						images[]{
							...,
							"imageUrl": asset->url,
							"width": asset->metadata.dimensions.width,
							"height": asset->metadata.dimensions.height,
							alt,
							blur
						}
					},
					_type == 'image' => {
						...,
						"imageUrl": asset->url,
						"width": asset->metadata.dimensions.width,
						"height": asset->metadata.dimensions.height,
						alt,
						blur
					},
				},
				mainImage{
					...,
					"mainImage": asset->url,
						"metadata": asset->metadata {
							dimensions,
							lqip
						},
						"altText": asset->altText
					},
				  "gallery": gallery.images[]{
						"imageUrl": asset->url,
						"height": asset->metadata.dimensions.height,
						"width": asset->metadata.dimensions.width,
						"fileName": asset->originalFilename,
						"blur": blur,
						"alt": alt,
					},
         	"gallerySingle": gallerySingle{
						"imageUrl": asset->url,
						"altText": alt,
						"blur": blur,
						"height": asset->metadata.dimensions.height,
						"width": asset->metadata.dimensions.width
					},
      }[0]`;
	const data = await client.fetch(query);

	data?.gallery?.length > 0 &&
		(await Promise.all(
			data.gallery.map(async (item: any) => {
				const imageUrl = urlFor(item.imageUrl).url();
				const blurDataURL = await getBase64Blur(imageUrl);
				item.blurDataURL = blurDataURL;
			}),
		));

	return data;
}

export async function generateMetadata({
	params,
}: { params: { slug: string } }): Promise<Metadata> {
	const { data }: any = await getData(params.slug.toLowerCase());

	if (!data) {
		return {
			title:
				"Experienced helicopter training | White Waltham Airfield | Maidenhead",
			description:
				"Helicopter Services | Experienced helicopter training for pilots, instructors and examiners | Helicopter charter & photography | Helicopter load lifting & consultancy | London helicopter tours | White Waltham Airfield | Maidenhead",
		};
	}

	return {
		title:
			data.seoTitle ||
			"Experienced helicopter training | White Waltham Airfield | Maidenhead",
		description:
			data.seoDescription ||
			"Helicopter Services | Experienced helicopter training for pilots, instructors and examiners | Helicopter charter & photography | Helicopter load lifting & consultancy | London helicopter tours | White Waltham Airfield | Maidenhead",
	};
}
export default async function IndustryPage({
	params,
}: { params: { slug: string } }) {
	const data: any = await getData(params.slug.toLowerCase());

	return <Template data={data} />;
}
