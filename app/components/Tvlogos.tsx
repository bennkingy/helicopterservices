import Image from "next/image";

type props = {
	className?: string;
};

const Tvlogos = ({ className }: props) => {
	console.log("Tvlogos component is rendering");

	return (
		<div className={`flex flex-row flex-wrap gap-5 sm:gap-12 ${className}`}>
			<Image src={"/images/bbc.svg"} alt="" width={96} height={27} />
			<Image src={"/images/channel4.svg"} alt="" width={35} height={48} />
			<Image src={"/images/itv.svg"} alt="" width={83} height={41} />
			<Image src={"/images/sky.svg"} alt="" width={77} height={46} />
		</div>
	);
};

export default Tvlogos;
