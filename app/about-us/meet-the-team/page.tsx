import PageTitle from "@/app/components/PageTitle";
import Team from "@/app/components/Team";
import type { training } from "@/lib/interface";
import { JsonLd, sectionBreadcrumbs } from "@/lib/jsonld";
import { client } from "@/lib/sanity";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 30; // revalidate at most 30 seconds

async function getPageData() {
	const query = `
    *[_type == "about" && slug.current == 'meet-the-team'] {
        "currentSlug": slug.current,
          title,
          seoTitle,
          seoDescription,
					threedVideoUrl,
          body,
          mainImage,
      }[0]`;
	const data = await client.fetch(query);

	return data;
}

async function getPilotData() {
	const query = `
    *[_type == "pilots"] | order(order asc) {
      name,
      slug,
      role,
      bio,
			order,
      "mainImage": mainImage{
				...,
				"imageUrl": asset->url,
				"altText": coalesce(alt, asset->altText),
				"blur": blur,
				"lqip": asset->metadata.lqip,
				"height": asset->metadata.dimensions.height,
				"width": asset->metadata.dimensions.width,
      }
    }`;
	const data = await client.fetch(query);

	return data;
}

async function baseMetadata({
	params,
}: { params: { slug: string } }): Promise<Metadata> {
	const data: training = await getPageData();

	return {
		title: data?.seoTitle,
		description: data?.seoDescription,
	};
}

export default async function AboutPage({
	params,
}: { params: { slug: string } }) {
	const data: training = await getPageData();
	const pilotData: any = await getPilotData();

	return (
		<>
			<JsonLd
				data={sectionBreadcrumbs(
					{ name: "About us", path: "/about-us" },
					{ title: data?.title || "Meet the team", path: "/about-us/meet-the-team" },
				)}
			/>
			<div className="container mt-12 sm:mt-14 mb-24 sm:mb-20 pb-2 sm:pb-10">
				<PageTitle
					tag="About us"
					title={data?.title || "Meet the team"}
					intro="Meet our team of highly qualified pilots."
					className="mb-10"
				/>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 mt-20 mb-30 sm:px-20">
					<Team pilotData={pilotData} />
				</div>
			</div>
		</>
	);
}

export async function generateMetadata({
	params,
}: { params: { slug: string } }): Promise<Metadata> {
	return pageMetadata(await baseMetadata({ params }), "/about-us/meet-the-team");
}
