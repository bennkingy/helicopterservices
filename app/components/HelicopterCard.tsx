import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import SanityImage from "./SanityImage";

const HelicopterCard = async ({ helicopter }: any) => {

	return (
		<a href={helicopter?.url} className="group cursor-pointer">
			<Card className="mt-5 border-0">
				<CardContent className="p-0 flex justify-between relative bg-white shadow-brand rounded-none border-0 border-b-4 border-brand-light-blue hover:shadow-brand-hover">
					<div className="flex flex-col flex-wrap justify-center pl-3 sm:pl-4">
						<p className="text-sm font-workSans text-brand-dark-grey">Type</p>
						<h3 className="text-xl font-bold font-workSans text-brand-dark-blue">
							{helicopter?.heading || helicopter?.title}
						</h3>
					</div>
					<div className="h-[90px] w-[120px] relative overflow-hidden">
						{helicopter?.image || helicopter?.gallerySingle && (
							<SanityImage
								sanityImage={helicopter?.image || helicopter?.gallerySingle }
								cover
								imageClasses="object-cover rounded-none transition-transform duration-300 ease-in-out group-hover:scale-110"
							/>
						)}
					</div>
					{/* <PortableText value={helicopter?.description} /> */}
					<div className="absolute bottom-0 right-0 z-[1]">
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
				</CardContent>
			</Card>
		</a>
	);
};

export default HelicopterCard;
