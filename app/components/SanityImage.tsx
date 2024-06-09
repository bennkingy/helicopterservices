"use client";

import { client } from "@/lib/sanity";
import { cn } from "@/lib/utils";
// @ts-ignore
import { useNextSanityImage } from "next-sanity-image";
import Img from "next/image";

const SanityImage = ({
	sanityImage,
	cutCorner = false,
	isCircle = false,
	cover = false,
	imageClasses,
	// @ts-ignore
}: any) => {
	const imageProps = useNextSanityImage(client, sanityImage);

	console.log(sanityImage);

	const image = (
		<Img
			// @ts-ignore
			{...imageProps}
			alt={
				sanityImage?.altText ||
				sanityImage?.metadata?.altText ||
				"Helicopter Services"
			}
			layout={cover ? undefined : "responsive"}
			sizes="(max-width: 800px) 100vw, 800px"
			placeholder={
				sanityImage?.lqip || sanityImage?.metadata?.lqip ? "blur" : undefined
			}
			blurDataURL={
				sanityImage?.lqip || sanityImage?.metadata?.lqip
					? sanityImage.lqip || sanityImage?.metadata?.lqip
					: ""
			}
			className={cn(
				isCircle ? "rounded-full" : "",
				cover ? "absolute h-full object-cover object-center	w-full" : "",
				imageClasses,
			)}
		/>
	);

	return (
		<>
			{!cutCorner ? (
				<div className="overflow-hidden">{image}</div>
			) : (
				<div
					style={{
						clipPath:
							"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
					}}
				>
					{image}
				</div>
			)}
		</>
	);
};

export default SanityImage;
