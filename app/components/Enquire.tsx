import { Button } from "@/components/ui/button";
import Link from "next/link";

interface props {
	textStyle?: string;
	className?: string;
}

const Enquire = ({ className, textStyle }: props) => {
	return (
		<div className={`flex sm:items-center flex-col sm:flex-row ${className}`}>
			<Link href="/enquire/">
				<Button className="uppercase bg-brand-orange text-white w-[150px] py-6">
					Enquire Today
				</Button>
			</Link>
			<div
				className={`mt-6 sm:mt-0 sm:ml-7 font-openSans -mb-[7px] group ${textStyle}`}
			>
				<p className="mb-[2px] font-normal text-sm">Call General enquiries:</p>
				<a
					href="tel:+441494513166"
					className="text-xl font-bold mt-0 hover:underline underline-offset-2"
				>
					+44 1494 513 166
				</a>
			</div>
		</div>
	);
};

export default Enquire;
