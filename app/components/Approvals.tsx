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
			placeholder="blur"
			blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABCAYAAAD5PA/NAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAGklEQVR4nGNgELI6zcBmdIbBNuHMs3//TwMAKT4HM0/7dVEAAAAASUVORK5CYII=" 
		/>
	) : null;
};

export default Approvals;
