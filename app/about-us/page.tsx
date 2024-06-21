import type { Metadata } from "next";
import Image from "next/image";
import FramerAnimationSlide from "../components/FramerAnimationSlideIn";
import Heading from "../components/Heading";
import Hero from "../components/Hero";
import Reviews from "../components/Reviews";

export const metadata: Metadata = {
	title: "About us - Helicopter Services",
	description: "Helicopter Services",
};

export default async function About() {
	return (
		<main className="overflow-x-hidden">
			<Hero
				title="About Helicopter Services"
				height="h-[calc(100lvh_-_65px)] sm:h-[calc(100lvh_-_100px)]"
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
						business end of examining a candidate’s procedural flying for a
						commercial company we set out to make flying safe and fun for you.
					</p>
					<p className="font-openSans mt-5">
						Our lovely new hangar with great facilities at White Waltham is so
						convenient for flying and we have built a team who are dedicated to
						helping you enjoy and advance your flying.
					</p>
					<p className="font-openSans mt-5">
						If you feel like joining the “Aviation Nation, Helicopter Tribe”
						please contact us ...and be aware that this helicopter flying
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
						Head Pilot / Chief Pilot
					</p>
					<p className="mt-0 font-openSans">Helicopter Services</p>
				</div>
				<div className="relative col-span-1 flex justify-center mt-20 md:mt-0 :mb-0">
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
			<div className="py-20 pt-0 container mx-auto grid grid-cols-1 md:grid-cols-2 relative">
				<div className="mt-10 sm:mt-20 md:mt-0 pr-0 relative col-span-1 flex justify-center mb-20 md:mb-10">
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
						Britannia Trophy, 2018 by the Royal Aero Club of the United
						Kingdom nominated by the Helicopter Club of Great Britain for his
						Three Journeys Round project.
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
			<Reviews className="py-20" />
		</main>
	);
}
