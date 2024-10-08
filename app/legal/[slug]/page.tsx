import { client } from "@/lib/sanity";
import { cn } from "@/lib/utils";
import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export const revalidate = 30;

// Define the allowed slugs
const allowedSlugs = ["cookies", "privacy", "terms-conditions"];

async function getPageData(slug: string) {
	const query = `
    *[_type == "legal" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          title,
          seoTitle,
          seoDescription,
          body,
    }[0]`;
	const data = await client.fetch(query);

	return data;
}

export async function generateMetadata({
	params,
}: { params: { slug: string } }): Promise<Metadata> {
	const data: any = await getPageData(params.slug.toLowerCase());

	return {
		title: data?.seoTitle,
		description: data?.seoDescription,
	};
}

export default async function LegalPage({
	params,
}: { params: { slug: string } }) {
	const slug = params.slug.toLowerCase();

	const data: any = await getPageData(slug);

	if (!data?.title) {
		notFound();
	}

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
						Legal
					</p>
				</div>
				<h3 className="text-brand-dark-blue text-4xl sm:text-6xl font-light font-workSans -ml-1 mb-5 mt-3">
					{data?.title}
				</h3>
				<div
					className={cn(
						"prose prose-a:text-brand-orange prose-a:transition-colors prose-a hover:prose-a:text-brand-dark-blue prose-a:no-underline  font-openSans prose-h2:font-workSans prose-h2:text-4xl prose-strong:font-bold marker:text-brand-light-blue max-w-full text-brand-dark-grey mt-8",
					)}
				>
					<PortableText value={data?.body || ""} />
				</div>
			</div>
		</>
	);
}
