import Template from "@/app/components/Template";
import TransferTimesTable from "@/app/components/TransferTimesTable";
import { getBase64Blur } from "@/lib/extensions";
import { client, urlFor } from "@/lib/sanity";
import type { Metadata } from "next";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData(slug: string) {
	const query = `
    *[_type == "flights" && slug.current == '${slug}'] {
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
						"fileName": asset->originalFilename
					},
      }[0]`;
	const data = await client.fetch(query);

	await Promise.all(
		data.gallery.map(async (item: any) => {
			const imageUrl = urlFor(item.imageUrl).url();
			const blurDataURL = await getBase64Blur(imageUrl);
			item.blurDataURL = blurDataURL;
		}),
	);

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

export default async function FlightsgPage({
	params,
}: { params: { slug: string } }) {
	const data: any = await getData(params.slug.toLowerCase());
	const showTransferTimesTable = params.slug === "airport-transfers";

	return (
		<>
			<Template data={data}>
				{showTransferTimesTable && (
					<div className="mt-10">
						<TransferTimesTable />
					</div>
				)}
			</Template>
		</>
	);
}
