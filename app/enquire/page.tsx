import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactForm, { type ServiceOptions } from "../components/ContactForm";
import GMap from "../components/LazyGMap";
import logo from "/public/images/LogoLightV2New.svg";
import { pageMetadata } from "@/lib/seo";
import { client } from "@/lib/sanity";

// Every training, flights and industry page, grouped for the form's
// sub-service dropdown.
async function getServiceOptions(): Promise<ServiceOptions> {
	const pages = await client
		.fetch<{ _type: string; title: string; shortTitle?: string; slug: string }[]>(
			`*[_type in ["training", "flights", "industry"] && isLandingPage != true && defined(slug.current) && !(_id in path("drafts.**"))] | order(coalesce(shortTitle, title) asc){
				_type,
				title,
				shortTitle,
				"slug": slug.current
			}`,
		)
		.catch((error) => {
			console.error("Failed to load enquiry services", error);
			return [];
		});
	const group = (type: string) =>
		pages
			.filter((page) => page._type === type)
			.map((page) => ({
				label: page.shortTitle?.trim() || page.title.trim(),
				slug: page.slug,
			}));
	return {
		Training: group("training"),
		Flights: group("flights"),
		Industry: group("industry"),
	};
}

export const metadata: Metadata = pageMetadata(
	{
		title:
		"Contact - Helicopter Servics - Over 20 years operating as one of the UKs most experienced helicopter companys.",
	description:
		"Over 20 years operating as one of the UKs most experienced helicopter training, charter, tours, photography, load lifting and consultancy companies.",
	},
	"/enquire",
);

export const revalidate = 30; // Add this line

export default async function Enquire() {
	const services = await getServiceOptions();
	const AdditionalContent = () => (
		<>
			<Link
				href="https://helicopterservices.co.uk"
				className="font-mono text-lg font-bold start"
			>
				<Image
					src={logo}
					alt="Helicopter Services"
					width={153}
					height={43}
					className="min-w-[100px] mb-5 mt-16"
				/>
			</Link>
			<div className="text-sm font-bold my-5 mb-3 mt-6 font-openSans text-white">
				Social
			</div>
			<ul>
				<Link href="https://www.facebook.com/heliservicesuk/" passHref>
					<li className="flex text-brand-orange font-semibold transition-colors hover:text-brand-light-blue">
						<Image
							src="/images/facebook.png"
							width={25}
							height={25}
							alt="helicopter services facebook"
							className="mt-1 mr-1"
						/>
						Facebook
					</li>
				</Link>
				<Link href="https://www.instagram.com/helicopterservices/" passHref>
					<li className="flex text-brand-orange font-semibold transition-colors hover:text-brand-light-blue">
						<Image
							src="/images/instagram.png"
							width={20}
							height={20}
							alt="helicopter services instagram"
							className="mt-1 mr-[7px] ml-[2px]"
						/>
						Instagram
					</li>
				</Link>
			</ul>
			<div className="max-w-[397px]">
				<div className="bg-brand-medium-blue px-5 py-4 border-b-4 border-brand-light-blue mt-10">
					<p className="text-white font-bold font-openSans">Office:</p>
					<p className="text-white font-openSans font-thin">
						White Waltham Airfield, Maidenhead, Berkshire, SL6 3NJ
					</p>
					<p className="text-white font-bold font-openSans mt-3">The hangar:</p>
					<p className="text-white font-openSans font-thin">
						White Waltham Airfield, Maidenhead, Berkshire, SL6 3LW
					</p>
				</div>
				<GMap className="w-full" />
			</div>
		</>
	);

	return (
		<main className="pt-12 sm:pt-14 py-20 pb-[120px] bg-brand-dark-blue">
			<div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-6">
				<div className="mr-0 md:mr-20 col-span-3 relative">
					<h1 className="text-4xl sm:text-6xl font-light font-workSans -ml-1 text-white">
						Enquire now
					</h1>
					<p className="mt-5 font-bold text-base sm:text-2xl max-w-[400px] text-white font-workSans">
						Tell us how we can help and we&apos;ll get in touch as soon as we
						can.
					</p>
					<div className="hidden md:block">
						<AdditionalContent />
					</div>
				</div>
				<div className="col-span-3 mt-10 md:mt-10">
					<ContactForm services={services} />
					<div className="block md:hidden">
						<div>
							<div className="bg-brand-medium-blue px-5 py-4 border-b-4 border-brand-light-blue mt-14 sm:mt-10">
								<p className="text-white font-bold font-openSans">Office:</p>
								<p className="text-white font-openSans font-thin">
									White Waltham Airfield, Maidenhead, Berkshire, SL6 3NJ
								</p>
								<p className="text-white font-bold font-openSans mt-3">
									The hanger:
								</p>
								<p className="text-white font-openSans font-thin">
									White Waltham Airfield, Maidenhead, Berkshire, SL6 3LW
								</p>
							</div>
							<GMap className="w-full" />
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
