import Team from "@/app/components/Team";
import type { training } from "@/lib/interface";
import { client } from "@/lib/sanity";
import type { Metadata } from "next";

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
    *[_type == "pilots"] {
      name,
      slug,
      role,
      bio,
      "mainImage": mainImage{
				...,
				"imageUrl": asset->url,
				"altText": alt,
				"blur": blur,
				"lqip": asset->metadata.lqip,
				"height": asset->metadata.dimensions.height,
				"width": asset->metadata.dimensions.width,
      }
    }`;
	const data = await client.fetch(query);

	return data;
}

export async function generateMetadata({
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

	console.log(pilotData);

	return (
		<>
			<div className="container mt-14 mb-20">
				<h3 className="text-brand-dark-blue text-6xl font-light font-workSans -ml-1 mb-5">
					{data?.title}
				</h3>
				<p className="mt-5 mb-10 font-semibold text-base sm:text-2xl font-workSans">
					Meet our team of highly qualified pilots.
				</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-24 mt-24 mb-40 sm:px-20">
					<Team pilotData={pilotData} />
				</div>
			</div>
		</>
	);
}
