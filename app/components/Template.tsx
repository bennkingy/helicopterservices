import ContactCta from "@/app/components/ContactCta";
import GetinTouchSmall from "@/app/components/GetinTouchSmall";
import GMap from "@/app/components/GMap";
import { urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Approvals from "./Approvals";
import Gallery from "./Gallery";
import Header from "./Header";

type props = {
	data: any;
	children?: any;
	showHanger?: boolean;
	height?: string;
};

const Template = ({ data, children, showHanger = false, height }: props) => {
	const components = {
		types: {
			// custom rendering logic for other types can go here
		},
		block: {
			h2: ({ children }: any) => {
				return (
					<>
						<h2>{children}</h2>
						{children && !children.isRendered && (
							<>
								{(children.isRendered = true) && data?.gallerySingle && (
									<Gallery
										galleryType={"gallery-single"}
										className="mt-0 mb-12 mr-0 sm:mr-24 md:mr-10 lg:mr-32"
									>
										<a
											data-lg-size="542-305"
											data-pinterest-text="Pin it"
											data-tweet-text="lightGallery slide 1"
											className="gallery__item"
											data-src={urlFor(data?.gallerySingle).url()}
											data-sub-html="<h4>Photo by - <a href='test' >Test </a></h4><p> Test</p>"
										>
											<Image
												width={400}
												height={400}
												quality={100}
												className="img-responsive cursor-pointer"
												src={urlFor(data?.gallerySingle).url()}
												alt=""
												style={{
													clipPath:
														"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
													marginBottom: 0,
													marginTop: 20,
												}}
											/>
										</a>
									</Gallery>
								)}
							</>
						)}
					</>
				);
			},
		},
	};

	return (
		<div>
			{!showHanger ? (
				<>
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
					<main className="container mx-auto px-4 grid pt-16 sm:py-20 grid-cols-1 md:grid-cols-3">
						<div className="pr-0 md:pr-20 mb-16 md:mb-0 col-span-2">
							<div className="prose prose-a:text-brand-light-blue font-openSans prose-h2:font-workSans  prose-h2:text-3xl sm:prose-h2:text-4xl prose-strong:font-bold marker:text-brand-light-blue max-w-full text-brand-dark-grey">
								<PortableText
									value={data?.body || ""}
									// TODO: https://www.sanity.io/answers/using-portabletext-with-defined-types-in-components-for-a-schema-with-a-hero-object-inside-a-parent-portable-text-array
									components={components}
								/>
							</div>
							<Approvals />
							{children}
							{data?.gallery?.length > 0 && (
								<Gallery
									galleryType={"gallery"}
									className="mt-16 mr-0 sm:mr-24 md:mr-10 lg:mr-32"
								>
									{data?.gallery?.map((item: any, index: number) => {
										const image = urlFor(item.imageUrl).url();
										if (!image) return null;

										const regex = new RegExp(/\.[^/.]+$/);

										return (
											<a
												key={index}
												data-lg-size={`${item.width}-${item.height}`}
												data-pinterest-text="Pin it"
												data-tweet-text="Helicopter Services"
												data-src={image}
												data-sub-html={`<h4>Helicopter Services</h4><p>${item?.fileName.replace(
													regex,
													"",
												)}</p>`}
												className="w-full max-h-[330px] relative aspect-square"
											>
												<Image
													fill
													objectFit="cover"
													objectPosition="center"
													quality={100}
													className="img-responsive cursor-pointer"
													src={image}
													placeholder={item.blur ? "blur" : undefined}
													blurDataURL={item.blur ? item.blur : ""}
													alt=""
													style={{
														clipPath:
															"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
													}}
												/>
											</a>
										);
									})}
								</Gallery>
							)}
						</div>
						<div>
							<ContactCta className="hidden md:block" />
							<GetinTouchSmall className="mt-20 md:mt-8 hidden md:block" />
							<div className="bg-brand-medium-blue px-5 py-4 border-b-4 border-brand-light-blue mt-0 md:mt-8">
								<p className="text-white font-bold font-openSans">
									This service is based at:
								</p>
								<p className="text-white font-openSans font-thin">
									White Waltham Airfield, Maidenhead, Berkshire, SL6 3N
								</p>
							</div>
							<GMap className="mb-20 sm:mb-0" />
						</div>
					</main>
				</>
			) : null}
		</div>
	);
};

export default Template;
