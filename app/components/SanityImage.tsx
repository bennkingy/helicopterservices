"use client";

import { client } from "@/lib/sanity";
// @ts-ignore
import { useNextSanityImage } from "next-sanity-image";
import Img from "next/image";

const SanityImage = ({
	sanityImage,
	cutCorner = false,
	isCircle = false,
	// @ts-ignore
}: any) => {
	const imageProps = useNextSanityImage(client, sanityImage);

	console.log("sanityImage", sanityImage);

	const image = (
		<Img
			// @ts-ignore
			{...imageProps}
			alt={sanityImage?.altText || "Helicopter Services"}
			layout="responsive"
			sizes="(max-width: 800px) 100vw, 800px"
			placeholder={sanityImage?.lqip ? "blur" : undefined}
			blurDataURL={sanityImage?.lqip ? sanityImage.lqip : ""}
			className={isCircle ? "rounded-full" : ""}
		/>
	);

	return (
		<>
			{!cutCorner ? (
				image
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
