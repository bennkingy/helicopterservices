import { FAQ } from "@/app/components/FAQ";
import Template from "@/app/components/Template";
import type { training } from "@/lib/interface";
import { client } from "@/lib/sanity";
import type { Metadata } from "next";

export const revalidate = 30; // revalidate at most 30 seconds

async function getPageData(slug: string) {
	const query = `
    *[_type == "about" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          title,
          seoTitle,
          seoDescription,
					threedVideoUrl,
          body,
					"mainImage": mainImage{
						...,
						"imageUrl": asset->url,
						"altText": alt,
						"blur": blur,
						"lqip": asset->metadata.lqip,
						"height": asset->metadata.dimensions.height,
						"width": asset->metadata.dimensions.width,
					}
      }[0]`;
	const data = await client.fetch(query);

	return data;
}

export async function generateMetadata({
	params,
}: { params: { slug: string } }): Promise<Metadata> {
	const data: training = await getPageData(params.slug.toLowerCase());

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
export default async function AboutPage({
	params,
}: { params: { slug: string } }) {
	const data: training = await getPageData(params.slug.toLowerCase());

	const showFaqs = params.slug === "faqs";
	const showHanger = params.slug === "the-hanger";

	return (
		<>
			<Template data={data}>
				<div className="mt-8">
					{showFaqs ? (
						<div className="mt-8">
							<FAQ className="mb-10" />
						</div>
					) : null}
				</div>
			</Template>
		</>
	);
}
