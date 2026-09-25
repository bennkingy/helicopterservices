import { getAboutPage } from "@/lib/about";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Image from "next/image";
import FramerAnimationSlide from "../components/FramerAnimationSlideIn";
import Heading from "../components/Heading";
import HelicopterCard from "../components/HelicopterCard";
import Hero from "../components/Hero";
import Reviews from "../components/Reviews";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 30; // revalidate at most 30 seconds

export async function generateMetadata(): Promise<Metadata> {
	const { seoTitle, seoDescription } = await getAboutPage();
	return pageMetadata(
		{ title: seoTitle, description: seoDescription },
		"/about-us",
	);
}

export default async function About() {
	const {
		heroTitle,
		intro,
		award,
		moreHeading,
		moreNote,
		servicesHeading,
		aboutPages,
		servicePages,
	} = await getAboutPage();

	return (
		<main className="overflow-x-hidden">
			<Hero
				title={heroTitle.split("\n").join("<br/>")}
				height="h-[calc(100lvh_-_65px)] md:h-[calc(100lvh_-_100px)]"
			/>
			<div className="py-20 container mx-auto grid grid-cols-1 md:grid-cols-2 relative">
				<div className="pr-0 sm:pr-20">
					<Heading
						title={intro.heading}
						tag={intro.tag}
						titleStyles="text-3xl sm:text-4xl"
						className="mb-8"
					/>
					{intro.body.map((paragraph) => (
						<p key={paragraph} className="font-openSans mt-5">
							{paragraph}
						</p>
					))}
					<Image
						src="/images/signature.svg"
						alt={`Signature of ${intro.signatureName}`}
						width={139}
						height={43}
						className="min-w-[100px] mt-7"
					/>
					<p className="mt-3 font-bold font-openSans">{intro.signatureName}</p>
					<p className="mt-0 text-brand-light-blue font-openSans">
						{intro.signatureRole}
					</p>
					<p className="mt-0 font-openSans">{intro.signatureCompany}</p>
				</div>
				<div className="relative col-span-1 flex justify-center mt-12 md:mt-0 :mb-0">
					<FramerAnimationSlide
						items={[
							<Image
								{...intro.mainImage}
								key={1}
								className="pr-10 md:pl-10 sm:pr-10 md:pr-10 lg:pr-20"
							/>,
							<Image
								{...intro.secondaryImage}
								key={2}
								className="absolute -bottom-20 xl:bottom-20 right-0 border-8 border-white drop-shadow-sm shadow-xl max-w-[200px] sm:w-full"
							/>,
						]}
					/>
				</div>
			</div>
			<div className="pt-0 pb-6 container mx-auto grid grid-cols-1 md:grid-cols-2 relative">
				<div className="mt-10 sm:mt-20 md:mt-0 pr-0 relative col-span-1 flex justify-start">
					<FramerAnimationSlide
						className="w-full"
						items={[
							<Image
								{...award.mainImage}
								key={1}
								className="w-full h-auto pr-10 lg:pr-24"
							/>,
							<Image
								{...award.secondaryImage}
								key={2}
								className="absolute -bottom-20 xl:bottom-20 right-0 lg:right-14 border-8 border-white drop-shadow-sm shadow-xl max-w-[200px] sm:w-full"
							/>,
						]}
					/>
				</div>
				<div className="pl-0 md:pl-10 order-first md:order-none md:self-center">
					<Heading
						title={award.heading}
						className="mb-8 mt-16 md:mt-0"
						titleStyles="text-3xl sm:text-4xl"
					/>
					{award.body.map((paragraph, index) => (
						<p
							key={paragraph}
							className={index > 0 ? "font-openSans mt-5" : "font-openSans"}
						>
							{paragraph}
						</p>
					))}
					<Image {...award.logo} className="mt-10" />
				</div>
			</div>
			<div className="container mb-20 mt-32 xl:mt-0">
				<h2 className="text-2xl sm:text-3xl font-bold font-workSans mt-12 text-brand-dark-blue mb-6">
					{moreHeading}
				</h2>
				<div className="flex sm:max-w-[370px] mb-6">
					<Image
						priority
						src={"/images/3d-rotate-Dark.svg"}
						alt="3d view of helicopter cockpit"
						width={53}
						height={47}
						className="mr-4"
					/>
					<p>{moreNote}</p>
				</div>
				<div
					className={cn(
						"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-y-2 gap-x-10",
					)}
				>
					{aboutPages.map((page: any) => (
						<HelicopterCard
							key={page.slug}
							helicopter={page}
							url={"about-us/"}
							type="About us"
						/>
					))}
				</div>
			</div>
			<div className="container mb-24">
				<h2 className="text-2xl sm:text-3xl font-bold font-workSans mt-12 text-brand-dark-blue mb-6">
					{servicesHeading}
				</h2>
				<div
					className={cn(
						"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-y-2 gap-x-10",
					)}
				>
					{servicePages.map((page: any) => (
						<HelicopterCard key={page.slug} helicopter={page} type="Services" />
					))}
				</div>
			</div>
			<Reviews className="py-20" />
		</main>
	);
}
