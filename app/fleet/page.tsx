import HelicopterCard from "@/app/components/HelicopterCard";
import Template from "@/app/components/Template";
import { bodyQuery } from "@/lib/queries";
import { client } from "@/lib/sanity";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { ComparisonTable } from "../components/ComparisonTable";
import { sanityMetadata } from "@/lib/seo";

export const revalidate = 30; // revalidate at most 30 seconds

async function getPageData(slug: string) {
	const query = `
    *[_type == "fleet" && slug.current == $slug] {
        "currentSlug": slug.current,
          title,
          seoTitle,
          seoDescription,
          ${bodyQuery},
					quoteMessage,
          hero{
						heading,
						tagline,
						"image": {
							...image,
							"url": image.asset->url,
							"metadata": image.asset->metadata,
							"altText": image.alt
						}
					}
      }[0]`;
	const data = await client.fetch(query, { slug });

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
			base,
		}`;
	const data = await client.fetch(query);

	return data;
}

// Every helicopter document, so the list stays in sync with the fleet itself.
async function getHelicopters() {
	const query = `
  *[_type == "fleet" && isLandingPage != true && defined(slug.current)] | order(title asc) {
		title,
		engineType,
		"url": "/fleet/" + slug.current,
		"image": gallerySingle{
			...,
			"imageUrl": asset->url,
			"metadata": asset->metadata {
				dimensions,
				lqip
			},
			"altText": coalesce(alt, asset->altText, ^.title + " helicopter")
		}
	}`;
	const data = await client.fetch(query);

	return data;
}

export function generateMetadata(): Promise<Metadata> {
	return sanityMetadata(
		'_type == "fleet" && isLandingPage == true',
		{},
		"/fleet",
		"Fleet - Helicopter Services",
	);
}

export default async function FleetPage({
	params,
}: { params: { slug: string } }) {
	const data: any = await getPageData("fleet");
	const heliCopterData: any = await getHelicopterData();
	const helicopters: any[] = (await getHelicopters()) || [];
	const twinEngine = helicopters.filter(
		(helicopter) => helicopter.engineType === "Twin",
	);
	// Anything not marked Twin is listed as single engine, so a helicopter with
	// no engine type set still appears.
	const singleEngine = helicopters.filter(
		(helicopter) => helicopter.engineType !== "Twin",
	);

	return (
		<div className="sm:mb-10">
			<Template
				data={data}
				height="h-[250px] md:h-[420px] lg:h-[675px]"
				iconType="Flights"
			>
				<div className="">
					<div className="pt-5 mb-0">
						<ComparisonTable
							// @ts-ignore
							data={heliCopterData.filter(
								(page: any) => page?.cruiseSpeed !== null,
							)}
						/>
						<h2 className="text-xl font-bold font-workSans mt-12 text-brand-dark-blue">
							Twin engine
						</h2>
						<div
							className={cn(
								"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 mb-6",
							)}
						>
							{twinEngine.map((helicopter: any) => (
								<HelicopterCard key={helicopter.url} helicopter={helicopter} />
							))}
						</div>
						<h2 className="text-xl font-bold font-workSans mt-12 text-brand-dark-blue">
							Single engine
						</h2>
						<div
							className={cn(
								"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 mb-2",
							)}
						>
							{singleEngine.map((helicopter: any) => (
								<HelicopterCard key={helicopter.url} helicopter={helicopter} />
							))}
						</div>
					</div>
				</div>
			</Template>
		</div>
	);
}
