"use client";

import GMap from "@/app/components/GMap";
import { urlFor } from "@/lib/sanity";
import { cn } from "@/lib/utils";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { useRef } from "react";
import type { FleetItem } from "../fleet/[slug]/page";
import Breadcrumbs from "./Breadcrumbs";
import { ComparisonTable } from "./ComparisonTable";
import Gallery from "./Gallery";
import StatusIcon from "./StatusIcon";
import TextLink from "./TextLink";

type props = {
	data: FleetItem;
	helicopterData?: any;
	children?: any;
};

const TemplateTwo = ({ data, helicopterData, children }: props) => {
	// Define the Helicopter interface
	interface Helicopter {
		type: string;
		engine: string;
		carries: number;
		ifr: boolean;
		cruise: number;
		base: string;
		training: boolean;
		charter: boolean;
		aerialWork: boolean;
	}

	const SpecificationTable = ({ helicopter, className }: any) => {
		return (
			<div className={className}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
					{/* Type */}
					<div className="flex items-baseline">
						<p className="flex justify-between font-bold font-openSans text-sm">
							Type
						</p>
						<span className="flex-1 border-b border-dotted border-[#1b1b1b] mx-2" />
						<span className="text-right">{helicopter.title}</span>
					</div>
					{/* Engine */}
					<div className="flex items-baseline">
						<p className="flex justify-between font-bold font-openSans text-sm">
							Engine
						</p>
						<span className="flex-1 border-b border-dotted border-[#1b1b1b] mx-2"></span>
						<span className="text-right">{helicopter.engineType}</span>
					</div>
					{/* Carries */}
					<div className="flex items-baseline">
						<p className="flex justify-between font-bold font-openSans text-sm">
							Carries
						</p>
						<span className="flex-1 border-b border-dotted border-[#1b1b1b] mx-2"></span>
						<span className="text-right">{helicopter.capacity}</span>
					</div>
					{/* IFR */}
					<div className="flex items-baseline">
						<p className="flex justify-between font-bold font-openSans text-sm">
							IFR
						</p>
						<span className="flex-1 border-b border-dotted border-[#1b1b1b] mx-2"></span>
						<span className="text-right">
							{helicopter.ifrcapable ? "Yes" : "No"}
						</span>
					</div>
					{/* Cruise */}
					<div className="flex items-baseline">
						<p className="flex justify-between font-bold font-openSans text-sm">
							Cruise
						</p>
						<span className="flex-1 border-b border-dotted border-[#1b1b1b] mx-2"></span>
						<span className="text-right">{helicopter.cruiseSpeed}kts</span>
					</div>
					{/* Base */}
					<div className="flex items-baseline">
						<p className="flex justify-between font-bold font-openSans text-sm">
							Base
						</p>
						<span className="flex-1 border-b border-dotted border-[#1b1b1b] mx-2"></span>
						<span className="text-right">{helicopter.base}</span>
					</div>
				</div>
			</div>
		);
	};

	const galleryRef = useRef(null);

	const handleOpenGallery = () => {
		// @ts-ignore
		galleryRef.current?.openGallery();
	};

	return (
		<>
			<main className="">
				<Breadcrumbs
					className="container pt-[20px] sm:pt-[30px]"
					slug={data?.title}
				/>
				<div className="container mx-auto px-4 grid pb-14 grid-cols-1 md:grid-cols-5 mt-8">
					<div className="mr-0 md:mr-20 mb-10 sm:mb-0 col-span-3 relative">
						{data?.threedVideoUrl && (
							<Image
								priority
								quality={100}
								src={"/images/3d-rotate-Dark.svg"}
								alt=""
								width={53}
								height={47}
								className="absolute top-0 right-0"
							/>
						)}
						<h2 className="text-brand-light-blue text-3xl font-normal font-workSans -ml-[2px]">
							Our fleet
						</h2>
						<h3 className="text-brand-dark-blue text-6xl font-light font-workSans mt-2 -ml-1">
							{data?.title}
						</h3>
						<div className="mt-7 mb-8">
							<div className="flex flex-row items-center">
								<StatusIcon status={data?.workType?.trainingHelicopter} />
								<p className="m-0 ml-3">Training Helicopter</p>
							</div>
							<div className="flex flex-row items-center">
								<StatusIcon status={data?.workType?.charterHelicopter} />
								<p className="m-0 ml-3">Charter Helicopter</p>
							</div>
							<div className="flex flex-row items-center">
								<StatusIcon status={data?.workType?.aerialWorkHelicopter} />
								<p className="m-0 ml-3">Aerial Work Helicopter</p>
							</div>
						</div>
						<div
							className={cn(
								"prose prose-a:text-brand-light-blue font-openSans prose-h2:font-workSans prose-h2:text-4xl prose-strong:font-bold marker:text-brand-light-blue max-w-full text-brand-dark-grey",
							)}
						>
							<PortableText value={data?.body || ""} />
							{data?.threedVideoUrl && (
								<TextLink
									label="3D cockpit view"
									className="mt-7"
									onClick={handleOpenGallery}
								/>
							)}
						</div>
						<h3 className="text-md font-bold mt-7 font-openSans mb-5">
							Specifications:
						</h3>
						<SpecificationTable helicopter={data} className="mb-6" />
						<ComparisonTable // @ts-ignore
							data={helicopterData.filter(
								(page: any) => page?.cruiseSpeed !== null,
							)}
						/>
						{children}
						{data.gallery && (
							<Gallery className="sm:mb-10" galleryType="gallery">
								<a
									data-lg-size="1600-2400"
									data-pinterest-text="Pin it2"
									data-tweet-text="lightGallery slide  2"
									className="gallery__item"
									data-src="https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1600&q=80"
									data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@therawhunter' >Massimiliano Morosinotto </a></h4><p> Location - <a href='https://unsplash.com/s/photos/tre-cime-di-lavaredo%2C-italia'>Tre Cime di Lavaredo, Italia</a>This is the Way</p>"
								>
									<img
										style={{
											clipPath:
												"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
										}}
										className="img-responsive cursor-pointer"
										src="https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80"
									/>
								</a>
								<a
									data-lg-size="1600-2398"
									data-pinterest-text="Pin it3"
									data-tweet-text="lightGallery slide  4"
									className="gallery__item"
									data-src="https://images.unsplash.com/photo-1526281216101-e55f00f0db7a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1600&q=80"
									data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@yusufevli' >Yusuf Evli </a></h4><p> Foggy Road</p>"
								>
									<img
										className="img-responsive cursor-pointer"
										style={{
											clipPath:
												"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
										}}
										src="https://images.unsplash.com/photo-1526281216101-e55f00f0db7a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80"
									/>
								</a>
								<a
									data-lg-size="1600-2400"
									data-pinterest-text="Pin it3"
									data-tweet-text="lightGallery slide  4"
									className="gallery__item"
									data-src="https://images.unsplash.com/photo-1585338447937-7082f8fc763d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
									data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@whoisbenjamin' >whoisbenjamin</a></h4>
<p>Location - <a href='https://unsplash.com/s/photos/ciuca%C8%99-peak%2C-romania'>Snowdonia National Park, Blaenau Ffestiniog, UK</a> 
A swan on a calm misty lake in the mountains of Snowdonia, North Wales. <a href='https://unsplash.com/photos/9V6EkAoTWJM'>Link</a> </p>"
								>
									<img
										className="img-responsive cursor-pointer"
										style={{
											clipPath:
												"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
										}}
										src="https://images.unsplash.com/photo-1585338447937-7082f8fc763d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80"
									/>
								</a>
							</Gallery>
						)}
					</div>
					<div className="col-span-2">
						{data?.gallerySingle && (
							<Gallery galleryType={"gallery-single"} className="mt-0">
								<a
									href="#0"
									data-lg-size={`${data.gallerySingle.width}-${data.gallerySingle.height}`}
									data-pinterest-text="Pin it"
									data-tweet-text="Helicopter Services"
									data-src={urlFor(data.gallerySingle?.imageUrl).url()}
									data-sub-html={`<h4>Helicopter Services</h4><p>${data?.title}</p>`}
								>
									<Image
										width={500}
										height={332}
										quality={100}
										className="img-responsive cursor-pointer"
										src={urlFor(data?.gallerySingle?.imageUrl).url()}
										placeholder={data?.gallerySingle?.blur ? "blur" : undefined}
										blurDataURL={
											data?.gallerySingle?.blur
												? data?.gallerySingle?.blur
												: undefined
										}
										alt=""
										style={{
											clipPath:
												"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
										}}
									/>
								</a>
							</Gallery>
						)}
						{data?.threedVideoUrl && (
							<div
								className="mt-10"
								style={{
									width: "100%",
									clipPath:
										"polygon(0 0,calc(100% - 20px) 0, 100% 20px,100% 100%, 0 100%)",
								}}
							>
								<Gallery ref={galleryRef} galleryType="video">
									<a
										data-lg-size="1000-700"
										data-pinterest-text="Pin it2"
										data-tweet-text="lightGallery slide  2"
										className="gallery__item"
										data-src="https://www.youtube.com/embed/JOpWTNEAsX8?si=EbI2oaTH5s4boI_Y"
										data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@therawhunter' >Massimiliano Morosinotto </a></h4><p> Location - <a href='https://unsplash.com/s/photos/tre-cime-di-lavaredo%2C-italia'>Tre Cime di Lavaredo, Italia</a>This is the Way</p>"
									>
										<Image
											width={500}
											height={332}
											quality={100}
											className="img-responsive cursor-pointer"
											src={"/images/ezgif-4-d9b45d08be.jpg"}
											alt=""
											style={{
												clipPath:
													"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
											}}
										/>
									</a>
								</Gallery>
							</div>
						)}
						<div className="bg-brand-medium-blue px-5 py-4 border-b-4 border-brand-light-blue mt-10">
							<p className="text-white font-bold font-openSans">
								This helicopter is based at:
							</p>
							<p className="text-white font-openSans font-thin">
								White Waltham Airfield, Maidenhead, Berkshire, SL6 3N
							</p>
						</div>
						<GMap />
					</div>
				</div>
			</main>
		</>
	);
};

export default TemplateTwo;
