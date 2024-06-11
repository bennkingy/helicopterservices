import Template from "@/app/components/Template";
import TransferTimesTable from "@/app/components/TransferTimesTable";
import { client } from "@/lib/sanity";
import type { Metadata } from "next";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData(slug: string) {
	const query = `
    *[_type == "flights" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          title,
          seoTitle,
          seoDescription,
					mainImage{
					...,
					"mainImage": asset->url,
						"metadata": asset->metadata {
							dimensions,
							lqip
						},
						"altText": asset->altText
					},
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
				"pilot": pilot->{
            name,
						role,
           "mainImage": mainImage{
					  ...,
					 "mainImage": asset->url,
							"metadata": asset->metadata {
                dimensions,
                lqip
              },
							"altText": asset->altText
					},
        },
				"fleetItems": fleetItems[]->{
					title,
 					"gallerySingle": gallerySingle{
						...,
						"mainImage": asset->url,
						"metadata": asset->metadata {
							dimensions,
							lqip
						},
						"altText": asset->altText
					},	
				},
      }[0]`;
	const data = await client.fetch(query);

	return data;
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
