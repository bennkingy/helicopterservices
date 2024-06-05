import TemplateTwo from "@/app/components/TemplateTwo";
import { client } from "@/lib/sanity";
import type { Metadata } from "next";

export const revalidate = 30; // revalidate at most 30 seconds

export type FleetItem = {
	currentSlug: string;
	title: string;
	seoTitle: string;
	seoDescription: string;
	workType: {
		trainingHelicopter: boolean;
		charterHelicopter: boolean;
		aerialWorkHelicopter: boolean;
	};
	body: any; // You can specify a more detailed type if your body has a specific structure
	hero: any;
	threedVideoUrl: string;
	gallery?: any;
	gallerySingle?: any;
	engineType: string;
	capacity: number;
	ifrcapable: boolean;
	cruiseSpeed: number;
	base: string;
};

async function getPageData(slug: string) {
	const query = `
    *[_type == "fleet" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          title,
          seoTitle,
          workType,
          seoDescription,
          body,
          mainImage,
					hero,
          "heroImage": hero.image{
            asset->{
							...,
              _id,
              url,
              metadata {
                dimensions,
                lqip
              }
            }
          },
					threedVideoUrl,
		 			"gallerySingle": gallerySingle{
						...,
						"imageUrl": asset->url,
						"altText": alt,
						"blur": blur,
            "lqip": asset->metadata.lqip,
						"height": asset->metadata.dimensions.height,
						"width": asset->metadata.dimensions.width,
					},
					gallery,
					engineType,
					capacity,
					ifrcapable,
					cruiseSpeed,
					base
      }[0]`;
	const data = await client.fetch(query);

	return data;
}

export async function generateMetadata({
	params,
}: { params: { slug: string } }): Promise<Metadata> {
	const data: FleetItem = await getPageData(params.slug.toLowerCase());

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

async function getHelicopterData() {
	const query = `
  *[_type == "fleet"] {
		      title,
          workType,
					helicopterType,
					engineType,
					capacity,
					ifrcapable,
					cruiseSpeed,
					base
      }`;
	const data = await client.fetch(query);

	return data;
}

export default async function FleetItemPage({
	params,
}: { params: { slug: string } }) {
	const data: FleetItem = await getPageData(params.slug.toLowerCase());
	const helicopterData: any = await getHelicopterData();

	return (
		<>
			<TemplateTwo data={data} helicopterData={helicopterData} />
		</>
	);
}
