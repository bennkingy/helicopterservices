'use client'

import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Heading from "./Heading";

type props = {
  height?: string; // e.g. 'h-[70vh]' or 'h-[50vh]'
  title?: string; // e.g. 'Mallard Plumbing and Heating'
  subtitle?: string; // e.g. 'From checkout to global sales......'
  className?: string;
  image?: string;
};

const Header = ({ height = 'h-[420px]', title, subtitle, className, image, }: props) => {

  return (
    <section
      className={`relative w-screen h-[150px] sm:h-[300px] ${className} z-0 bg-slate-5`}
    >
      <Image
        priority
        src={image ? urlFor(image)?.url() : '/images/london.jpg'}
        fill
        objectFit="cover"
        objectPosition="center"
        alt="hero image example"
      />
      <div className='container max-w-6xl relative z-10 flex items-center h-full'>
        {/*//@ts-ignore*/}
        <Heading title={title || ''} tag='flights' titleSize="text-white text-5xl font-light" />
      </div>
      <div className={`bg-opacity-80 bg-brand-dark-blue top-0 bottom-0 right-0 left-0 absolute`}></div>
    </section>
  );
};

export default Header;
