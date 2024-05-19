import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import GetInTouch from "./GetInTouch";
import Weather from "./Weather";
import logo from "/public/images/LogoLightV2New.svg";

export default function Footer() {
	const training: { title: string; href: string }[] = [
		{
			title: "Private pilot license",
			href: "/training/private-pilot-licence",
		},
		{
			title: "Commerical Pilot License",
			href: "/training/commercial-pilot-licence",
		},
		{
			title: "Flight examiner rating",
			href: "/training/flight-examiner-ratings",
		},
		{
			title: "Type rating",
			href: "/training/type-ratings",
		},
		{
			title: "Instrument rating",
			href: "/training/instrument-ratings",
		},
		{
			title: "Flight instructor rating",
			href: "/training/flight-instructor-ratings",
		},
		{
			title: "Night rating",
			href: "/training/night-rating",
		},
		{
			title: "PBN",
			href: "/training/PBN",
		},
		{
			title: "Virtual Reality Simulator",
			href: "/training/virtual-reality-simulator",
		},
		{
			title: "Simulator",
			href: "/training/simulator",
		},
		{
			title: "ELCAS",
			href: "/training/ELCAS",
		},
		{
			title: "FAA",
			href: "/training/FAA",
		},
		{
			title: "Refresher seminars",
			href: "/training/refresher-seminars",
		},
		{
			title: "Advanced flying programme",
			href: "/training/advanced-flying-programme",
		},
	];

	const flights: { title: string; href: string }[] = [
		{
			title: "Airpot transfers",
			href: "/flights/airport-transfers",
		},
		{
			title: "Helicopter Charter",
			href: "/flights/helicopter-charter",
		},
		{
			title: "London sightseeing",
			href: "/flights/london-sightseeing",
		},
		{
			title: "Special events",
			href: "/flights/special-events",
		},
		{
			title: "Trail lessons",
			href: "/flights/trail-lessons",
		},
		{
			title: "Local area tours",
			href: "/flights/local-area-tours",
		},
	];

	const industry: { title: string; href: string }[] = [
		{
			title: "Photography and filming",
			href: "/flights/airport-transfers",
		},
		{
			title: "Load lifting",
			href: "/flights/helicopter-charter",
		},
	];

	return (
		<>
			<GetInTouch />
			<div className="bg-brand-dark-blue dark:bg-black text-white py-20 border-t-4 border-brand-light-blue">
				<div className="mx-auto flex flex-wrap container justify-between flex-col sm:flex-row">
					<div>
						<Link href="/" className="font-mono text-lg font-bold start">
							<Image
								src={logo}
								alt="Helicopter Services"
								width={153}
								height={43}
								className="min-w-[100px] mb-10"
							/>
						</Link>
						<div className="text-sm mb-3 mt-6 sm:mt-0 font-bold font-openSans">
							Contact
						</div>
						<p>
							Helicopter Services
							<br />
							White Waltham Airfield
							<br />
							Maidenhead
							<br />
							Berkshire
							<br />
							<a href="/" className="text-brand-light-blue">
								SL6 3NJ
							</a>
						</p>
						<div className="text-sm font-bold my-5 mb-3 mt-6 font-openSans">
							Social
						</div>
						<ul>
							<Link href="#" passHref>
								<li className="flex text-brand-light-blue font-bold">
									<Image
										src="/images/facebook.png"
										width={25}
										height={25}
										alt=""
										className="mt-1 mr-1"
									/>
									Instagram
								</li>
							</Link>
							<li className="flex text-brand-light-blue font-bold">
								<Image
									src="/images/instagram.png"
									width={20}
									height={20}
									alt=""
									className="mt-1 mr-[7px] ml-[2px]"
								/>
								Facebook
							</li>
						</ul>
						<div className="text-sm font-bold mb-3 mt-7 font-openSans">
							Legals
						</div>
						<ul>
							<Link href="cookies" passHref>
								<li className="transition-colors hover:text-brand-light-blue">
									Cookies
								</li>
							</Link>
							<Link href="Policy" passHref>
								<li className="transition-colors hover:text-brand-light-blue">
									Policy
								</li>
							</Link>
							<Link href="terms-conditions" passHref>
								<li className="transition-colors hover:text-brand-light-blue">
									Terms and conditions
								</li>
							</Link>
						</ul>
					</div>
					<div className="">
						<div className="text-sm font-bold mb-3 mt-5 sm:mt-0 font-openSans">
							Training
						</div>
						<ul>
							{training
								.sort((a, b) => a.title.localeCompare(b.title))
								.map((item, index) => (
									<Link href={item.href} key={index} passHref>
										<li className="transition-colors hover:text-brand-light-blue">
											{item.title}
										</li>
									</Link>
								))}
						</ul>
					</div>
					<div className="">
						<div className="text-sm mb-3 mt-6 sm:mt-0 font-bold font-openSans">
							Flight
						</div>
						<ul>
							{flights
								.sort((a, b) => a.title.localeCompare(b.title))
								.map((item, index) => (
									<Link href={item.href} key={index} passHref>
										<li className="transition-colors hover:text-brand-light-blue">
											{item.title}
										</li>
									</Link>
								))}
						</ul>
						<div className="text-sm mb-3 mt-6 font-bold font-openSans">
							Industry
						</div>
						<ul>
							{industry
								.sort((a, b) => a.title.localeCompare(b.title))
								.map((item, index) => (
									<Link href={item.href} key={index} passHref>
										<li className="transition-colors hover:text-brand-light-blue">
											{item.title}
										</li>
									</Link>
								))}
						</ul>
					</div>
					<div className="mt-20 md:mt-0 max-w-80">
						<Suspense
							fallback={<p className="bg-red">Loading weather data...</p>}
						>
							<Weather />
						</Suspense>
						{/* <div className="mt-9 sm:mt-6">
							<Suspense
								fallback={<p className="bg-red">Loading weather data...</p>}
							>
								<Weather
									lat={51.49028}
									lon={-0.77294}
									airport="West London Aero Club"
								/>
							</Suspense>
						</div> */}
					</div>
				</div>
			</div>
		</>
	);
}
