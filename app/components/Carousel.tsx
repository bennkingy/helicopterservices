"use client";

import { Button } from "@/components/ui/button";
import {
	Carousel as CarouselComponent,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi,
} from "@/components/ui/carousel";
import { carouselItem } from "@/lib/interface";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type props = {
	slides: carouselItem[];
};

const Carousel = ({ slides }: props) => {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!api) {
			return;
		}
		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	return (
		<CarouselComponent
			setApi={setApi}
			plugins={[
				Autoplay({
					waitForUser: true,
					autoplay: true,
					loop: true,
					stopOnMouseEnter: true,
				}),
			]}
			opts={{
				align: "start",
				loop: true,
			}}
		>
			<CarouselContent className="">
				{slides.map((item, index) => (
					<CarouselItem
						key={index + 1}
						className={
							"md:basis-1/2 lg:basis-1/3 m-0 px-10 md:px-16 text-center"
						}
					>
						<Link href={item.link}>
							<Image
								src={item.img}
								width={370}
								quality={100}
								height={370}
								alt={item.title}
								priority
								className="my-8 rounded-full mx-auto"
							/>
							<h5 className="font-bold mb-3 text-lg font-openSans">
								{item.title}
							</h5>
							<p className="mb-3 font-openSans">{item.description}</p>
							<p
								href={item.link}
								className="text-base font-bold text-brand-light-blue font-openSans"
							>
								Discover more
							</p>
						</Link>
						{/* </FramerAnimationBlurIn> */}
					</CarouselItem>
				))}
			</CarouselContent>
			<div className="flex center justify-center mt-10">
				{Array.from(Array(count).keys()).map((i) => (
					<div key={i}>
						<Button
							className={`mx-1 h-1.5 flex-grow rounded-full p-2  ${
								i === current - 1
									? "bg-brand-light-blue hover:bg-green"
									: "bg-white"
							}`}
							onClick={() => api?.scrollTo(i)}
						/>
					</div>
				))}
			</div>
			<CarouselPrevious className="ml-[50px]" />
			<CarouselNext className="mr-[50px]" />
		</CarouselComponent>
	);
};

export default Carousel;
