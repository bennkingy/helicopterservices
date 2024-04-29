import Map from '@/app/components/Map';
import { urlFor } from '@/lib/sanity';
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { FleetItem } from '../fleet/[slug]/page';
import Breadcrumbs from "./Breadcrumbs";
import ThreeDimensionVideo from './ThreeDimensionVideo';

type props = {
  data: FleetItem;
  children?: any;
}

const TemplateTwo = ({ data, children }: props) => {

  type StatusIconProps = {
    status: boolean;
  };

  const StatusIcon = ({ status }: StatusIconProps) => {
    const imageUrl = status ? '/images/checkOne.svg' : '/images/checkTwo.svg';
    const altText = status ? 'Option selected' : 'Option not selected';

    return (
      <Image
        priority
        src={imageUrl}
        width={18}
        height={18}
        alt={altText}
        className='m-0 p-0'
      />
    );
  };

  return (
    <>
      <Breadcrumbs className='container pt-52' slug={data?.title} />
      <main className="container mx-auto px-4 grid pb-16 grid-cols-1 md:grid-cols-5 mt-10">
        <div className="pr-0 sm:pr-20 mb-10 sm:mb-0 col-span-3">
          <div className="prose prose-a:text-brand-light-blue font-openSans prose-h2:font-workSans prose-h2:text-4xl prose-strong:font-bold marker:text-brand-light-blue max-w-full">
            <h2>Our fleet</h2>
            <h3>{data?.title}</h3>
            <div>
              <div className='flex flex-row items-center'><StatusIcon status={data?.workType?.trainingHelicopter} /><p className='m-0 ml-3'>Training Helicopter</p></div>
              <div className='flex flex-row items-center'><StatusIcon status={data?.workType?.charterHelicopter} /><p className='m-0 ml-3'>Charter Helicopter</p></div>
              <div className='flex flex-row items-center'><StatusIcon status={data?.workType?.aerialWorkHelicopter} /><p className='m-0 ml-3'>Aerial Work Helicopter</p></div>
            </div>
            <PortableText value={data?.body || ''} />
          </div>
          {children}
        </div>
        <div className='col-span-2'>
          <div className='relative w-full h-[450px]'>
            <Image
              priority
              src={urlFor(data.mainImage).url()}
              objectFit="cover"
              objectPosition="center"
              fill
              alt="hero image example"
            />
          </div>
          <ThreeDimensionVideo />
          <div className='bg-brand-medium-blue p-3 mt-3'>
            <Map className='h-[400px]'></Map>
            <p className='pt-4 text-white font-bold font-openSans'>This Helicopter is based at:</p>
            <p className='text-white font-openSans'>White Waltham Airfield, Maidenhead, Berkshire, SL6 3N</p>
          </div>
        </div>
      </main >
    </>
  )
}

export default TemplateTwo