import Template from "@/app/components/Template";
import { bodyQuery } from "@/lib/queries";
import { client, slugParams } from "@/lib/sanity";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
export const revalidate = 30; // revalidate at most 30 seconds

async function getData(slug: string) {
	const query = `
    *[_type == "training" && slug.current == $slug] {
        "currentSlug": slug.current,
          title,
          seoTitle,
						shortTitle,
						quoteMessage,
          seoDescription,
					${bodyQuery},
				mainImage{
				...,
				"mainImage": asset->url,
					"metadata": asset->metadata {
						dimensions,
						lqip
					},
					"altText": asset->altText
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

	return { data };
}

// https://nextjs.org/docs/app/building-your-application/optimizing/metadata

async function baseMetadata({
	params,
}: { params: { slug: string } }): Promise<Metadata> {
	// @ts-ignore
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

export default async function TrainingPage({
	params,
}: { params: { slug: string } }) {
	// @ts-ignore
	const { data }: any = await getData(params.slug.toLowerCase());

	if (!data?.title) {
		notFound();
	}

	return (
		<>
			<Template data={data} iconType="Training" />
		</>
	);
}

export async function generateMetadata({
	params,
}: { params: { slug: string } }): Promise<Metadata> {
	return pageMetadata(await baseMetadata({ params }), `/training/${params.slug.toLowerCase()}`);
}

export function generateStaticParams() {
	return slugParams("training", ["training", "type-ratings"]);
}
