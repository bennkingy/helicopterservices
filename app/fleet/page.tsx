import HelicopterCard from "@/app/components/HelicopterCard";
import Template from "@/app/components/Template";
import { client } from "@/lib/sanity";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { ComparisonTable } from "../components/ComparisonTable";

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
x            }
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

	return (
		<>
			<Template data={data} height="h-[250px] md:h-[420px] lg:h-[675px]">
				<div className="">
					<div className="pt-5 mb-0">
						<ComparisonTable
							// @ts-ignore
							data={heliCopterData.filter(
								(page: any) => page?.cruiseSpeed !== null,
							)}
						/>
						<h1 className="text-xl font-bold font-workSans mt-12 text-brand-dark-blue">
							Twin engine
						</h1>
						<div
							className={cn(
								"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 mb-6",
							)}
						>
							{data.service
								?.filter((helicopter: any) => helicopter?.category === "Twin")
								// @ts-ignore
								.sort((a, b) => a.heading.localeCompare(b.heading))
								.map((helicopter: any, idx: number) => (
									<HelicopterCard key={idx} helicopter={helicopter} />
								))}
						</div>
						<h1 className="text-xl font-bold font-workSans mt-12 text-brand-dark-blue">
							Single engine
						</h1>
						<div
							className={cn(
								"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 mb-2",
							)}
						>
							{/* // @ts-ignore */}
							{data.service
								?.filter((helicopter: any) => helicopter?.category === "Single")
								// @ts-ignore
								.sort((a, b) => a.heading.localeCompare(b.heading))
								.map((helicopter: any, idx: number) => (
									<HelicopterCard key={idx} helicopter={helicopter} />
								))}
						</div>
					</div>
				</div>
			</Template>
		</>
	);
}
