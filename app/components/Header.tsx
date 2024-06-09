import { cn } from "@/lib/utils";
import FramerAnimation from "./FramerAnimationBlurIn";
import Heading from "./Heading";
import SanityImage from "./SanityImage";

type props = {
	height?: string; // e.g. 'h-[70vh]' or 'h-[50vh]'
	title?: string; // e.g. 'Mallard Plumbing and Heating'
	className?: string;
	image?: string;
	tag?: string;
	tagColor?: "white" | "light-blue" | "dark-blue";
	extraPadding?: string;
};

const Header = async ({
	height = "h-[30px]",
	title,
	className,
	image,
	tag = "Flights",
	tagColor = "white",
	extraPadding = "",
}: props) => {
	return (
		<section
			className={cn(
				`relative w-screen h-[200px] sm:h-[320px] lg:h-[420px] ${className} z-1 bg-slate-5`,
			)}
		>
			<SanityImage sanityImage={image} alt={title} cover />
			<div
				className={`container relative z-[4] flex items-center h-full ${extraPadding}`}
			>
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
				className={
					"bg-opacity-70 bg-brand-dark-blue top-0 bottom-0 right-0 left-0 absolute"
				}
			/>
		</section>
	);
};

export default Header;
