import { client } from "@/lib/sanity";
import type { Metadata } from "next";

export const revalidate = 30; // revalidate at most 30 seconds

async function getPageData(slug: string) {
	const query = `
    *[_type == "fleet" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          title,
          seoTitle,
          seoDescription,
          body,
          hero,
					service,
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
      }[0]`;
	const data = await client.fetch(query);

	return data;
}

async function getHelicopterData() {
	const query = `
  *[_type == "fleet"] {
		      title,
          workType,
					engineType,
					capacity,
					ifrcapable,
					cruiseSpeed,
					base
      }`;
	const data = await client.fetch(query);

	return data;
}

export const metadata: Metadata = {
	title: "Fleet - Helicopter Services",
	description: "Helicopter Services",
};

export default async function FleetPage({
	params,
}: { params: { slug: string } }) {
	const data: any = await getPageData("fleet");
	const heliCopterData: any = await getHelicopterData();

	return <></>;
}
