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
import Image from "next/image";
import Link from 'next/link';
import { useEffect, useState } from "react";

const Carousel = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0);

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

  // Define data for multiple carousel items, here using placeholder data
  const items = [
    { title: "Airport Transfer", description: "We offer training from Private Pilots license to Commercial, instruments, instructor and examiner ratings.", link: "/#" },
    { title: "City Tours", description: "Explore the city's top attractions with our experienced guides.", link: "/tours" },
    { title: "Hotel Services", description: "Enjoy our world-class accommodations and hospitality.", link: "/hotels" },
    { title: "Dining Experiences", description: "Taste the best local and international cuisines.", link: "/dining" },
    { title: "Adventure Sports", description: "Get your adrenaline pumping with our adventure sports packages.", link: "/adventures" },
  ];

  return (
    <CarouselComponent setApi={setApi}>
      <CarouselContent className="-ml-2 md:-ml-4">
        {items.map((item, index) => (
          <CarouselItem key={index} className="sm:basis-1/3 text-center px-20">
            <Image
              src={'https://placehold.co/400x400/jpg'}
              width={400}
              height={400}
              alt={item.title}
              priority
              className="my-8 rounded-full"
            />
            <h5 className="font-bold mb-4">{item.title}</h5>
            <p className="mb-3">{item.description}</p>
            <Link href={item.link} className="text-lg font-bold text-brand-light-blue">
              Discover more
            </Link>
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