import Image from "next/image";
import Gallery from "./Gallery";
import { forwardRef } from "react";

type props = {
	data?: any;
	className?: string; // e.g. 'py-5'
};

const YouTubeThreeD = forwardRef(
	({ data, className = "md:mr-20" }: props, ref) => {
		const getYouTubeVideoId = (url: string) => {
			const regex =
				/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
			const matches = url.match(regex);
			return matches ? matches[1] : null;
		};

		const videoId = getYouTubeVideoId(data);
		const imageUrl = videoId
			? `https://img.youtube.com/vi/${videoId}/0.jpg`
			: "";

		return imageUrl && videoId ? (
			<div
				className="mt-10"
				style={{
					width: "100%",
					clipPath:
						"polygon(0 0,calc(100% - 20px) 0, 100% 20px,100% 100%, 0 100%)",
				}}
			>
				<Gallery galleryType="video" className={`mr-0 ${className}`} ref={ref}>
					<a
						href="/#"
						data-poster={imageUrl}
						data-lg-size="1000-800"
						data-pinterest-text="Pin it2"
						data-tweet-text="lightGallery slide  2"
						className="gallery__item"
						data-src={data}
						data-sub-html={`<h4>360° Tour</h4><p style="color: red; font-weight: bold">Open on YouTube for the best experience</p>`}
					>
						<Image
							width={500}
							height={332}
							quality={100}
							className="img-responsive cursor-pointer max-h-[450px]"
							src={imageUrl}
							alt="helicopter services youtube video"
							style={{
								clipPath:
									"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
							}}
						/>
					</a>
				</Gallery>
			</div>
		) : null;
	},
);

YouTubeThreeD.displayName = "YouTubeThreeD";

export default YouTubeThreeD;
