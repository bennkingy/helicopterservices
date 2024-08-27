// @ts-nocheck

import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import GetInTouch from "./GetInTouch";
import Weather from "./Weather";
import logo from "/public/images/LogoLightV2New.svg";
import { mapLocation } from "@/lib/constants";
import TextLink from "./TextLink";

import { client } from "@/lib/sanity";
import { groq } from "next-sanity";

// GROQ query to fetch the necessary navigation data
const query = groq`
{
  "fleet": *[_type == "fleet"] {
    title,
    engineType,
    "slug": slug.current,
  },
  "training": *[_type == "training"] {
    title,
    category,
    shortTitle,
    "slug": slug.current,
  },
  "flights": *[_type == "flights"] {
    title,
    category,
    shortTitle,
    "slug": slug.current,
  },
  "about": *[_type == "about"] {
    title,
    "slug": slug.current,
  },
  "legal": *[_type == "legal"] {
    title,
    "slug": slug.current,
  },
  "industry": *[_type == "industry"] {
    title,
    "slug": slug.current,
  }
}`;

async function getNavigationData() {
	// @ts-ignore
	let data;

	try {
		data = await client.fetch(query);
	} catch (error) {
		console.error("Failed to fetch navigation data:", error);
	}

	return data;
}

export default async function Footer() {
	const data = await getNavigationData();

	const currentYear = new Date().getFullYear(); // Get the current year

	return (
		<>
			<GetInTouch />
			{data && (
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
							{/* <div className="text-sm mb-3 mt-6 sm:mt-0 font-bold font-openSans">
								Approvals
							</div>
							<p className="max-w-[250px]">
								Helicopter Services is CAA and EASA approved and certified under
								AOC GB2128 (V21 Ltd T/A Helicopter Services).
							</p> */}
							<div className="text-sm mb-3 mt-6 font-bold font-openSans">
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
								<Link
									href={mapLocation}
									target="_blank"
									className="text-brand-orange hover:text-brand-light-blue"
								>
									SL6 3NJ
								</Link>
							</p>
							<div className="text-sm font-bold my-5 mb-3 mt-6 font-openSans">
								Social
							</div>
							{/* https://twitter.com/HeliServicesUK */}
							<ul>
								<li className="font-normal text-brand-orange hover:text-brand-light-blue">
									<Link
										href="https://www.facebook.com/heliservicesuk/"
										passHref
										className="flex font-normal"
										target="_blank"
									>
										<Image
											src="/images/facebook.png"
											width={25}
											height={25}
											alt=""
											className="mt-1 mr-1"
										/>
										Instagram
									</Link>
								</li>
								<li className="text-brand-orange font-normal hover:text-brand-light-blue">
									<Link
										href="https://www.instagram.com/helicopterservices/"
										passHref
										className="flex"
										target="_blank"
									>
										<Image
											src="/images/instagram.png"
											width={20}
											height={20}
											alt=""
											className="mt-1 mr-[7px] ml-[2px]"
										/>
										Facebook
									</Link>
								</li>
							</ul>
							<div className="text-xs font-bold mb-3 mt-7 font-openSans">
								{/* '' */}
							</div>
							<ul>
								{data?.legal
									.sort((a, b) => a.title.localeCompare(b.title))
									.map((item, index) => (
										<li
											className="transition-colors hover:text-brand-orange text-sm mb-[2px]"
											key={index}
										>
											<Link href={`/legal/${item.slug}`} passHref>
												{item?.shortTitle ? item?.shortTitle : item.title}
											</Link>
										</li>
									))}
							</ul>
						</div>
						<div className="">
							<div className="text-sm font-bold mb-3 mt-5 sm:mt-0 font-openSans">
								Training
							</div>
							<ul>
								{data?.training
									.sort((a, b) => a.title.localeCompare(b.title))
									.map((item, index) => (
										<li
											className="transition-colors hover:text-brand-orange"
											key={index}
										>
											<Link href={`/training/${item.slug}`} passHref>
												{item?.shortTitle ? item?.shortTitle : item.title}
											</Link>
										</li>
									))}
							</ul>
							{/* <TextLink
								label="All Training Services"
								className="mt-2 mb-0 font-normal text-sm hover:text-brand-light-blue"
							/> */}
						</div>
						<div className="">
							<div className="text-sm mb-3 mt-6 sm:mt-0 font-bold font-openSans">
								Flight
							</div>
							<ul>
								{data?.flights
									.sort((a, b) => a.title.localeCompare(b.title))
									.map((item, index) => (
										<li
											className="transition-colors hover:text-brand-orange"
											key={index}
										>
											<Link href={`/flights/${item.slug}`} passHref>
												{item?.shortTitle ? item?.shortTitle : item.title}
											</Link>
										</li>
									))}
							</ul>
							{/* <TextLink
								label="All Flight Services"
								className="mt-2 mb-0 font-normal text-sm hover:text-brand-light-blue"
							/> */}
							<div className="text-sm mb-3 mt-6 font-bold font-openSans">
								Industry
							</div>
							<ul>
								{data?.industry
									// @ts-ignore
									.sort((a, b) => a.title.localeCompare(b.title))
									// @ts-ignore
									.map((item, index) => (
										<li
											className="transition-colors hover:text-brand-orange"
											key={index}
										>
											<Link href={`/industry/${item.slug}`} passHref>
												{item?.shortTitle ? item?.shortTitle : item.title}
											</Link>
										</li>
									))}
							</ul>
							{/* <TextLink
								label="All Industry Services"
								className="mt-2 mb-0 font-normal text-sm hover:text-brand-light-blue"
							/> */}
						</div>
						<div className="w-full sm:w-auto md:mt-0 overflow-x-hidden">
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
						{/* border-t-[1px] */}
						<div className="w-full mt-5 sm:pt-0 text-sm flex flex-col lg:flex-row sm:justify-between lg:items-center opacity-85">
							<p>
								Helicopter Services is CAA and EASA approved and certified under
								AOC GB2128 (V21 Ltd T/A Helicopter Services).
							</p>
							<p className="mt-3 sm:mt-2 lg:mt-0 mb-0 pb-0">
								Helicopter Services © {currentYear}
							</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
