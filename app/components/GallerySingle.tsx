import { getBase64Blur } from "@/lib/extensions";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import { useEffect, useState } from "react";
import Gallery from "./Gallery"; // Assuming this is a custom component you've created

const GallerySingle = ({ data }) => {
	const [blurDataURL, setBlurDataURL] = useState("");

	useEffect(() => {
		const fetchBlurDataUrl = async () => {
			if (data?.gallerySingle) {
				const imageUrl = urlFor(data.gallerySingle).url();
				const blurUrl = await getBase64Blur(imageUrl);
				setBlurDataURL(blurUrl);
			}
		};

		fetchBlurDataUrl();
	}, [data?.gallerySingle]); // Dependency array ensures effect runs when `data.gallerySingle` changes

	if (!data?.gallerySingle) return null;

	return (
		<Gallery galleryType={"gallery-single"} className="mt-0">
			<a
				data-lg-size={`${data.gallerySingle.metadata.dimensions.width}-${data.gallerySingle.metadata.dimensions.height}`}
				data-pinterest-text="Pin it"
				data-tweet-text="Helicopter Services"
				data-src={urlFor(data.gallerySingle).url()}
				data-sub-html={`<h4>Helicopter Services</h4><p>${data?.title}</p>`}
			>
				<Image
					width={500}
					height={332}
					quality={100}
					className="img-responsive cursor-pointer"
					src={urlFor(data.gallerySingle).url()}
					alt=""
					placeholder="blur"
					blurDataURL={blurDataURL}
					style={{
						clipPath:
							"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
					}}
				/>
			</a>
		</Gallery>
	);
};

export default GallerySingle;
