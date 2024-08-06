import Image from "next/image";
import Heading from "../components/Heading";
import SanityImage from "./SanityImage";
import Link from "next/link";

interface ServiceCard {
	heading: string;
	url: string;
	description: string;
	category: string;
	subCategory?: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	image?: any;
}

const ServiceCard = async ({
	heading,
	url,
	description,
	category,
	image,
}: ServiceCard) => {
	const getIconType = (url: string) => {
		if (url.includes("/training")) return "Training";
		if (url.includes("/industry")) return "Industry";
		if (url.includes("/flights")) return "Flights";
		if (url.includes("/about-us")) return "Company";
		return "Flights";
	};

	return (
		<Link
			href={url}
			className="bg-white justify-between shadow-brand rounded-none border-0 border-b-4 border-brand-light-blue relative flex flex-col-reverse	items-center overflow-hidden md:flex-row md:max-w-xl transition-shadow duration-300 ease-in-out dark:border-gray-700 dark:bg-gray-800 group hover:shadow-brand-hover sm:min-h-[330px]"
		>
			<div className="flex flex-col justify-between p-5 leading-normal w-full self-baseline break-words">
				<Heading
					title={heading}
					tag={category}
					titleStyles="text-2xl sm:text-3xl"
					tagSize="text-sm"
					iconColor="Blue"
					iconType={getIconType(url)}
					iconSize={15}
					className="my-3 sm:my-5"
					iconStyles="mb-4"
				/>
				<p className="mb-3 font-normal text-gray-700 dark:text-gray-400 font-openSans">
					{description}
				</p>
			</div>
			<div className="absolute bottom-0 right-0 z-[1]">
				{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
				<svg
					className="text-brand-light-blue h-6 w-6"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<polygon points="20 0 20 20 0 20" />
				</svg>
				<Image
					src="/images/caret-right.svg"
					alt="Helicopter Services"
					width={6}
					height={6}
					className="absolute bottom-0 right-1"
				/>
			</div>
			<div className="w-full h-[250px] md:w-[150%] md:h-full relative overflow-hidden">
				{/* 
					className="object-cover w-full h-[220px] md:h-full rounded-none transition-transform duration-300 ease-in-out group-hover:scale-110"
				*/}
				<SanityImage
					cover
					sanityImage={image}
					imageClasses="object-cover rounded-none transition-transform duration-300 ease-in-out group-hover:scale-110"
				/>
			</div>
		</Link>
	);
};

export default ServiceCard;
