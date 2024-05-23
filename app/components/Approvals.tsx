"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

const Approvals = () => {
	const path = usePathname();

	return path.includes("training") ? (
		<Image
			src="/images/approvals.png"
			alt="Helicopter Services"
			width={300}
			quality={100}
			height={100}
			className="mt-12"
		/>
	) : null;
};

export default Approvals;
