import Image from "next/image";
import Heading from "../components/Heading";

interface ServiceCard {
  header: string;
  url: string;
  description: string;
  category: string;
}

const ServiceCard = ({ header, url, description, category }: ServiceCard) => {
  return (
    <a href={url} className="bg-white justify-between shadow-xl rounded-none border-0 border-b-4 border-brand-light-blue relative flex flex-col-reverse	items-center overflow-hidden md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <div className="flex flex-col justify-between p-5 leading-normal basis-full w-full sm:basis-3/6">
        {/*@ts-ignore*/}
        <Heading title={header} tag={category} titleSize="text-2xl sm:text-3xl" tagSize="text-sm" iconSize={15} className="my-3 sm:my-5" iconStyles='mb-4' />
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 font-openSans">{description}</p>
      </div>
      <div className="absolute bottom-0 right-0">
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
      <Image className="object-cover h-full rounded-none main-image basis-3/6 w-[full] md:w-[200px]" width={720} height={720} src="/images/0.jpg" alt="" />
    </a>
  )
}

export default ServiceCard