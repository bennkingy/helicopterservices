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
import { useEffect, useState } from "react";

const Carousel = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(5);

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

  console.log(current)

  return (
    <CarouselComponent setApi={setApi}>
      <CarouselContent className="-ml-2 md:-ml-4">
        <CarouselItem className="sm:basis-1/3 text-center px-20">
          <Image
            src={'https://placehold.co/400x400/jpg'}
            width={350}
            height={350}
            alt="Title Image"
            priority
            className="my-8 rounded-full"
          />         <h5>Airport Transfer</h5>
          <p>We offer training from Private Pilots lisence to Commerical, instruments, instructor and examiner ratings.</p>
        </CarouselItem>
        <CarouselItem className="sm:basis-1/3  text-center px-20">          <Image
          src={'https://placehold.co/400x400/jpg'}
          width={350}
          height={350}
          alt="Title Image"
          priority
          className="my-8 rounded-full"
        />         <h5>Airport Transfer</h5>
          <p>We offer training from Private Pilots lisence to Commerical, instruments, instructor and examiner ratings.</p></CarouselItem>
        <CarouselItem className="sm:basis-1/3  text-center px-20">          <Image
          src={'https://placehold.co/400x400/jpg'}
          width={350}
          height={350}
          alt="Title Image"
          priority
          className="my-8 rounded-full"
        />
          <h5>Airport Transfer</h5>
          <p>We offer training from Private Pilots lisence to Commerical, instruments, instructor and examiner ratings.</p>
        </CarouselItem>
        <CarouselItem className="sm:basis-1/3 text-center px-20">
          <Image
            src={'https://placehold.co/400x400/jpg'}
            width={400}
            height={400}
            alt="Title Image"
            priority
            className="my-8 rounded-full"
          />
          <h5>Airport Transfer</h5>
          <p>We offer training from Private Pilots lisence to Commerical, instruments, instructor and examiner ratings.</p>
        </CarouselItem>
      </CarouselContent>
      <div className="flex center justify-center mt-5">
        {Array.from(Array(count).keys()).map((i) => (
          <div key={i}>
            <Button
              className={`mx-1 h-1.5 flex-grow rounded-full p-3  ${i === current - 1
                ? "bg-red-500 hover:bg-green"
                : "bg-neutral-600/75"
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