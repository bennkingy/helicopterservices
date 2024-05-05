import type { carouselItem } from "@/lib/interface";
import Image from "next/image";
import Carousel from "./components/Carousel";
import Enquire from "./components/Enquire";
import FramerAnimationSlide from "./components/FramerAnimationSlideIn";
import Heading from "./components/Heading";
import Hero from "./components/Hero";
import { MainServices } from "./components/MainServices";
import Reviews from "./components/Reviews";

export default async function Home() {
	const items: carouselItem[] = [
		{
			img: "/images/circle-heli.png",
			title: "Airport Transfer",
			description:
				"We offer training from Private Pilots license to Commercial, instruments, instructor and examiner ratings.",
			link: "/#",
		},
		{
			img: "/images/circle-heli.png",
			title: "City Tours",
			description:
				"Explore the city's top attractions with our experienced guides.",
			link: "/tours",
		},
		{
			img: "/images/circle-heli.png",
			title: "Hotel Services",
			description: "Enjoy our world-class accommodations and hospitality.",
			link: "/hotels",
		},
		{
			img: "/images/circle-heli.png",
			title: "Dining Experiences",
			description: "Taste the best local and international cuisines.",
			link: "/dining",
		},
		{
			img: "/images/circle-heli.png",
			title: "Adventure Sports",
			description:
				"Get your adrenaline pumping with our adventure sports packages.",
			link: "/adventures",
		},
	];

	return (
		<main className="overflow-x-hidden">
			<Hero
				title="Exceeding exacting industry standards."
				height="h-[calc(100vh_-_0px)] sm:h-[calc(100vh_-_0px)]"
			/>
			<div className="py-20 bg-brand-dark-blue">
				<div className="container">
					<MainServices />
				</div>
			</div>
			<div className="py-20 container mx-auto grid grid-cols-1 md:grid-cols-2 relative">
				<div className="pr-0 relative col-span-1 flex justify-center">
					<FramerAnimationSlide
						items={[
							<Image
								quality={100}
								src="/images/grandad-helicopter.png"
								alt="Helicopter Services"
								width={1000}
								key={1}
								height={1000}
								className="pr-10 sm:pr-10 md:pr-10 lg:pr-32"
							/>,
							<Image
								quality={100}
								src="/images/grandad.png"
								alt="Helicopter Services"
								width={240}
								height={240}
								key={2}
								className="absolute -bottom-20 xl:bottom-20 right-0 lg:right-14 border-8 border-white drop-shadow-sm shadow-xl max-w-[200px] sm:w-full"
							/>,
						]}
					/>
				</div>
				<div className="md:pl-10">
					<Heading
						title="Over 20 years helicopter operating experience."
						titleStyles="text-3xl sm:text-4xl"
						tag="About us"
						className="mb-8 mt-32 md:mt-0"
					/>
					<p className="font-openSans">
						We offer training from Private Pilot’s Licence to Commercial,
						Instruments, Instructor, and Examiner Ratings. Our senior
						instructors/examiners in the UK provide type ratings on 17+
						helicopter types, and advanced courses. For gifts, transfers,
						charters, photography, load lifting, flight learning, helicopter
						purchase, AOC management, or medical info, we’re here.
					</p>
					<ul className="max-w-md space-y-1 mt-5 list-inside font-openSans">
						<li className="flex items-center">
							<svg
								className="w-3.5 h-3.5 me-2 text-brand-light-blue flex-shrink-0"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
							</svg>
							Experienced pilots & instructors
						</li>
						<li className="flex items-center">
							<svg
								className="w-3.5 h-3.5 me-2 text-brand-light-blue flex-shrink-0"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
							</svg>
							Professional & accommodating
						</li>
						<li className="flex items-center">
							<svg
								className="w-3.5 h-3.5 me-2 text-brand-light-blue flex-shrink-0"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
							</svg>
							Excellent customer service
						</li>
						<li className="flex items-center">
							<svg
								className="w-3.5 h-3.5 me-2 text-brand-light-blue flex-shrink-0"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
							</svg>
							Operating safely since 2000
						</li>
						<li className="flex items-center">
							<svg
								className="w-3.5 h-3.5 me-2 text-brand-light-blue flex-shrink-0"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
							</svg>
							Exceeding exacting industry standards
						</li>
					</ul>
					<Image
						src="/images/signature.svg"
						alt="Helicopter Services"
						width={139}
						height={43}
						quality={100}
						className="min-w-[100px] mt-7"
					/>
					<p className="mt-3 font-bold font-openSans">Captain Leon Smith</p>
					<p className="mt-0 text-brand-light-blue font-openSans">
						Head Pilot / Chief Pilot
					</p>
					<p className="mt-0 font-openSans -mb-[5px]">Helicopter Services</p>
				</div>
			</div>
			<div className="py-20 bg-brand-dark-blue">
				<div className="container relative mx-auto grid grid-cols-1 md:grid-cols-2">
					<div className="md:pr-10">
						<Heading
							title="From beginner to advanced, you're in expert hands."
							tag="training"
							iconColor="light-blue"
							className="mb-8"
							titleStyles="text-3xl sm:text-4xl text-white"
						/>
						<p className="font-openSans text-white">{`Our highly experienced instructors and examiners are among the UK's most senior. We provide type ratings for over 17 helicopter types, along with Flight Instructor Refresher and Instrument Rating Examiner courses.`}</p>
						<p className="font-openSans mt-5 text-white">
							Additionally, we offer a helicopter flight simulator for safe
							instrument flying skill development and an advanced program to
							enhance PPL skills.
						</p>
						<div className="flex space-x-5 my-10">
							<Image
								src="/images/easa.svg"
								alt="Helicopter Services"
								width={109}
								height={36}
								quality={100}
							/>
							<Image
								src="/images/caa.svg"
								alt="Helicopter Services"
								width={50}
								quality={100}
								height={38}
							/>
						</div>
						<Enquire textStyle="text-white" />
					</div>
					<div className="relative col-span-1 flex justify-center mt-20 md:mt-0 mb-20 md:mb-0">
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
			</div>
			<div className="pb-20 pt-20 bg-brand-light-grey">
				<div className="container">
					<Heading
						title="For gifts, swift transfers and private charters."
						tag="Flights"
						iconColor="light-blue"
						center
						className="mb-10"
						titleStyles="text-3xl sm:text-4xl"
					/>
					<Carousel slides={items} />
				</div>
			</div>
			<div className="py-20 container mx-auto grid grid-cols-1 md:grid-cols-2 justify-center relative">
				<div className="pr-0 relative col-span-1 flex justify-center">
					<FramerAnimationSlide
						items={[
							<Image
								src="/images/loadlifting.png"
								alt="Helicopter Services"
								width={1000}
								quality={100}
								key={1}
								height={1000}
								className="pr-10 sm:pr-10 md:pr-10 lg:pr-32"
							/>,
							<Image
								src="/images/planes.jpg"
								alt="Helicopter Services"
								width={240}
								quality={100}
								height={240}
								key={2}
								className="absolute -bottom-20 lg:bottom-20 right-0 lg:right-14 border-8 border-white drop-shadow-sm shadow-xl max-w-[200px] sm:w-full"
							/>,
						]}
					/>
				</div>
				<div className="md:pl-10">
					<Heading
						title="Elevating industry to new heights."
						tag="Industry"
						iconColor="light-blue"
						className="mb-8 mt-32 md:mt-0"
						titleStyles="text-3xl sm:text-4xl"
					/>
					<p className="font-openSans">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation.
					</p>
					<p className="font-openSans mt-5">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation.
					</p>
					<ul className="max-w-md space-y-1 mt-5 list-inside font-openSans">
						<li className="flex items-center">
							<svg
								className="w-3.5 h-3.5 me-2 text-brand-light-blue flex-shrink-0"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
							</svg>
							Lorem ipsum dolor
						</li>
						<li className="flex items-center">
							<svg
								className="w-3.5 h-3.5 me-2 text-brand-light-blue flex-shrink-0"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
							</svg>
							Amet, consectetur
						</li>
						<li className="flex items-center">
							<svg
								className="w-3.5 h-3.5 me-2 text-brand-light-blue flex-shrink-0"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
							</svg>
							Adipiscing elit, sed do
						</li>
						<li className="flex items-center">
							<svg
								className="w-3.5 h-3.5 me-2 text-brand-light-blue flex-shrink-0"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
							</svg>
							Mod tempor incididunt
						</li>
						<li className="flex items-center">
							<svg
								className="w-3.5 h-3.5 me-2 text-brand-light-blue flex-shrink-0"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
							</svg>
							Labore et dolore magna aliqua
						</li>
					</ul>
					<Enquire className="mt-7" />
				</div>
			</div>
			<Reviews className="py-20" />
		</main>
	);
}
