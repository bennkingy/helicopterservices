import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "../components/ContactForm";
import Map from "../components/Map";
import logo from "/public/images/LogoLightV2New.svg";

export const metadata: Metadata = {
	title: "Contact - Helicopter Services",
	description: "Helicopter Services",
};

export default async function Enquire() {
	return (
		<main className="pt-16 sm:pt-20 py-20 bg-brand-dark-blue">
			<div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-6">
				<div className="mr-0 md:mr-20 col-span-3 relative">
					<h3 className="text-5xl font-light font-workSans -ml-1 text-white">
						Enquire
					</h3>
					<p className="mt-5 font-bold text-2xl max-w-[400px] text-white font-workSans">
						Tell us how we can help and we&apos;ll get in touch as soon as we
						can.
					</p>
					<div className="hidden md:block">
						<Link href="/" className="font-mono text-lg font-bold start">
							<Image
								src={logo}
								alt="Helicopter Services"
								width={153}
								height={43}
								className="min-w-[100px] mb-5 mt-16"
							/>
						</Link>
						{/* <p className="text-white font-openSans">
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
						</p> */}
						<div className="text-sm font-bold my-5 mb-3 mt-6 font-openSans text-white">
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
						<div className="max-w-[397px]">
							<div className="bg-brand-medium-blue px-5 py-4 border-b-4 border-brand-light-blue mt-10">
								<p className="text-white font-bold font-openSans">
									We are located at:
								</p>
								<p className="text-white font-openSans font-thin">
									White Waltham Airfield, Maidenhead, Berkshire, SL6 3N
								</p>
							</div>
							<Map className="w-full" />
							{/* <Map className={{ width: "100%", height: 300 }} /> */}
						</div>
					</div>
				</div>
				<div className="col-span-3 mt-10 md:mt-0">
					<ContactForm />
				</div>
			</div>
		</main>
	);
}
