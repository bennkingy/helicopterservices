import Image from "next/image";
import Gallery from "./Gallery";

type props = {
	data?: any;
	className?: string; // e.g. 'py-5'
};

const YouTubeThreeD = ({ data, className = "md:mr-20" }: props) => {
	const getYouTubeVideoId = (url: string) => {
		const regex =
			/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
		const matches = url.match(regex);
		return matches ? matches[1] : null;
	};

	const videoId = getYouTubeVideoId(data);
	const imageUrl = videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : "";

	return (
		<div
			className="mt-10"
			style={{
				width: "100%",
				clipPath:
					"polygon(0 0,calc(100% - 20px) 0, 100% 20px,100% 100%, 0 100%)",
			}}
		>
			<Gallery galleryType="video" className={`mr-0 ${className}`}>
				<a
					href={imageUrl}
					data-lg-size="1000-700"
					data-pinterest-text="Pin it2"
					data-tweet-text="lightGallery slide  2"
					className="gallery__item"
					data-src={data}
					data-sub-html={`<h4>Helicopter Services</h4><p>360 Video</p>`}
				>
					<Image
						width={500}
						height={332}
						quality={100}
						className="img-responsive cursor-pointer max-h-[450px]"
						src={imageUrl}
						alt=""
						style={{
							clipPath:
								"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)",
						}}
					/>
				</a>
			</Gallery>
		</div>
	);
};

export default YouTubeThreeD;
