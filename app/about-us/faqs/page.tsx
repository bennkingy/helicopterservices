import { FAQ } from "@/app/components/FAQ";
import type { training } from "@/lib/interface";
import { client } from "@/lib/sanity";
import type { Metadata } from "next";
import Image from "next/image";

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
			<div className="container mt-12 sm:mt-14 mb-24 sm:mb-20 pb-2 sm:pb-10">
				<div className="flex items-baseline">
					<Image
						src="/images/icons/CompanyBlue.svg"
						alt="Helicopter Services"
						width={23}
						quality={100}
						height={23}
					/>
					<p className="text-brand-light-blue text-base sm:text-[22px] font-workSans ml-2">
						About us
					</p>
				</div>
				<h3 className="text-brand-dark-blue text-5xl sm:text-6xl font-light font-workSans -ml-1 mb-5 mt-3">
					{data?.title}
				</h3>
				<p className="mt-5 mb-10 font-bold text-base sm:text-2xl font-workSans">
					Frequently asked questions about flying with Helicopter Services.
				</p>
				<FAQ className="" />
			</div>
		</>
	);
}
