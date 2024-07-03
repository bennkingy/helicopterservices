// @ts-nocheck

import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import GetInTouch from "./GetInTouch";
import Weather from "./Weather";
import logo from "/public/images/LogoLightV2New.svg";
import { mapLocation } from "@/lib/constants";

async function getNavigationData() {
	let data: any;

	try {
		const response = await fetch(`${process?.env?.CURRENT_URL}/api/navigation`);
		data = await response.json();
	} catch (error) {
		console.error("Failed to fetch navigation data:", error);
	}

	return data;
}

export default async function Footer() {
	// const data = await getNavigationData();

	return (
		<>
			<GetInTouch />
			{/* <div className="bg-brand-dark-blue dark:bg-black text-white py-20 border-t-4 border-brand-light-blue">
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
							<Link href={mapLocation} className="text-brand-orange">
								SL6 3NJ
							</Link>
						</p>
						<div className="text-sm font-bold my-5 mb-3 mt-6 font-openSans">
							Social
						</div>
						{/* https://twitter.com/HeliServicesUK */}
						<ul>
							<li className=" font-semibold text-brand-light-blue ">
								<Link
									href="https://www.facebook.com/heliservicesuk/"
									passHref
									className="flex"
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
							<li className="text-brand-light-blue font-semibold">
								<Link
									href="https://www.instagram.com/helicopterservices/"
									passHref
									className="flex"
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
						<div className="text-sm font-bold mb-3 mt-7 font-openSans">
							Legals
						</div>
						<ul>
							{data?.legal
								.sort((a, b) => a.title.localeCompare(b.title))
								.map((item, index) => (
									<li
										className="transition-colors hover:text-brand-light-blue"
										key={index}
									>
										<Link href={`/legal/${item.slug}`} passHref>
											{item.title}
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
										className="transition-colors hover:text-brand-light-blue"
										key={index}
									>
										<Link href={`/training/${item.slug}`} passHref>
											{item.title}
										</Link>
									</li>
								))}
						</ul>
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
										className="transition-colors hover:text-brand-light-blue"
										key={index}
									>
										<Link href={`/flights/${item.slug}`} passHref>
											{item.title}
										</Link>
									</li>
								))}
						</ul>
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
										className="transition-colors hover:text-brand-light-blue"
										key={index}
									>
										<Link href={`/industry/${item.slug}`} passHref>
											{item.title}
										</Link>
									</li>
								))}
						</ul>
					</div>
					<div className="w-full sm:w-auto md:mt-0">
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
			</div> */}
		</>
	);
}
