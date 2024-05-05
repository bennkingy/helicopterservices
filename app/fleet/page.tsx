import HelicopterCard from "@/app/components/HelicopterCard";
import Template from "@/app/components/Template";
import type { helicopter } from "@/lib/interface";
import { client } from "@/lib/sanity";
import { cn } from "@/lib/utils";
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
      }[0]`;
	const data = await client.fetch(query);

	return data;
}

async function getHelicopterData() {
	const query = `
  *[_type == 'helicopter'] | order(_createdAt desc) {
      model,
      mainImage,
      type,
      url,
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
	const helicopterData: any = await getHelicopterData();

	return (
		<>
			<Template data={data}>
				<div className="mt-8">
					<div className="pt-5 mb-10 md:mb-0">
						<h1 className="text-xl font-bold font-workSans">Guimbal Type</h1>
						<div
							className={cn(
								"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 mb-6",
							)}
						>
							{/* // @ts-ignore */}
							{helicopterData
								?.filter(
									(helicopter: helicopter) => helicopter?.type === "Guimbal",
								)
								.map((helicopter: helicopter, idx: number) => (
									<HelicopterCard key={idx} helicopter={helicopter} />
								))}
						</div>
						<h1 className="text-xl font-bold font-workSans mt-12">
							Robinson Type
						</h1>
						<div
							className={cn(
								"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 mb-6",
							)}
						>
							{helicopterData?.map((helicopter: helicopter, idx: number) => (
								<HelicopterCard key={idx} helicopter={helicopter} />
							))}
						</div>
						<h1 className="text-xl font-bold font-workSans mt-12">
							Aérospatiale, Eurocopter & Airbus Type
						</h1>
						<div
							className={cn(
								"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 mb-6",
							)}
						>
							{helicopterData?.map((helicopter: helicopter, idx: number) => (
								<HelicopterCard key={idx} helicopter={helicopter} />
							))}
						</div>
						<h1 className="text-xl font-bold font-workSans mt-12">
							Agusta Type
						</h1>
						<div
							className={cn(
								"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 mb-6",
							)}
						>
							{helicopterData?.map((helicopter: helicopter, idx: number) => (
								<HelicopterCard key={idx} helicopter={helicopter} />
							))}
						</div>
						<h1 className="text-xl font-bold font-workSans mt-12">Bell Type</h1>
						<div
							className={cn(
								"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3",
							)}
						>
							{helicopterData?.map((helicopter: helicopter, idx: number) => (
								<HelicopterCard key={idx} helicopter={helicopter} />
							))}
						</div>
					</div>
				</div>
			</Template>
		</>
	);
}
