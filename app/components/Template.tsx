import ContactCta from "@/app/components/ContactCta";
import GetinTouchSmall from "@/app/components/GetinTouchSmall";
import Map from "@/app/components/Map";
import { urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Gallery from "./Gallery";
import Header from "./Header";

type props = {
	data: any;
	children?: any;
	showHanger?: boolean;
};

const Template = ({ data, children, showHanger = false }: props) => {
	return (
		<div>
			{!showHanger ? (
				<>
					{(data?.heroImage || data?.mainImage) && (
						<div className="overflow-x-hidden">
							<Header
								title={data?.hero?.heading || data?.title}
								tag={data?.hero?.tagline}
								image={data?.heroImage || data?.mainImage}
							/>
						</div>
					)}
					<main className="container mx-auto px-4 grid pt-16 sm:py-16 grid-cols-1 md:grid-cols-3">
						<div className="pr-0 md:pr-20 mb-10 sm:mb-0 col-span-2">
							<div className="prose prose-a:text-brand-light-blue font-openSans prose-h2:font-workSans prose-h2:text-4xl prose-strong:font-bold marker:text-brand-light-blue max-w-full text-brand-dark-grey">
								<PortableText value={data?.body || ""} />
							</div>
							{children}
							{data?.gallery?.images.length > 0 && (
								<Gallery galleryType={"gallery"} className="mt-10">
									{data?.gallery?.images?.map((item: any, index: number) => {
										const image = urlFor(item).url();
										if (!image) return null;

										return (
											<a
												key={index}
												data-lg-size="542-305"
												data-pinterest-text="Pin it"
												data-tweet-text="lightGallery slide 1"
												className="gallery__item"
												data-src={image}
												data-sub-html="<h4>Photo by - <a href='test' >Test </a></h4><p> Test</p>"
											>
												<Image
													width={400}
													height={400}
													quality={100}
													className="img-responsive cursor-pointer"
													src={image}
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
							{data?.gallerySingle && (
								<Gallery galleryType={"gallery-single"} className="mt-10">
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
											}}
										/>
									</a>
								</Gallery>
							)}
						</div>
						<div>
							<ContactCta className="hidden md:block" />
							<GetinTouchSmall className="mt-10 md:mt-8 hidden md:block" />
							<Map className="mb-20 mt-7 sm:mb-0 md:mt-8" />
						</div>
					</main>
				</>
			) : null}
		</div>
	);
};

export default Template;
