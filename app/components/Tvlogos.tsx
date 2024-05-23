import Image from "next/image";

type props = {
	className?: string;
};

const Tvlogos = ({ className }: props) => {
	return (
		<div
			className={`grid grid-cols-2 sm:grid-cols-4 sm:gap-5 lg:gap-8 ${className} lg:pr-20`}
		>
			<div className="flex sm:justify-center items-center">
				<Image src="/images/bbc.svg" alt="" width={96} height={27} />
			</div>
			<div className="flex sm:justify-center items-center">
				<Image src="/images/channel4.svg" alt="" width={35} height={48} />
			</div>
			<div className="flex sm:justify-center items-center mt-8 sm:mt-0">
				<Image src="/images/itv.svg" alt="" width={83} height={41} />
			</div>
			<div className="flex sm:justify-center items-center mt-8 sm:mt-0">
				<Image src="/images/sky.svg" alt="" width={77} height={46} />
			</div>
		</div>
	);
};

export default Tvlogos;
