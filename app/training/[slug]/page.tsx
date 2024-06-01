import Template from "@/app/components/Template";
import { client } from "@/lib/sanity";
import type { Metadata } from "next";
export const revalidate = 30; // revalidate at most 30 seconds

async function getData(slug: string) {
	const query = `
    *[_type == "training" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          title,
          seoTitle,
          seoDescription,
          body,
          mainImage,
				  "gallery": gallery.images[]{
						"imageUrl": asset->url,
						"height": asset->metadata.dimensions.height,
						"width": asset->metadata.dimensions.width,
						"fileName": asset->originalFilename,
						"blur": blur,
						"alt": alt,
					},
          gallerySingle,
      }[0]`;
	const data = await client.fetch(query);

	return { data };
}

export async function generateMetadata({
	params,
}: { params: { slug: string } }): Promise<Metadata> {
	const data: any = await getData(params.slug.toLowerCase());

	return {
		title: data?.seoTitle,
		description: data?.seoDescription,
	};
}

export default async function TrainingPage({
	params,
}: { params: { slug: string } }) {
	const { data }: any = await getData(params.slug.toLowerCase());

	return (
		<>
			<Template data={data} />
		</>
	);
}
