import { Button } from "@/components/ui/button";
import Image from "next/image";
import FramerAnimation from "./FramerAnimationBlurIn";

type props = {
	height?: string; // e.g. 'h-[70vh]' or 'h-[50vh]'
	title?: string; // e.g. 'Mallard Plumbing and Heating'
	subtitle?: string; // e.g. 'From checkout to global sales......'
	cta?: {
		label: string; // e.g. 'Get a quote'
		onClick: () => void; // e.g. () => registerModal.onOpen()
	};
	cta2?: {
		label: string; // e.g. 'Get a quote'
		onClick: () => void; // e.g. () => registerModal.onOpen()
	};
	className?: string;
	titleMargins?: string;
};

const Hero = ({
	height = "h-[70vh]",
	cta,
	cta2,
	title,
	subtitle,
	className,
	titleMargins = "mt-[45px] sm:mt-[60px]",
}: props) => {
	return (
		<section className={`${height} ${className} overflow-hidden relative`}>
			<div
				className={
					"h-full z-[8] bg-opacity-60 absolute bg-brand-dark-blue top-0 left-0 right-0 bottom-0"
				}
			/>
			<div className={"relative h-full"}>
				<video
					src={
						"https://oewitkauxpfiqmub.public.blob.vercel-storage.com/heroVideo-yyGrigzk0zJcP516LcthcqML1QJu0s.mp4"
					}
					autoPlay
					loop
					poster="/videos/heroVideo.png"
					preload="metadata"
					playsInline
					muted
					className={`w-full h-full cover absolute object-cover ${height}`}
				/>
				<div className="h-full grid container mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12 relative z-[9]">
					<div
						className={`mr-auto place-self-start lg:col-span-8 ${titleMargins} text-balance`}
					>
						<FramerAnimation delay={0}>
							<h1 className="mb-4 text-4xl leading-10 sm:text-4xl md:text-6xl xl:text-7xl dark:text-white text-white font-extralight font-workSans">
								{title?.split("<br/>").map((part, index) => (
									<span key={index}>
										{part}
										{index < title.split("<br/>").length - 1 && <br />}
									</span>
								))}{" "}
							</h1>
						</FramerAnimation>
						<p className="max-w-2xl mb-6 font-light text-white lg:mb-8 md:text-lg lg:text-xl dark:text-white">
							{subtitle}
						</p>
						{cta && (
							<Button
								onClick={() => {
									cta?.onClick();
								}}
							/>
						)}
						{cta2 && (
							<Button
								onClick={() => {
									cta2?.onClick();
								}}
								className="ml-3"
							/>
						)}
					</div>
				</div>
				{/*<!-- <div className="absolute top-0 right-0">
          <svg className="h-6 w-6 text-brand-light-blue" viewBox="0 0 20 20" fill="currentColor">
            <polygon points="20 0 20 20 0 0" />
          </svg>
        </div>-->/*/}
				<div className="absolute z-[9] bottom-[1px] left-0 w-full py-3 bg-brand-dark-blue bg-opacity-50 dark:bg-black dark:bg-opacity-50 flex flex-col sm:flex-row items-center justify-center text-white text-center px-5">
					<p className="mb-4 sm:mb-0 sm:mr-10 text-md sm:text-lg font-semibold font-workSans tracking-wide">
						A leading UK CAA and EASA approved Training Organisation
					</p>
					<div className="flex justify-center space-x-5">
						<Image
							src="/images/caa.svg"
							alt="Helicopter Services"
							width={50}
							height={34}
							quality={100}
						/>
						<Image
							src="/images/easa.svg"
							alt="Helicopter Services"
							width={100}
							height={34}
							quality={100}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;

// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import FramerAnimation from "./FramerAnimationBlurIn";

// type props = {
// 	height?: string; // e.g. 'h-[70vh]' or 'h-[50vh]'
// 	title?: string; // e.g. 'Mallard Plumbing and Heating'
// 	subtitle?: string; // e.g. 'From checkout to global sales......'
// 	cta?: {
// 		label: string; // e.g. 'Get a quote'
// 		onClick: () => void; // e.g. () => registerModal.onOpen()
// 	};
// 	cta2?: {
// 		label: string; // e.g. 'Get a quote'
// 		onClick: () => void; // e.g. () => registerModal.onOpen()
// 	};
// 	className?: string;
// 	titleMargins?: string;
// };

// const Hero = ({
// 	height = "h-[70vh]",
// 	cta,
// 	cta2,
// 	title,
// 	subtitle,
// 	className,
// 	titleMargins = "mt-[45px] sm:mt-[60px]",
// }: props) => {
// 	return (
// 		<section
// 			className={`bg-[url('/images/unflipped.jpg')] bg-no-repeat bg-cover bg-center ${height} ${className}`}
// 		>
// 			<div className={"bg-opacity-70 bg-brand-dark-blue relative h-full"}>
// 				<div className="h-full grid container mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12">
// 					<div
// 						className={`mr-auto place-self-start lg:col-span-8 ${titleMargins} text-balance`}
// 					>
// 						<FramerAnimation delay={0}>
// 							<h1 className="mb-4 text-4xl leading-10 sm:text-4xl md:text-6xl xl:text-7xl dark:text-white text-white font-extralight font-workSans">
// 								{title}
// 							</h1>
// 						</FramerAnimation>
// 						<p className="max-w-2xl mb-6 font-light text-white lg:mb-8 md:text-lg lg:text-xl dark:text-white">
// 							{subtitle}
// 						</p>
// 						{cta && (
// 							<Button
// 								onClick={() => {
// 									cta?.onClick();
// 								}}
// 							/>
// 						)}
// 						{cta2 && (
// 							<Button
// 								onClick={() => {
// 									cta2?.onClick();
// 								}}
// 								className="ml-3"
// 							/>
// 						)}
// 					</div>
// 				</div>
// 				{/*<!-- <div className="absolute top-0 right-0">
//           <svg className="h-6 w-6 text-brand-light-blue" viewBox="0 0 20 20" fill="currentColor">
//             <polygon points="20 0 20 20 0 0" />
//           </svg>
//         </div>-->/*/}
// 				<div className="absolute bottom-0 left-0 w-full py-3 bg-brand-dark-blue bg-opacity-50 dark:bg-black dark:bg-opacity-50 flex flex-col sm:flex-row items-center justify-center text-white text-center px-5">
// 					<p className="mb-4 sm:mb-0 sm:mr-10 text-md sm:text-lg font-semibold font-workSans tracking-wide">
// 						A leading UK CAA and EASA approved Training Organisation
// 					</p>
// 					<div className="flex justify-center space-x-5">
// 						<Image
// 							src="/images/easa.svg"
// 							alt="Helicopter Services"
// 							width={100}
// 							height={34}
// 							quality={100}
// 						/>
// 						<Image
// 							src="/images/caa.svg"
// 							alt="Helicopter Services"
// 							width={50}
// 							height={34}
// 							quality={100}
// 						/>
// 					</div>
// 				</div>
// 			</div>
// 		</section>
// 	);
// };

// export default Hero;
