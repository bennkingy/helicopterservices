import { cn } from "@/lib/utils";
import FramerAnimation from "./FramerAnimationBlurIn";
import Heading from "./Heading";
import SanityImage from "./SanityImage";

type props = {
	title?: string; // e.g. 'Mallard Plumbing and Heating'
	className?: string;
	image?: string;
	tag?: string;
	tagColor?: "White" | "Blue" | "Dark";
	// Extra classes for the inner container, e.g. bottom padding when the
	// next section overlaps the banner.
	extraPadding?: string;
	iconType?: "Industry" | "Company" | "Flights" | "Training";
};

const Header = ({
	title,
	className,
	image,
	tag = "Flights",
	tagColor = "White",
	extraPadding = "",
	iconType = "Flights",
}: props) => {
	return (
		<section
			className={cn(
				"relative w-full min-h-[260px] sm:min-h-[340px] lg:min-h-[440px] flex z-1 bg-slate-5",
				className,
			)}
		>
			<SanityImage
				sanityImage={image}
				alt={title}
				cover
				priority
				sizes="100vw"
			/>
			<div className={cn("container relative z-[4] flex items-center py-10", extraPadding)}>
				<FramerAnimation delay={0} className="w-full">
					<Heading
						as="h1"
						title={title || ""}
						tag={tag}
						tagSize="text-white"
						iconColor={tagColor}
						iconSize={14}
						iconType={iconType}
						titleStyles="text-white text-3xl leading-tight font-light sm:text-4xl md:text-5xl lg:text-6xl lg:font-extralight max-w-[90%] sm:max-w-[640px]"
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
