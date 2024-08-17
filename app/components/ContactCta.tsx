import { Icons } from "@/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import SanityImage from "./SanityImage";

type props = {
	className?: string;
	// @ts-ignore
	pilot?: any;
};

const ContactCta = ({ className, pilot }: props) => {
	return (
		<div className={`text-white bg-[#023D67] h-fit ${className}`}>
			<div className="bg-[#023D67] py-5 text-white p-10 relative">
				<div className="absolute sm:inset-0 lg:inset-auto m-auto -mt-[50px] lg:right-5 border-4 border-white drop-shadow-sm shadow-xl w-[90px] h-[90px]">
					{pilot?.mainImage ? (
						<SanityImage sanityImage={pilot.mainImage} />
					) : (
						<Image
							quality={100}
							src={"/images/ruth2.jpg"}
							width={82}
							height={82}
							alt="Title Image"
							priority
						/>
					)}
				</div>
			</div>
			<div className=" text-white relative z-1 overflow-x-hidden pb-3">
				<p className="font-bold mb-4 pl-5 mt-6 lg:mt-0 pr-3 lg:pr-32 sm:text-lg font-openSans">
					“Enquire today for a customised quote tailored to your needs”
				</p>
				<p className="pl-5 font-openSans">
					{pilot?.name || "Captain Ruth Downey"},
					<br />
					<span className="text-brand-light-blue">
						{pilot?.role || "Accountable Manager/Examiner"}
					</span>
				</p>
				<table className={"table-fixed mt-5 ml-5 w-full font-openSans"}>
					<tbody>
						<tr>
							<td>Monday</td> <td>08:30 - 17:30</td>
						</tr>
						<tr>
							<td>Tuesday</td> <td>08:30 - 17:30</td>
						</tr>
						<tr>
							<td>Wednesday</td> <td>08:30 - 17:30</td>
						</tr>
						<tr>
							<td>Thursday</td> <td>08:30 - 17:30</td>
						</tr>
						<tr>
							<td>Friday</td> <td>08:30 - 17:30</td>
						</tr>
						<tr className="font-bold">
							<td>Saturday</td> <td>By Apointment</td>
						</tr>
						<tr className="font-bold">
							<td>Sunday</td> <td>By Apointment</td>
						</tr>
					</tbody>
				</table>
				<div className="flex items-center mt-5 ml-5 group hover:underline underline-offset-2 hover:cursor-pointer">
					<Icons.phone className="text-brand-light-blue" height={50} />
					<Link
						href="tel:07497497583"
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
