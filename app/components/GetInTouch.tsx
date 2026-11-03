import { Icons } from "@/components/ui/icons";
import Button from "./Button";
import Heading from "./Heading";
import Link from "next/link";
import OpeningHoursTable from "./OpeningHoursTable";

type props = {
	className?: string;
};

const GetInTouch = ({ className }: props) => {
	return (
		<section
			className={`bg-[url('/images/0.jpg')] bg-no-repeat bg-cover bg-center ${className} text-white lg:bg-fixed parallax fixMeSir`}
		>
			<div className={"bg-opacity-80 bg-brand-dark-blue"}>
				<div className="container py-20">
					<Heading
						title="Get in touch with us"
						tag="Contact"
						iconColor="Blue"
						center
						className="mb-10"
						titleStyles="text-2xl sm:text-4xl text-white balance-text"
					/>
					<div className="max-w-6xl container p-0 mx-auto grid grid-cols-1 sm:grid-cols-2 font-openSans">
						<div className="p-5 pr-5 sm:pr-12">
							<OpeningHoursTable heading="General enquiries" className="mx-auto sm:mr-0" />
							<div
								className={
									"font-openSans sm:text-right mt-10 flex flex-col items-center md:items-end"
								}
							>
								<div className="flex items-center">
									<Icons.mail
										className="text-brand-light-blue mr-1"
										height={17}
									/>
									<Link
										href="mailto:info@helicopterservices.co.uk"
										className="mb-[2px] font-normal text-sm hover:underline underline-offset-2 flex"
									>
										info@helicopterservices.co.uk
									</Link>
								</div>
								<div className="flex items-center">
									<Icons.phone
										className="text-brand-light-blue mr-1"
										height={17}
									/>
									<Link
										href="tel:+441494513166"
										className="text-lg font-bold mt-0 hover:underline underline-offset-2"
									>
										+44 1494 513 166
									</Link>
								</div>
							</div>
						</div>
						<div className="p-5 pl-5 sm:pl-12 mt-5 sm:mt-0">
							<OpeningHoursTable heading="Charter enquiries" className="mx-auto sm:mx-0" />
							<div
								className={`font-openSans text-center sm:text-left mt-10 flex flex-col items-center md:items-start`}
							>
								<div className="flex items-center">
									<Icons.mail
										className="text-brand-light-blue mr-1"
										height={17}
									/>
									<Link
										href="mailto:charter@helicopterservices.co.uk"
										className="mb-[2px] font-normal text-sm block hover:underline underline-offset-2"
									>
										charter@helicopterservices.co.uk
									</Link>
								</div>
								<div className="flex items-center">
									<Icons.phone
										className="text-brand-light-blue mr-1"
										height={17}
									/>
									<Link
										href="tel:+441494513166"
										className="text-lg font-bold mt-0 hover:underline underline-offset-2"
									>
										+44 1494 513 166
									</Link>
								</div>
							</div>
						</div>
					</div>
					<div className="mt-5 max-w-6xl grid center mx-auto">
						<Button href="enquire" className="mx-auto" />
					</div>
				</div>
			</div>
		</section>
	);
};

export default GetInTouch;
