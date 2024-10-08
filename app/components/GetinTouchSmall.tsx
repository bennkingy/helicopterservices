"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const GetinTouchSmall = ({ className }: any) => {
	// TODO Try framer motion - https://www.framer.com/motion/scroll-animations/
	return (
		<div
			className={`bg-brand-medium-grey text-brand-dark-blue text-left p-5 ${className} font-openSans`}
		>
			<div>
				<p>
					<span className="font-bold">Outside office hours?</span> Submit our
					form and our team will get back to you.
				</p>
				<Link href="/enquire">
					<Button size="lg" className="bg-brand-orange text-white w-full mt-3">
						General enquiries
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default GetinTouchSmall;
