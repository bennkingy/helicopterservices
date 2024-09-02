import { Button } from "@/components/ui/button";
import { client } from "@/lib/sanity";
import type { Metadata } from "next";
import Link from "next/link";
import ContactCta from "../components/ContactCta";
import Header from "../components/Header";
import Heading from "../components/Heading";
import ServiceCard from "../components/ServiceCard";

export const metadata: Metadata = {
	title: "Flights - Helicopter Services",
	description: "Helicopter Services",
};

async function getData(slug: string) {
	const query = `
    *[_type == "flights" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          title,
          hero{
						heading,
						tagline,
						"image": {
							...image,
							"url": image.asset->url,
							"metadata": image.asset->metadata,
							"altText": image.alt
						}
					},
          seoTitle,
          seoDescription,
          body,
									quoteMessage,
         	service[] {
					category,
					"image": {
						...image,
						"url": image.asset->url,
						"metadata": image.asset->metadata,
						"altText": image.altText
					},
					url,
					heading,
					description
				}
      }[0]`;
	const data = await client.fetch(query);

	return data;
}

export default async function Flights({
	params,
}: { params: { slug: string } }) {
	const data: any = await getData("flights");

	return (
		<>
			<main className="bg-brand-light-grey overflow-x-hidden">
				<Header
					title={data?.hero?.heading}
					tag={data?.hero?.tagline}
					image={data?.hero?.image}
					className="h-[250px] md:h-[420px] lg:h-[675px]"
				/>
				<section className="py-10 max-w-6xl mx-auto px-4 mt-10 mb-10">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{data?.service
							// @ts-ignore
							.sort((a, b) => a.heading.localeCompare(b.heading))
							.map(
								(
									{ url, heading, description, image }: ServiceCard,
									i: number,
								) => (
									<ServiceCard
										key={i + 1}
										heading={heading}
										url={url.replace("trail", "trial")}
										image={image || ""}
										description={description}
										category={"Flights"}
									/>
								),
							)}
					</div>
					<div className="mb-10 mt-20 grid grid-cols-1 sm:grid-cols-3">
						<div className="col-span-2 pr-0 sm:pr-20">
							{/* // @ts-ignore */}
							<Heading
								title="Can&apos;t find what you&apos;re looking for"
								titleStyles="text-3xl text-brand-dark-blue"
								className="mb-7"
							/>
							<p className="mb-5">
								We have been operating for over 25 years as one of the UK&apos;s
								most experienced helicopter charter, tours, photography,
								load-lifting, and consultancy companies.
							</p>
							<p className="mb-5">
								Whether you are looking for a wonderful gift, a time-efficient
								airport transfer, a private charter for your special occasion,
								help with aerial photograph, a load lifted economically we can
								help you.
							</p>
							<p className="mb-5">
								We adhere to the highest safety standards and many of our
								helicopters are able to fly in reduced visibility or at night.
								We offer both twin-engine or single-engine helicopters and can
								provide two pilots as may be required.
							</p>
							<p className="mt-5">
								<span className="font-bold">Outside office hours? </span>
								Submit our form and our team will get back to you.
							</p>
							<Link href="/enquire">
								<Button
									size="lg"
									className="bg-brand-orange text-white mt-5 mx-auto"
								>
									General enquiries
								</Button>
							</Link>
						</div>
						<div className="mt-20 sm:mt-0 pt-0 sm:pt-5 hidden sm:block">
							<ContactCta service={"flights"} />
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
