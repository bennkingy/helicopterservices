import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Heading from "../components/Heading";

interface ServiceCard {
  heading: string;
  url: string;
  description: string;
  category: string;
  subCategory?: string;
  image?: any;
}

const ServiceCard = ({ heading, url, description, category, image }: ServiceCard) => {

  const imageUrl = image && urlFor(image).width(400).height(400).dpr(2).quality(100).url()
  const blurUrl = image && urlFor(image).width(400).height(400).quality(20).url()

  return (
    <a href={url} className="bg-white justify-between shadow-brand rounded-none border-0 border-b-4 border-brand-light-blue relative flex flex-col-reverse	items-center overflow-hidden md:flex-row md:max-w-xl  dark:border-gray-700 dark:bg-gray-800 group">
      <div className="flex flex-col justify-between p-5 leading-normal basis-full w-full sm:basis-3/6">
        {/*@ts-ignore*/}
        <Heading title={heading} tag={category} titleSize="text-2xl sm:text-3xl" tagSize="text-sm" iconSize={15} className="my-3 sm:my-5" iconStyles='mb-4' />
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 font-openSans">{description}</p>
      </div>
      <div className="absolute bottom-0 right-0 z-10">
        <svg className="text-brand-light-blue h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <polygon points="20 0 20 20 0 20" />
        </svg>
        <Image
          src="/images/caret-right.svg"
          alt="Helicopter Services"
          width={6}
          height={6}
          className='absolute bottom-0 right-1'
        />
      </div>
        <Image 
          className="object-cover h-full rounded-none main-image basis-3/6 w-[full] md:w-[200px] transition-transform duration-300 ease-in-out group-hover:scale-110"
          width={400}
          height={400}
          src={imageUrl || ''}
          blurDataURL={blurUrl}
          alt=""
        />
    </a>
  )
}

export default ServiceCard