import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { client } from "@/lib/sanity";
import type { Metadata } from "next";
import Link from "next/link";
import ContactCta from "../components/ContactCta";
import Header from "../components/Header";
import Heading from "../components/Heading";
import ServiceCard from "../components/ServiceCard";
import TrainingMap from "../components/TrainingMap";

export const revalidate = 30; // revalidate at most 30 seconds

export const metadata: Metadata = {
	title: "Training - Helicopter Services",
	description:
		"Experienced Helicopter Training | White Waltham Airfield | Maidenhead",
	// openGraph: {
	// 	title: "Training - Helicopter Services",
	// 	description:
	// 		"Helicopter Services | Experienced Helicopter Training | White Waltham Airfield | Maidenhead",
	// 	images: [
	// 		{
	// 			url: "https://cdn.sanity.io/images/0he7nz2b/production/b0089479789c970d270fcea18b0182e1f90b88b7-1200x900.webp?w=1200&h=630&q=100&fit=clip&auto=format",
	// 			width: 1200,
	// 			height: 630,
	// 			alt: "Helicopter Services",
	// 		},
	// 	],
	// },
};

async function getData(slug: string) {
	const query = `
    *[_type == "training" && slug.current == '${slug}'] {
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

export default async function Training({
	params,
}: { params: { slug: string } }) {
	// biome-ignore lint/suspicious/noExplicitAny: TODO: Make a type for the data
	const data: any = await getData("training");

	return (
		<>
			<main className="bg-brand-light-grey overflow-x-hidden z-[1] relative">
				<Header
					className="h-[320px] md:h-[420px] lg:h-[675px]"
					title={data?.hero?.heading}
					tag={data?.hero?.tagline}
					image={data?.hero?.image}
					iconType="Training"
					extraPadding="pb-[28px]"
				/>
				<section className="pb-10 max-w-6xl mx-auto px-4 -mt-[42px] sm:-mt-[50px] z-10 relative">
					<Tabs defaultValue="account">
						<TabsList className="mx-auto mb-7 sm:mb-10 w-full">
							<TabsTrigger value="account" className="">
								Training services
							</TabsTrigger>
							<TabsTrigger value="trainingRoute">
								Training route map
							</TabsTrigger>
						</TabsList>
						<TabsContent value="account">
							<Heading
								title="Licences"
								titleStyles="text-3xl"
								className="mb-6 mt-5"
							/>
							<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
								{data?.service
									?.filter(
										(service: ServiceCard) => service?.category === "Licences",
									)
									// @ts-ignore
									.sort((a, b) => a.heading.localeCompare(b.heading))
									.map(
										(
											{
												category,
												image,
												url,
												heading,
												description,
											}: ServiceCard,
											i: number,
										) => (
											<ServiceCard
												// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
												key={i + 1}
												heading={heading}
												url={url}
												image={image}
												description={description}
												category={category}
											/>
										),
									)}
							</div>
							<Heading
								title="Certificates and Ratings"
								titleStyles="text-3xl"
								className="mb-6 mt-16"
							/>
							<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
								{data?.service
									?.filter(
										(service: ServiceCard) => service?.category === "Ratings",
									)
									// @ts-ignore
									.sort((a, b) => a.heading.localeCompare(b.heading))
									.map(
										(
											{
												category,
												url,
												heading,
												description,
												image,
											}: ServiceCard,
											i: number,
										) => (
											<ServiceCard
												// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
												key={i + 1}
												heading={heading}
												url={url}
												image={image}
												description={description}
												category={category}
											/>
										),
									)}
							</div>
							<Heading
								title="Simulators"
								titleStyles="text-3xl"
								className="mb-6 mt-16"
							/>
							<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
								{data?.service
									?.filter(
										(service: ServiceCard) =>
											service?.category === "Simulators",
									)
									// @ts-ignore
									.sort((a, b) => a.heading.localeCompare(b.heading))
									.map(
										(
											{
												category,
												url,
												heading,
												description,
												image,
											}: ServiceCard,
											i: number,
										) => (
											<ServiceCard
												// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
												key={i + 1}
												heading={heading}
												url={url}
												image={image}
												description={description}
												category={category}
											/>
										),
									)}
							</div>
							<Heading
								title="Other training services"
								titleStyles="text-3xl"
								className="mb-6 mt-16"
							/>
							<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
								{data?.service
									?.filter(
										(service: ServiceCard) => service?.category === "Other",
									)
									// @ts-ignore
									.sort((a, b) => a.heading.localeCompare(b.heading))
									.map(
										(
											{
												category,
												url,
												heading,
												image,
												description,
											}: ServiceCard,
											i: number,
										) => (
											<ServiceCard
												// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
												key={i + 1}
												heading={heading}
												url={url}
												image={image}
												description={description}
												category={category}
											/>
										),
									)}
							</div>
						</TabsContent>
						<TabsContent value="trainingRoute">
							<Heading
								title="Training route map"
								titleStyles="text-3xl text-center mt-5"
							/>
							<p className="font-openSans max-w-[900px] text-center mx-auto mt-8">
								With two decades of experience, we&apos;re a top UK helicopter
								training company. Our instructors cover currency, advanced
								flying, type ratings, and more. All instructors are commercial
								pilots, enriching students aiming for commercial piloting. We
								offer type ratings for 17+ helicopter types and advanced
								training courses. Access our flight simulator for safe
								instrument training and explore our PPL enhancement program.
							</p>
							<p className="text-center w-full mt-8 font-bold mb-10 sm:mb-16">
								Click on a service below for more information
							</p>
							<TrainingMap />
						</TabsContent>
					</Tabs>
					<div className="mb-16 mt-16 grid grid-cols-1 sm:grid-cols-3">
						<div className="col-span-2 pr-0 sm:pr-20">
							<Heading
								title="Can&apos;t find what you&apos;re looking for?"
								titleStyles="text-3xl"
								className="mb-6"
							/>
							<p className="mb-4">
								We have been operating for over 25 years as one of the UK&apos;s
								most experienced helicopter charter, tours, photography,
								load-lifting, and consultancy companies.
							</p>
							<p className="mb-4">
								Whether you are looking for a wonderful gift, a time-efficient
								airport transfer, a private charter for your special occasion,
								help with aerial photograph, a load lifted economically we can
								help you.
							</p>
							<p className="mb-4">
								We adhere to the highest safety standards and many of our
								helicopters are able to fly in reduced visibility or at night.
								We offer both twin-engine or single-engine helicopters and can
								provide two pilots as may be required.
							</p>
							<p>
								<span className="font-bold">Outside office hours? </span>Submit
								our form and our team will get back to you.
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
						<div className="mt-20 sm:mt-0 pt-0 sm:pt-5  hidden sm:block">
							<ContactCta service="training" />
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
