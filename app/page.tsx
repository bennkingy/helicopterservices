import { getHomepage } from "@/lib/homepage";
import type { Metadata } from "next";
import Image from "next/image";
import Carousel from "./components/Carousel";
import Enquire from "./components/Enquire";
import FramerAnimationSlide from "./components/FramerAnimationSlideIn";
import Heading from "./components/Heading";
import Hero from "./components/Hero";
import { MainServices } from "./components/MainServices";
import Reviews from "./components/Reviews";
import Tvlogos from "./components/Tvlogos";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 30; // revalidate at most 30 seconds

export async function generateMetadata(): Promise<Metadata> {
	const { seoTitle, seoDescription } = await getHomepage();
	return pageMetadata({ title: seoTitle, description: seoDescription }, "/");
}

const Tick = () => (
	<svg
		className="w-3.5 h-3.5 me-2 text-brand-light-blue flex-shrink-0"
		aria-hidden="true"
		xmlns="http://www.w3.org/2000/svg"
		fill="currentColor"
		viewBox="0 0 20 20"
	>
		<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
	</svg>
);

export default async function Home() {
	const { heroTitle, services, about, training, flights, industry } =
		await getHomepage();

	return (
		<main className="overflow-x-hidden">
			<Hero
				title={heroTitle.split("\n").join("<br/>")}
				height="h-[calc(100lvh_-_65px)] md:h-[calc(100lvh_-_100px)]"
			/>
			<div className="py-20 bg-brand-dark-blue z-[9] relative -mt-[1px]">
				<div className="container">
					<MainServices cards={services} />
				</div>
			</div>
			<div className="py-20 container mx-auto grid grid-cols-1 md:grid-cols-2 relative">
				<div className="pr-0 relative col-span-1 flex justify-center md:-mt-20 xl:mt-0">
					<FramerAnimationSlide
						items={[
							<Image
								{...about.mainImage}
								key={1}
								className="pr-10 sm:pr-10 md:pr-10 lg:pr-32"
							/>,
							<Image
								{...about.secondaryImage}
								key={2}
								className="absolute -bottom-20 xl:bottom-20 right-0 lg:right-14 border-8 border-white drop-shadow-sm shadow-xl max-w-[200px] sm:w-full"
							/>,
						]}
					/>
				</div>
				<div className="md:pl-10">
					<Heading
						title={about.heading}
						titleStyles="text-3xl sm:text-4xl"
						tag={about.tag}
						iconType="Company"
						className="mb-8 mt-32 md:mt-0"
					/>
					{about.body.map((paragraph, index) => (
						<p
							key={paragraph}
							className={index > 0 ? "font-openSans mt-5" : "font-openSans"}
						>
							{paragraph}
						</p>
					))}
					<ul className="max-w-md space-y-1 mt-5 list-inside font-openSans">
						{about.bulletPoints.map((point) => (
							<li key={point} className="flex items-center">
								<Tick />
								{point}
							</li>
						))}
					</ul>
					<Image
						src="/images/signature.svg"
						alt={`Signature of ${about.signatureName}`}
						width={139}
						height={43}
						className="min-w-[100px] mt-7"
					/>
					<p className="mt-3 font-bold font-openSans">{about.signatureName}</p>
					<p className="mt-0 text-brand-light-blue font-openSans">
						{about.signatureRole}
					</p>
					<p className="mt-0 font-openSans -mb-[5px]">
						{about.signatureCompany}
					</p>
				</div>
			</div>
			<div className="py-20 bg-brand-dark-blue">
				<div className="container relative mx-auto grid grid-cols-1 md:grid-cols-2">
					<div className="md:pr-10">
						<Heading
							title={training.heading}
							tag={training.tag}
							iconColor="Blue"
							iconType="Training"
							className="mb-8"
							titleStyles="text-3xl sm:text-4xl text-white"
						/>
						{training.body.map((paragraph, index) => (
							<p
								key={paragraph}
								className={
									index > 0
										? "font-openSans mt-5 text-white"
										: "font-openSans text-white"
								}
							>
								{paragraph}
							</p>
						))}
						<div className="flex space-x-5 my-10">
							<Image
								src="/images/caa.svg"
								alt="UK Civil Aviation Authority approved"
								width={50}
								height={38}
							/>
							<Image
								src="/images/easa.svg"
								alt="European Union Aviation Safety Agency approved"
								width={109}
								height={36}
							/>
						</div>
						<Enquire textStyle="text-white" />
					</div>
					<div className="relative col-span-1 flex justify-center mt-20  md:-mt-20 xl:mt-0 mb-20 md:mb-0">
						<FramerAnimationSlide
							items={[
								<Image
									{...training.mainImage}
									key={1}
									className="pr-10 md:pl-10 sm:pr-10 md:pr-10 lg:pr-20"
								/>,
								<Image
									{...training.secondaryImage}
									key={2}
									className="absolute -bottom-20 xl:bottom-20 right-0 border-8 border-white drop-shadow-sm shadow-xl max-w-[200px] sm:w-full"
								/>,
							]}
						/>
					</div>
				</div>
			</div>
			<div className="pb-20 pt-20 bg-brand-light-grey">
				<div className="sm:container">
					<Heading
						title={flights.heading}
						tag={flights.tag}
						iconColor="Blue"
						center
						className="mb-10"
						titleStyles="text-3xl sm:text-4xl"
					/>
					<Carousel slides={flights.slides} />
				</div>
			</div>
			<div className="py-20 container mx-auto grid grid-cols-1 md:grid-cols-2 justify-center relative">
				<div className="pr-0 relative col-span-1 flex justify-center md:-mt-20 lg:mt-0">
					<FramerAnimationSlide
						items={[
							<Image
								{...industry.mainImage}
								key={1}
								className="pr-10 sm:pr-10 md:pr-10 lg:pr-32"
							/>,
							<Image
								{...industry.secondaryImage}
								key={2}
								className="absolute -bottom-20 lg:bottom-20 right-0 lg:right-14 border-8 border-white drop-shadow-sm shadow-xl max-w-[200px] sm:w-full"
							/>,
						]}
					/>
				</div>
				<div className="md:pl-10">
					<Heading
						title={industry.heading}
						tag={industry.tag}
						iconType="Industry"
						iconColor="Blue"
						className="mb-8 mt-32 md:mt-0"
						titleStyles="text-3xl sm:text-4xl"
					/>
					{industry.body.map((paragraph, index) => (
						<p
							key={paragraph}
							className={index > 0 ? "font-openSans mt-5" : "font-openSans"}
						>
							{paragraph}
						</p>
					))}
					<Tvlogos className="my-10" />
					<Enquire />
				</div>
			</div>
			<Reviews className="py-20" />
		</main>
	);
}
