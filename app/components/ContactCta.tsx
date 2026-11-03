import { Icons } from "@/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import SanityImage from "./SanityImage";
import OpeningHoursTable from "./OpeningHoursTable";

type props = {
	className?: string;
	// @ts-ignore
	pilot?: any;
	service?: string;
};

const ContactCta = ({ className, pilot, service }: props) => {
	return (
		<div className={`text-white bg-[#023D67] h-fit ${className}`}>
			<div className="bg-[#023D67] py-5 text-white p-10 relative">
				<div className="absolute sm:inset-0 lg:inset-auto m-auto -mt-[50px] lg:right-5 border-4 border-white drop-shadow-sm shadow-xl w-[90px] h-[90px] overflow-hidden rounded-full">
					{pilot?.mainImage ? (
						<SanityImage sanityImage={pilot.mainImage} sizes="96px" />
					) : (
						<Image
							src={"/images/ruth2.jpg"}
							width={82}
							height={82}
							alt={pilot?.name ? `Photo of ${pilot.name}` : "Photo of your instructor"}
							priority
						/>
					)}
				</div>
			</div>
			<div className=" text-white relative z-1 overflow-x-hidden pb-3">
				<p className="font-bold mb-4 pl-5 mt-6 lg:mt-0 pr-3 lg:pr-32 sm:text-lg font-openSans">
					“
					{service
						? service
						: "Enquire today for a customised quote tailored to your needs"}
					”
				</p>
				<p className="pl-5 font-openSans font-semibold">
					{pilot?.name || "Captain Ruth Downey"},
					<br />
					<span className="text-brand-light-blue pr-4">
						{pilot?.role || "Accountable Manager/Examiner"}
					</span>
				</p>
				<OpeningHoursTable className="mt-5 ml-5 w-full" shortOnSmallScreens />
				<div className="flex items-center mt-5 ml-5 group hover:underline underline-offset-2 hover:cursor-pointer">
					<Icons.phone className="text-brand-light-blue" height={50} />
					<Link
						href="tel:+44 1494 513 166"
						className="ml-4 font-openSans text-2xl font-bold"
					>
						+44 1494 513 166
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ContactCta;
