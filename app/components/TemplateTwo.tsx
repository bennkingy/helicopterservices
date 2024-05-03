'use client'

import Map from '@/app/components/Map';
import { urlFor } from '@/lib/sanity';
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { useState } from 'react';
import { FleetItem } from '../fleet/[slug]/page';
import Breadcrumbs from "./Breadcrumbs";
import Gallery from './Gallery';
import TextLink from './TextLink';
import ThreeDimensionVideo from './ThreeDimensionVideo';

type props = {
  data: FleetItem;
  children?: any;
}

const TemplateTwo = ({ data, children }: props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  type StatusIconProps = {
    status: boolean;
  };

  const StatusIcon = ({ status }: StatusIconProps) => {
    const imageUrl = status ? '/images/Check.png' : '/images/checkTwo.svg';
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

  // Define the Helicopter interface
  interface Helicopter {
    type: string;
    engine: string;
    carries: number;
    ifr: boolean;
    cruise: number;
    base: string;
    training: boolean;
    charter: boolean;
    aerialWork: boolean;
  }

  // Example helicopter object
  const exampleHelicopter: Helicopter = {
    type: "Utility",
    engine: "Twin Turbine",
    carries: 14,
    ifr: true,
    cruise: 140,
    base: "Kathmandu",
    training: false,
    charter: true,
    aerialWork: true
  };

  const SpecificationTable = ({ helicopter, className }: any) => {
    return (
      <div className={className}>
        <div className="w-full md:w-1/2 flex flex-col space-y-2">
          {/* Type */}
          <div className='flex'>
            <p className="flex justify-between font-bold font-openSans text-sm">Type</p>
            <span className='flex-1 border-b border-dotted border-gray-400'></span>
            <span className="text-right">{helicopter.type}</span>
          </div>

          {/* Engine */}
          <div className='flex'>
            <p className="flex justify-between font-bold font-openSans text-sm">Engine</p>
            <span className='flex-1 border-b border-dotted border-gray-400'></span>
            <span className="text-right">{helicopter.engine}</span>
          </div>

          {/* Carries */}
          <div className='flex'>
            <p className="flex justify-between font-bold font-openSans text-sm">Carries</p>
            <span className='flex-1 border-b border-dotted border-gray-400'></span>
            <span className="text-right">{helicopter.carries}</span>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col space-y-2">
          {/* IFR */}
          <div className='flex'>
            <p className="flex justify-between font-bold font-openSans text-sm">IFR</p>
            <span className='flex-1 border-b border-dotted border-gray-400'></span>
            <span className="text-right">{helicopter.ifr ? 'Yes' : 'No'}</span>
          </div>

          {/* Cruise */}
          <div className='flex'>
            <p className="flex justify-between font-bold font-openSans text-sm">Cruise</p>
            <span className='flex-1 border-b border-dotted border-gray-400'></span>
            <span className="text-right">{helicopter.cruise}</span>
          </div>

          {/* Base */}
          <div className='flex'>
            <p className="flex justify-between font-bold font-openSans text-sm">Base</p>
            <span className='flex-1 border-b border-dotted border-gray-400'></span>
            <span className="text-right">{helicopter.base}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Breadcrumbs className='container pt-[125px] sm:pt-[180px]' slug={data?.title} />
      <main className="container mx-auto px-4 grid pb-16 grid-cols-1 md:grid-cols-5 mt-8">
        <div className="mr-0 md:mr-20 mb-10 sm:mb-0 col-span-3 relative">
          <Image
            priority
            src={'/images/3d-rotate-icon.png'}
            alt=""
            width={53}
            height={47}
            className='absolute top-0 right-0'
          />
          <h2 className='text-brand-light-blue text-3xl font-normal font-workSans -ml-[2px]'>Our fleet</h2>
          <h3 className='text-brand-dark-blue text-6xl font-light font-workSans mt-2 -ml-1'>{data?.title}</h3>
          <div className='mt-7 mb-8'>
            <div className='flex flex-row items-center'><StatusIcon status={data?.workType?.trainingHelicopter} /><p className='m-0 ml-3'>Training Helicopter</p></div>
            <div className='flex flex-row items-center'><StatusIcon status={data?.workType?.charterHelicopter} /><p className='m-0 ml-3'>Charter Helicopter</p></div>
            <div className='flex flex-row items-center'><StatusIcon status={data?.workType?.aerialWorkHelicopter} /><p className='m-0 ml-3'>Aerial Work Helicopter</p></div>
          </div>
          <div className="prose prose-a:text-brand-light-blue font-openSans prose-h2:font-workSans prose-h2:text-4xl prose-strong:font-bold marker:text-brand-light-blue max-w-full">
            <PortableText value={data?.body || ''} />
            <TextLink label='3D cockpit view' className='mt-7' onClick={() => setIsModalOpen(!isModalOpen)} />
          </div>
          <h3 className='text-md font-bold mt-7 font-openSans mb-5'>Specifications</h3>
          <SpecificationTable helicopter={exampleHelicopter} className='mb-6' />
          <TextLink label='Comparison chart' className='mt-9' onClick={() => setIsModalOpen(!isModalOpen)} />
          {children}
          <Gallery className='my-10' />
        </div>
        <div className='col-span-2'>
          <div className='relative mb-10' style={{ width: '100%', paddingBottom: '100%', clipPath: 'polygon(0 0,calc(100% - 20px) 0, 100% 20px,100% 100%, 0 100%)' }}>
            <Image
              priority
              src={urlFor(data.mainImage).url()}
              objectFit="cover"
              objectPosition="center"
              layout="fill"
              alt="hero image example"
            />
          </div>
          <ThreeDimensionVideo openModal={isModalOpen} onClose={() => setIsModalOpen(!isModalOpen)} />
          <div className='bg-brand-medium-blue px-5 py-4 mt-10 border-b-4 border-brand-light-blue'>
            <p className='text-white font-bold font-openSans'>This Helicopter is based at:</p>
            <p className='text-white font-openSans font-thin'>White Waltham Airfield, Maidenhead, Berkshire, SL6 3N</p>
          </div>
          <Map className='h-[400px]'></Map>
        </div>
      </main >
    </>
  )
}

export default TemplateTwo