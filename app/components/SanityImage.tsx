import { client } from "@/lib/sanity";
// @ts-ignore
import { useNextSanityImage } from "next-sanity-image";
import Img from "next/image";

const SanityImage = ({ sanityImage, cutCorner = false }: any) => {

	const imageProps = useNextSanityImage(client, sanityImage);

	const image = <Img
      {...imageProps}
      alt={sanityImage.altText}
      layout="responsive"
			sizes="(max-width: 800px) 100vw, 800px"
			placeholder="blur"
			blurDataURL={sanityImage.lqip}
		/>

	return (
		<> {!cutCorner ?
			image :
			<div style={{ clipPath: "polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)" }}>
				{image}
			</div>}
			</>
	);
};

export default SanityImage;
