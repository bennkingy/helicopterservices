import type { carouselItem } from "@/lib/interface";
import Image from "next/image";
import Carousel from "./components/Carousel";
import Enquire from "./components/Enquire";
import FramerAnimationSlide from "./components/FramerAnimationSlideIn";
import Heading from "./components/Heading";
import Hero from "./components/Hero";
import { MainServices } from "./components/MainServices";
import Reviews from "./components/Reviews";
import Tvlogos from "./components/Tvlogos";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title:
		"Helicopter Services | Experienced Helicopter Training | White Waltham Airfield | Maidenhead",
	description:
		"Helicopter Services | Experienced helicopter training for pilots, instructors and examiners | Helicopter charter & photography | Helicopter load lifting & consultancy | London helicopter tours | White Waltham Airfield | Maidenhead",
};

export default async function Home() {
	const items: carouselItem[] = [
		{
			img: "/images/special-events.png",
			title: "Special Events",
			description:
				"Avoid the traffic and arrive in style at your special event.",
			link: "/flights/special-events",
		},
		{
			img: "/images/london millennium dome.png",
			title: "London Sightseeing Tours",
			description: "The ultimate way to see this iconic city at its best.",
			link: "/flights/london-sightseeing-tours",
		},
		{
			img: "/images/Trial lessons.png",
			title: "Helicopter Trail lessons",
			description:
				"Discover the fun and manoeuvrability of a helicopter in 30 minutes!",
			link: "/flights/trail-lessons",
		},
		{
			img: "/images/Local area tours.png",
			title: "Local area tours",
			description: "Experience the UK from the air with our local area tours.",
			link: "/flights/local-area-tours",
		},
		// {
		// 	img: "/images/london millennium dome.png",
		// 	title: "Helicopter Charter",
		// 	description: "Transporting VIPs to special events for over 20 years.",
		// 	link: "/flights/helicopter-charter",
		// },
		// {
		// 	img: "/images/Virtual reality simulator.png",
		// 	title: "Virtual Reality Simulator",
		// 	description:
		// 		"An incredibly realistic experience allowing for all flight profiles.",
		// 	link: "/training/virtual-reality-simulator",
		// },
		{
			img: "/images/private-pilot-licence.png",
			title: "Private pilot license",
			description: "Fly helicopters privately with a private pilot license.",
			link: "/training/private-pilot-licence",
		},
	];

	return (
		<main className="overflow-x-hidden">
			<Hero
				title="Exceeding exacting industry standards"
				height="h-[calc(100lvh_-_65px)] md:h-[calc(100lvh_-_100px)]"
			/>
			<div className="py-20 bg-brand-dark-blue z-[9] relative -mt-[1px]">
				<div className="container">
					<MainServices />
				</div>
			</div>
			<div className="py-20 container mx-auto grid grid-cols-1 md:grid-cols-2 relative">
				<div className="pr-0 relative col-span-1 flex justify-center md:-mt-20 xl:mt-0">
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
								src="/images/helciopter-caves.jpg"
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
						title="Over 20 years helicopter operating experience"
						titleStyles="text-3xl sm:text-4xl"
						tag="About us"
						iconType="Company"
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
							title="From beginner to advanced, you're in expert hands"
							tag="Training"
							iconColor="Blue"
							iconType="Training"
							className="mb-8"
							titleStyles="text-3xl sm:text-4xl text-white"
						/>
						<p className="font-openSans text-white">{`Our highly experienced instructors and examiners are among the UK's most senior. We provide type ratings for over 17+ helicopter types, along with Flight Instructor Refresher and Instrument Rating Examiner courses.`}</p>
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
					<div className="relative col-span-1 flex justify-center mt-20  md:-mt-20 xl:mt-0 mb-20 md:mb-0">
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
				<div className="sm:container">
					<Heading
						title="For gifts, swift transfers and private charters"
						tag="Flights"
						iconColor="Blue"
						center
						className="mb-10"
						titleStyles="text-3xl sm:text-4xl"
					/>
					<Carousel slides={items} />
				</div>
			</div>
			<div className="py-20 container mx-auto grid grid-cols-1 md:grid-cols-2 justify-center relative">
				<div className="pr-0 relative col-span-1 flex justify-center md:-mt-20 lg:mt-0">
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
						title="Elevating industry to new heights"
						tag="Industry"
						iconType="Industry"
						iconColor="Blue"
						className="mb-8 mt-32 md:mt-0"
						titleStyles="text-3xl sm:text-4xl"
					/>
					<p className="font-openSans">
						We can help you get the best shots efficiently with over 20 years of
						experience in aerial photography and filming world-wide in a range
						of locations from city skylines to mountainous regions to deserts
						and oceans.
					</p>
					<p className="font-openSans mt-5">
						Our credits include many promotional videos for blue-chip companies,
						feature films for BBC, ITV, Sky, Channel 4, news gathering missions
						and photography for national newspapers.
					</p>
					<Tvlogos className="my-10" />
					<Enquire />
				</div>
			</div>
			<Reviews className="py-20" />
		</main>
	);
}
