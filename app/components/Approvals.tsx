"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

const Approvals = () => {
	let path = usePathname();
	path = path.toLocaleLowerCase();

	return path.includes("training") &&
		!path.includes("faa") &&
		!path.includes("elcas") ? (
		<Image
			src="/images/approvals.svg"
			alt="Helicopter Services"
			width={300}
			quality={100}
			height={100}
			className="mt-12"
		/>
	) : null;
};

export default Approvals;
