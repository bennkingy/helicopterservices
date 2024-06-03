import { FAQ } from "@/app/components/FAQ";
import Template from "@/app/components/Template";
import type { training } from "@/lib/interface";
import { client } from "@/lib/sanity";
import type { Metadata } from "next";

export const revalidate = 30; // revalidate at most 30 seconds

async function getPageData(slug: string) {
	const query = `
    *[_type == "about" && slug.current == 'faqs'] {
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

export async function generateMetadata({
	params,
}: { params: { slug: string } }): Promise<Metadata> {
	const data: training = await getPageData("faqs");

	return {
		title: data?.seoTitle,
		description: data?.seoDescription,
	};
}

export default async function AboutPage({
	params,
}: { params: { slug: string } }) {
	const data: training = await getPageData("faqs");

	return (
		<>
			<Template data={data} sidebar={false}>
				<div className="mt-8">
					<div className="mt-8">
						<FAQ className="mb-10" />
					</div>
				</div>
			</Template>
		</>
	);
}