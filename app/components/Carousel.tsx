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
import Image from "next/image";
import Link from 'next/link';
import { useEffect, useState } from "react";
import FramerAnimation from "./FramerAnimation";

type props = {
  slides: carouselItem[]
};

const Carousel = ({ slides }: props) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <CarouselComponent setApi={setApi}>
      <CarouselContent className="-ml-2 md:-ml-4">
        {slides.map((item, index) => (
          <CarouselItem key={index} className="sm:basis-1/3 text-center px-20">
            <FramerAnimation delay={0.15}>
              <Image
                src={'https://placehold.co/400x400/jpg'}
                width={400}
                height={400}
                alt={item.title}
                priority
                className="my-8 rounded-full"
              />
              <h5 className="font-bold mb-3 text-lgfont-openSans">{item.title}</h5>
              <p className="mb-3 font-openSans">{item.description}</p>
              <Link href={item.link} className="text-lg font-bold text-brand-light-blue font-openSans">
                Discover more
              </Link>
            </FramerAnimation>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex center justify-center mt-5">
        {Array.from(Array(count).keys()).map((i) => (
          <div key={i}>
            <Button
              className={`mx-1 h-1.5 flex-grow rounded-full p-2  ${i === current - 1
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
    </CarouselComponent >
  )
}

export default Carousel