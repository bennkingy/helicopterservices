import { FAQ } from "@/app/components/FAQ";
import PageTitle from "@/app/components/PageTitle";
import { faqJsonLd, getFaqs } from "@/lib/faqs";
import { JsonLd, sectionBreadcrumbs } from "@/lib/jsonld";
import type { training } from "@/lib/interface";
import { client } from "@/lib/sanity";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

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

async function baseMetadata({
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
	// Same list for the page and for Google's FAQ rich results.
	const faqs = await getFaqs();

	return (
		<>
			<div className="container mt-12 sm:mt-14 mb-24 sm:mb-20 pb-2 sm:pb-10">
				<PageTitle
					tag="About us"
					title={data?.title || "FAQs"}
					intro="Frequently asked questions about flying with Helicopter Services."
					className="mb-10"
				/>
				<FAQ className="" items={faqs} />
				{/* JsonLd escapes "<", so an answer containing "</script>" can't break the page. */}
				<JsonLd
					data={[
						sectionBreadcrumbs(
							{ name: "About us", path: "/about-us" },
							{ title: data?.title || "FAQs", path: "/about-us/faqs" },
						),
						faqJsonLd(faqs),
					]}
				/>
			</div>
		</>
	);
}

export async function generateMetadata({
	params,
}: { params: { slug: string } }): Promise<Metadata> {
	return pageMetadata(await baseMetadata({ params }), "/about-us/faqs");
}
