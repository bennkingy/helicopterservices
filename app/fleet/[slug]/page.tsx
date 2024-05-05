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
	mainImage: {
		asset: {
			_ref: string;
			_type: string;
		};
		alt?: string; // Assuming there could be an 'alt' text for the image
	};
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
              _id,
              url,
              metadata {
                dimensions,
                lqip
              }
            }
          },
					threedVideoUrl,
					"gallerySingle": gallerySingle.asset->{
            _id,
            url,
            metadata {
                dimensions {
                    width,
                    height
                }
            }
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

	return {
		title: data?.seoTitle,
		description: data?.seoDescription,
	};
}

export default async function FleetItemPage({
	params,
}: { params: { slug: string } }) {
	const data: FleetItem = await getPageData(params.slug.toLowerCase());

	return (
		<>
			<TemplateTwo data={data} />
		</>
	);
}
