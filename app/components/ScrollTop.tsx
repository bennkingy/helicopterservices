"use client";

import { Icons } from "@/components/ui/icons";
import ScrollToTop from "react-scroll-up";

const ScrollTop = () => {
	return (
		<ScrollToTop showUnder={160} duration={1000}>
			<Icons.moveUp className="h-8 w-8 shadow-2xl text-brand-light-blue z-[100]" />
		</ScrollToTop>
	);
};

export default ScrollTop;
