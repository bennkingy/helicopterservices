import Image from "next/image";
import Heading from "../components/Heading";
import SanityImage from "./SanityImage";

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
	return (
		<a
			href={url}
			className="bg-white justify-between shadow-brand rounded-none border-0 border-b-4 border-brand-light-blue relative flex flex-col-reverse	items-center overflow-hidden md:flex-row md:max-w-xl transition-shadow duration-300 ease-in-out dark:border-gray-700 dark:bg-gray-800 group hover:shadow-brand-hover sm:min-h-[330px]"
		>
			<div className="flex flex-col justify-between p-5 leading-normal w-full self-baseline">
				<Heading
					title={heading}
					tag={category}
					titleStyles="text-2xl sm:text-3xl"
					tagSize="text-sm"
					iconColor="light-blue"
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
			<div className="w-full md:w-[150%] h-full overflow-hidden">
				{/* <Image
					className="object-cover w-full h-[220px] md:h-full rounded-none transition-transform duration-300 ease-in-out group-hover:scale-110"
					width={440}
					quality={100}
					height={440}
					src={imageUrl || ""}
					placeholder="blur"
					blurDataURL={base64}
					alt=""
				/> */}
				<SanityImage
					cover
					sanityImage={image}
					imageClasses="transition-transform w-full h-[220px] md:h-full relative md:absolute"
				/>
			</div>
		</a>
	);
};

export default ServiceCard;
