import ContactCta from "@/app/components/ContactCta";
import GMap from "@/app/components/GMap";
import GetinTouchSmall from "@/app/components/GetinTouchSmall";
import { urlFor } from "@/lib/sanity";
import { cn } from "@/lib/utils";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Approvals from "./Approvals";
import GMapHeader from "./GMapHeader";
import Gallery from "./Gallery";
import Header from "./Header";
import YouTubeThreeD from "./YouTubeThreeD";
import HelicopterCard2 from "./HelicopterCard2";
import Link from "next/link";
import { Icons } from "@/components/ui/icons";
import CMSLink from "./CMSLink";

type props = {
	data: any;
	children?: any;
	height?: string;
	sidebar?: boolean;
	iconType?: "Industry" | "Company" | "Flights" | "Training";
};

const Template = ({
	data,
	children,
	height,
	sidebar = true,
	iconType,
}: props) => {
	const components = {
		marks: {
			link: ({ value, children }) => {
				const href = value.href || "#";
				return <CMSLink href={href}>{children}</CMSLink>;
			},
		},
		types: {
			image: ({ value }: any) => {
				const imageUrl = urlFor(value).url();
				if (!imageUrl) return null;

				return (
					<div
						className={`relative h-[${value.height / 2}px] w-[${
							value.width / 2
						}px] my-0`}
					>
						<Image
							src={imageUrl}
							alt={value.alt || "Helicopter Services"}
							height={value.height / 2}
							width={value.width / 2}
							objectFit="cover"
							placeholder={value.blur ? "blur" : undefined}
							blurDataURL={value.blur ? value.blur : ""}
							className="mb-0"
						/>
					</div>
				);
			},
			// Add custom rendering logic for gallery type
			gallery: ({ value }: any) => {
				return (
					<Gallery
						amount={value?.images.length}
						galleryType={`gallery${
							value?.images.length === 1 ? "-single" : ""
						}`}
						className="my-10 mr-0 sm:mr-24 md:mr-10 lg:mr-32 contentBlockGalleryFix"
					>
						{value.images.map((item: any, index: number) => {
							const image = urlFor(item).url();
							if (!image) return null;
							return (
								<span
									key={index}
									data-lg-size={`${item.width}-${item.height}`}
									data-pinterest-text="Pin it"
									data-tweet-text="Helicopter Services"
									data-src={image}
									data-sub-html={`<h4>Helicopter Services</h4><p>${
										item?.alt || ""
									}</p>`}
									style={{
										clipPath:
											"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
									}}
									className="w-full max-h-[230px] sm:max-h-[300px] md:max-h-[250px] lg:max-h-[310px]  relative aspect-square overflow-hidden"
								>
									<Image
										fill
										objectFit="cover"
										objectPosition="center"
										quality={100}
										className="img-responsive cursor-pointer m-0 p-0 object-cover aspect-square transition-transform duration-300 ease-in-out hover:scale-110"
										src={image}
										placeholder={item.blur ? "blur" : undefined}
										blurDataURL={item.blur ? item.blur : ""}
										alt={item.alt || "Helicopter Services"}
									/>
								</span>
							);
						})}
					</Gallery>
				);
			},
		},
	};

	return (
		<div className="sm:mb-10">
			{(data?.heroImage || data?.mainImage || data?.hero) && (
				<div className="overflow-x-hidden">
					<Header
						className={height}
						title={data?.hero?.heading || data?.title}
						tag={data?.hero?.tagline || iconType}
						iconType={iconType}
						image={data?.hero?.image || data?.heroImage || data?.mainImage}
					/>
				</div>
			)}
			<main
				className={cn(
					"container mx-auto px-4 grid pt-12 pb-10 sm:py-20 grid-cols-1",
					{ "md:grid-cols-8": sidebar, "md:grid-cols-1": !sidebar },
				)}
			>
				<div className="pr-0 md:pr-20 mb-16 md:mb-0 col-span-8 md:col-span-5">
					<div className="prose prose-a:text-brand-orange prose-a:transition-colors hover:prose-a:text-brand-dark-blue prose-a:no-underline font-openSans prose-h2:font-workSans prose-h2:text-[25px] lg:prose-h2:text-4xl prose-strong:font-bold marker:text-brand-light-blue max-w-full text-brand-dark-grey">
						<PortableText value={data?.body || ""} components={components} />
					</div>
					<Approvals />
					{children}
					{data?.threedVideoUrl && (
						<div
							className="mt-10"
							style={{
								width: "100%",
								clipPath:
									"polygon(0 0,calc(100% - 20px) 0, 100% 20px,100% 100%, 0 100%)",
							}}
						>
							<YouTubeThreeD data={data?.threedVideoUrl} className="" />
						</div>
					)}
					{data?.fleetItems?.length > 0 && (
						<div className="max-w-[500px]">
							<h2 className="mt-14 mb-7 text-2xl font-bold font-workSans text-brand-dark-grey">
								Helicopters for this service include:
							</h2>
							{data?.fleetItems
								// @ts-ignore
								.map((helicopter: any, idx: number) => (
									<HelicopterCard2
										key={idx}
										helicopter={helicopter}
										url={"/fleet/"}
									/>
								))}
							<div className="flex items-center mt-4 cursor-pointer text-brand-light-blue transition-colors group hover:text-foreground h-[20px]">
								<Icons.warehouse
									className="mr-1 text-brand-orange transition-colors group-hover:text-foreground -mt-[1px]"
									height={15}
								/>
								<Link
									href="/fleet/"
									className="text-sm text-brand-orange mt-0 transition-colors group-hover:text-foreground"
								>
									See full fleet
								</Link>
							</div>
						</div>
					)}
				</div>
				{/* {sidebar && (
					<>
						<div className="hidden lg:block col-span-3">
							<ContactCta className="hidden md:block" pilot={data?.pilot} service={data?.title} />
							<GetinTouchSmall className="mt-20 md:mt-8 hidden md:block" />
							<GMapHeader className="" />
							<GMap className="mb-20 sm:mb-0" />
						</div>
						<div className="block md:hidden">
							<GMapHeader className="" />
							<GMap className="mb-20 sm:mb-0" />
						</div>
					</>
				)} */}
				{sidebar && (
					<div className="col-span-3">
						<ContactCta
							className="hidden md:block"
							pilot={data?.pilot}
							service={data?.quoteMessage}
						/>
						<GetinTouchSmall className="mt-20 md:mt-8 hidden md:block" />
						<GMapHeader className="" />
						<GMap className="mb-20 sm:mb-0" />
					</div>
				)}
			</main>
		</div>
	);
};

export default Template;
