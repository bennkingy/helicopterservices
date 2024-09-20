import Image from "next/image";
import FramerAnimationSlide from "../components/FramerAnimationSlideIn";
import Heading from "../components/Heading";
import Hero from "../components/Hero";
import Reviews from "../components/Reviews";
import HelicopterCard from "../components/HelicopterCard";
import { cn } from "@/lib/utils";
import { client } from "@/lib/sanity";
import type { Metadata } from "next";

export const revalidate = 40; // revalidate at most 30 seconds

export const metadata: Metadata = {
	title: "About us - Helicopter Services",
	description: "Helicopter Services",
};

async function getPageData(slug: string) {
	const query = `
    *[_type == "about" && slug.current == '${slug}'][0] {
      "currentSlug": slug.current,
      title,
      seoTitle,
      seoDescription,
      "aboutPages": aboutSection[]->{
        title,
        "slug": slug.current,
        seoTitle,
        seoDescription,
								"mainImage": {
							...hero.image,
							"image": hero.image.asset->url,
							"metadata": hero.image.asset->metadata {
								dimensions,
								lqip
							},
							"altText": hero.image.altText
							},
      },
      "servicePages": servicesSection[]->{
        title,
        "slug": slug.current,
        seoTitle,
        seoDescription,
			"mainImage": {
							...hero.image,
							"image": hero.image.asset->url,
							"metadata": hero.image.asset->metadata {
								dimensions,
								lqip
							},
							"altText": hero.image.altText
						},
      }
    }
  `;
	const data = await client.fetch(query);

	return data;
}

export default async function About() {
	const data: any = await getPageData("about-us");

	return (
		<main className="overflow-x-hidden">
			<Hero
				title="About Helicopter<br/>Services"
				height="h-[calc(100lvh_-_65px)] md:h-[calc(100lvh_-_100px)]"
			/>
			<div className="py-20 container mx-auto grid grid-cols-1 md:grid-cols-2 relative">
				<div className="pr-0 sm:pr-20">
					<Heading
						title="Making your flying experience outstanding"
						tag="About us"
						titleStyles="text-3xl sm:text-4xl"
						className="mb-8"
					/>
					<p className="font-openSans mt-5">
						At Helicopter Services we have the aviation experience to make your
						experience of flying outstanding.
					</p>
					<p className="font-openSans mt-5">
						From that excited adrenalin rush of your very first flight to the
						business end of examining a candidate&apos;s procedural flying for a
						commercial company we set out to make flying safe and fun for you.
					</p>
					<p className="font-openSans mt-5">
						Our lovely new hangar with great facilities at White Waltham is so
						convenient for flying and we have built a team who are dedicated to
						helping you enjoy and advance your flying.
					</p>
					<p className="font-openSans mt-5">
						If you feel like joining the “Aviation Nation, Helicopter Tribe”
						please contact us... and be aware that this helicopter flying
						malarkey is addictive!
					</p>
					<Image
						src="/images/signature.svg"
						alt="Helicopter Services"
						width={139}
						height={43}
						className="min-w-[100px] mt-7"
					/>
					<p className="mt-3 font-bold font-openSans">Captain Leon Smith</p>
					<p className="mt-0 text-brand-light-blue font-openSans">
						Head of Training and Chief Pilot
					</p>
					<p className="mt-0 font-openSans">Helicopter Services</p>
				</div>
				<div className="relative col-span-1 flex justify-center mt-12 md:mt-0 :mb-0">
					<FramerAnimationSlide
						items={[
							<Image
								src="/images/flying.png"
								alt="Helicopter Services"
								width={1000}
								key={1}
								height={1000}
								quality={100}
								className="pr-10 md:pl-10 sm:pr-10 md:pr-10 lg:pr-20"
							/>,
							<Image
								src="/images/vr.jpg"
								alt="Helicopter Services"
								width={240}
								height={240}
								key={2}
								quality={100}
								className="absolute -bottom-20 xl:bottom-20 right-0 border-8 border-white drop-shadow-sm shadow-xl max-w-[200px] sm:w-full"
							/>,
						]}
					/>
				</div>
			</div>
			<div className="pt-0 pb-6 container mx-auto grid grid-cols-1 md:grid-cols-2 relative">
				<div className="mt-10 sm:mt-20 md:mt-0 pr-0 relative col-span-1 flex justify-center">
					<FramerAnimationSlide
						items={[
							<Image
								src="/images/trophy.png"
								alt="Helicopter Services"
								width={1000}
								key={1}
								height={1000}
								quality={100}
								className="pr-10 sm:pr-10 md:pr-10 lg:pr-32"
							/>,
							<Image
								src="/images/trophy-award.png"
								alt="Helicopter Services"
								width={240}
								height={240}
								quality={100}
								key={2}
								className="absolute -bottom-20 xl:bottom-20 right-0 lg:right-14 border-8 border-white drop-shadow-sm shadow-xl max-w-[200px] sm:w-full"
							/>,
						]}
					/>
				</div>
				<div className="pl-0 md:pl-10 order-first md:order-none">
					<Heading
						title="The Britannia Trophy 2018"
						className="mb-8 mt-16 md:mt-0"
						titleStyles="text-3xl sm:text-4xl"
					/>
					<p className="font-openSans">
						We supported one of our own pilots with an advanced flying
						development programme. It was a proud moment when he was awarded the
						Britannia Trophy, 2018 by the Royal Aero Club of the United Kingdom
						nominated by the Helicopter Club of Great Britain for his Three
						Journeys Round project.
					</p>
					<p className="font-openSans mt-5">
						Here Peter Wilson is pictured with our Head of Training, Leon Smith.
						Well done!
					</p>
					<Image
						src="/images/the-royal-areo-club.png"
						alt="Helicopter Services"
						width={1000}
						height={1000}
						className="mt-10"
					/>
				</div>
			</div>
			<div className="container mb-20 mt-32 xl:mt-0">
				<h1 className="text-2xl sm:text-3xl font-bold font-workSans mt-12 text-brand-dark-blue mb-6">
					More on Helicopter Services
				</h1>
				<div className="flex sm:max-w-[370px] mb-6">
					<Image
						priority
						quality={100}
						src={"/images/3d-rotate-Dark.svg"}
						alt=""
						width={53}
						height={47}
						className="mr-4"
					/>
					<p>
						Some of our helicopter fleet pages feature 3D tours of the cockpit.
					</p>
				</div>
				<div
					className={cn(
						"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-y-2 gap-x-10",
					)}
				>
					{data?.aboutPages.map((helicopter: any, idx: number) => (
						<HelicopterCard
							key={idx}
							helicopter={helicopter}
							url={"about-us/"}
							type="About us"
						/>
					))}
				</div>
			</div>
			<div className="container mb-24">
				<h1 className="text-2xl sm:text-3xl font-bold font-workSans mt-12 text-brand-dark-blue mb-6">
					Our services
				</h1>
				<div
					className={cn(
						"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-y-2 gap-x-10",
					)}
				>
					{data?.servicePages.map((helicopter: any, idx: number) => (
						<HelicopterCard key={idx} helicopter={helicopter} type="Services" />
					))}
				</div>
			</div>
			{/*}
			<h1 className="text-xl font-bold font-workSans mt-12 text-brand-dark-blue">
				Our services
			</h1>
			<div
				className={cn(
					"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 mb-2",
				)}
			>
				{data2
					?.filter((helicopter: any) => helicopter?.category === "Single")
					// @ts-ignore
					.sort((a, b) => a.heading.localeCompare(b.heading))
					.map((helicopter: any, idx: number) => (
						<HelicopterCard key={idx} helicopter={helicopter} />
					))}
			</div> */}
			<Reviews className="py-20" />
		</main>
	);
}
