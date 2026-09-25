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
	priority = false,
	// Image quality (1-100). Leave unset for the Next.js default.
	quality,
	// How wide the image is on screen, so the browser picks a suitable file.
	sizes = "(max-width: 768px) 100vw, 50vw",
	// @ts-ignore
}: any) => {
	const imageProps = useNextSanityImage(client, sanityImage);

	const image = (
		<Img
			// @ts-ignore
			{...imageProps}
			alt={
				sanityImage?.altText ||
				sanityImage?.metadata?.altText ||
				"Helicopter Services"
			}
			priority={priority}
			quality={quality}
			style={cover ? undefined : { width: "100%", height: "auto" }}
			sizes={sizes}
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
