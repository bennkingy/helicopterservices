"use client";

import { usePathname } from "next/navigation";

type props = {
	className: any;
};

const GMapHeader = ({ className }: props) => {
	const path = usePathname();
	return (
		<div className="bg-brand-medium-blue px-5 py-4 border-b-4 border-brand-light-blue mt-0 md:mt-8">
			<p className="text-white font-bold font-openSans">
				{path !== "/about-us/the-hanger"
					? "This service is based at"
					: "We are located at"}
				:
			</p>
			<p className="text-white font-openSans font-thin">
				White Waltham Airfield, Maidenhead, Berkshire, SL6 3N
			</p>
		</div>
	);
};

export default GMapHeader;
