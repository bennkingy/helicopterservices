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

type props = {
	data: any;
	children?: any;
	height?: string;
	sidebar?: boolean;
};

const Template = ({ data, children, height, sidebar = true }: props) => {
	const components = {
		types: {
			image: ({ value }: any) => {
				const imageUrl = urlFor(value).url();
				if (!imageUrl) return null;

				return (
					<div
						className={`relative h-[${value.height / 2}px] w-[${
							value.width / 2
						}px] my-20 mt-0`}
					>
						<Image
							src={imageUrl}
							alt={value.alt || "Image"}
							height={value.height / 2}
							width={value.width / 2}
							objectFit="cover"
							placeholder={value.blur ? "blur" : undefined}
							blurDataURL={value.blur ? value.blur : ""}
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
						className="my-10 mr-10 sm:mr-24 md:mr-10 lg:mr-32 contentBlockGalleryFix"
					>
						{value.images.map((item: any, index: number) => {
							const image = urlFor(item).url();
							if (!image) return null;
							return (
								<a
									key={index}
									data-lg-size={`${item.width}-${item.height}`}
									data-pinterest-text="Pin it"
									data-tweet-text="Helicopter Services"
									data-src={image}
									data-sub-html={`<h4>Helicopter Services</h4><p>${
										item?.alt || "No description"
									}</p>`}
									className="w-full max-h-[230px] sm:max-h-[330px] relative aspect-square"
								>
									<Image
										fill
										objectFit="cover"
										objectPosition="center"
										quality={100}
										className="img-responsive cursor-pointer m-0"
										src={image}
										placeholder={item.blur ? "blur" : undefined}
										blurDataURL={item.blur ? item.blur : ""}
										alt={item.alt || ""}
										style={{
											clipPath:
												"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
										}}
									/>
								</a>
							);
						})}
					</Gallery>
				);
			},
		},
	};

	return (
		<div>
			{(data?.heroImage || data?.mainImage) && (
				<div className="overflow-x-hidden">
					<Header
						className={height}
						title={data?.hero?.heading || data?.title}
						tag={data?.hero?.tagline}
						image={data?.heroImage || data?.mainImage}
					/>
				</div>
			)}
			<main
				className={cn(
					"container mx-auto px-4 grid pt-16 sm:py-20 grid-cols-1",
					{ "md:grid-cols-3": sidebar, "md:grid-cols-1": !sidebar },
				)}
			>
				<div className="pr-0 md:pr-20 mb-16 md:mb-0 col-span-2">
					<div className="prose prose-a:text-brand-light-blue font-openSans prose-h2:font-workSans  prose-h2:text-3xl sm:prose-h2:text-4xl prose-strong:font-bold marker:text-brand-light-blue max-w-full text-brand-dark-grey">
						<PortableText value={data?.body || ""} components={components} />
					</div>
					<Approvals />
					{children}
					{data?.threedVideoUrl && (
						<YouTubeThreeD data={data?.threedVideoUrl} />
					)}
				</div>
				{sidebar && (
					<div>
						<ContactCta className="hidden md:block" pilot={data?.pilot} />
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
