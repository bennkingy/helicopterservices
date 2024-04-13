import {
  Carousel as CarouselComponent,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const Carousel = () => {
  return (
    <CarouselComponent>
      <CarouselContent className="-ml-2 md:-ml-4">
        <CarouselItem className="basis-3/3  sm:basis-1/3 text-center px-20">
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
      <CarouselPrevious />
      <CarouselNext />
    </CarouselComponent>
  )
}

export default Carousel