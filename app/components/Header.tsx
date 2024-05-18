import { urlFor } from "@/lib/sanity";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import FramerAnimation from "./FramerAnimationBlurIn";
import Heading from "./Heading";

type props = {
	height?: string; // e.g. 'h-[70vh]' or 'h-[50vh]'
	title?: string; // e.g. 'Mallard Plumbing and Heating'
	className?: string;
	image?: string;
	tag?: string;
	tagColor?: "white" | "light-blue" | "dark-blue";
};

const Header = async ({
	height = "h-[30px]",
	title,
	className,
	image,
	tag = "Flights",
	tagColor = "white",
}: props) => {
	// .width(2000).height(400).dpr(2).quality(75)
	const imageUrl = urlFor(image).url() || "";
	// @ts-ignore
	// const blurUrl = image?.asset?.metadata?.lqip || ''

	const src = imageUrl;

	const buffer = await fetch(src).then(async (res) => {
		return Buffer.from(await res.arrayBuffer());
	});

	const { base64 } = await getPlaiceholder(buffer);

	return (
		<section
			className={cn(
				`relative w-screen h-[200px] sm:h-[320px] lg:h-[420px] ${className} z-1 bg-slate-5`,
			)}
		>
			<Image
				quality={100}
				priority
				src={src || ""}
				placeholder="blur"
				objectFit="cover"
				objectPosition="center"
				fill
				blurDataURL={base64}
				alt="hero image example"
			/>
			<div className="container relative z-[4] flex items-center h-full">
				<FramerAnimation delay={0}>
					<Heading
						title={title || ""}
						tag={tag}
						tagSize="text-white text-sm sm:text-lg font-light"
						iconColor={tagColor}
						iconSize={14}
						titleStyles="text-white text-2xl leading-10 sm:text-4xl md:text-5xl lg:text-6xl font-extralight max-w-[300px] sm:max-w-[600px]"
					/>
				</FramerAnimation>
			</div>
			<div
				className={`bg-opacity-70 bg-brand-dark-blue top-0 bottom-0 right-0 left-0 absolute`}
			/>
		</section>
	);
};

export default Header;
