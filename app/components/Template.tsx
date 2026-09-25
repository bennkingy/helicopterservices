import ContactCta from "@/app/components/ContactCta";
import GMap from "@/app/components/LazyGMap";
import GetinTouchSmall from "@/app/components/GetinTouchSmall";
import { urlFor } from "@/lib/sanity";
import { cn } from "@/lib/utils";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
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

// Sanity asset refs look like "image-<id>-542x305-jpg", so dimensions can be
// recovered from the ref when the query didn't fetch them.
const getImageDimensions = (image: any) => {
	if (image?.width && image?.height) {
		return { width: image.width, height: image.height };
	}
	const match = /-(d+)x(d+)-/.exec(image?.asset?._ref || "");
	return match
		? { width: Number(match[1]), height: Number(match[2]) }
		: { width: undefined, height: undefined };
};

// Right margin for content images from tablet width up. Full width on mobile.
// One value at every width, so the gap to the sidebar stays constant.
const contentImageMargin = "mr-0 sm:mr-10";

const escapeHtml = (text: string) =>
	text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");

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
	const components: PortableTextComponents = {
		marks: {
			link: ({ value, children }: any) => {
				const href = value.href || "#";
				return <CMSLink href={href}>{children}</CMSLink>;
			},
		},
		types: {
			image: ({ value }: any) => {
				if (!value?.asset) return null;
				const { width, height } = getImageDimensions(value);
				if (!width || !height) return null;

				return (
					<div className={contentImageMargin}>
						<Image
							src={urlFor(value).url()}
							alt={value.alt || "Helicopter Services"}
							width={width}
							height={height}
							sizes="(max-width: 768px) 100vw, 60vw"
							placeholder={value.blur ? "blur" : undefined}
							blurDataURL={value.blur || undefined}
							className="h-auto max-w-full"
						/>
					</div>
				);
			},
			gallery: ({ value }: any) => {
				const images = (value?.images || []).filter((item: any) => item?.asset);
				if (images.length === 0) return null;
				const isSingle = images.length === 1;
				// A single image keeps its own shape. Gallery tiles all share one 4:3
				// shape, so every gallery on the site lines up the same way.
				const single = isSingle ? getImageDimensions(images[0]) : null;
				const tileRatio =
					single?.width && single?.height
						? `${single.width} / ${single.height}`
						: "4 / 3";

				return (
					<Gallery
						amount={images.length}
						galleryType={isSingle ? "gallery-single" : "gallery"}
						className={cn(
							"my-10 contentBlockGalleryFix",
							contentImageMargin,
						)}
					>
						{images.map((item: any) => {
							const image = urlFor(item).url();
							const { width, height } = getImageDimensions(item);
							return (
								<span
									key={item._key}
									data-lg-size={`${width}-${height}`}
									data-pinterest-text="Pin it"
									data-tweet-text="Helicopter Services"
									data-src={image}
									data-thumb={urlFor(item)
										.width(240)
										.height(180)
										.fit("crop")
										.auto("format")
										.url()}
									data-sub-html={`<h4>Helicopter Services</h4><p>${escapeHtml(
										item.alt || "",
									)}</p>`}
									style={{
										clipPath:
											"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
										aspectRatio: tileRatio,
									}}
									className="not-prose relative block w-full overflow-hidden"
								>
									<Image
										fill
										sizes={isSingle ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 50vw, 30vw"}
										className="img-responsive cursor-pointer m-0 p-0 object-cover object-center transition-transform duration-300 ease-in-out hover:scale-110"
										src={image}
										placeholder={item.blur ? "blur" : undefined}
										blurDataURL={item.blur || undefined}
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
