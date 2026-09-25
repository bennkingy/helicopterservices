import Template from "@/app/components/Template";
import TransferTimesTable from "@/app/components/TransferTimesTable";
import { bodyQuery } from "@/lib/queries";
import { client, slugParams } from "@/lib/sanity";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData(slug: string) {
	const query = `
    *[_type == "flights" && slug.current == $slug] {
        "currentSlug": slug.current,
          title,
					shortTitle,
          seoTitle,
									quoteMessage,
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
					${bodyQuery},
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
					"url": slug.current,
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
	const data = await client.fetch(query, { slug });

	return data;
}

async function baseMetadata({
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

	if (!data?.title) {
		notFound();
	}

	return (
		<>
			<Template data={data} iconType={"Flights"}>
				{showTransferTimesTable && (
					<div className="mt-10">
						<TransferTimesTable />
					</div>
				)}
			</Template>
		</>
	);
}

export async function generateMetadata({
	params,
}: { params: { slug: string } }): Promise<Metadata> {
	return pageMetadata(await baseMetadata({ params }), `/flights/${params.slug.toLowerCase()}`);
}

export function generateStaticParams() {
	return slugParams("flights", ["flights"]);
}
