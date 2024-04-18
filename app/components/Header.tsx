'use client'

import { urlFor } from "@/lib/sanity";
import Image from "next/image";

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
      className={`relative w-screen h-[150px] sm:h-[300px] ${className}`}
    >
      <Image
        priority
        src={image ? urlFor(image)?.url() : 'https://cdn.sanity.io/images/0he7nz2b/production/6970de59aa24da2973e3892c2f43231ef132fcee-1680x419.png'}
        fill
        objectFit="cover"
        objectPosition="center"
        alt="hero image example"
      />
      <div className='container max-w-6xl relative z-10 flex items-center h-full'>
        <h1 className='text-4xl tracking-tight leading-none md:text-5xl xl:text-5xl dark:text-white text-white'>
          {title}
        </h1>
      </div>
    </section>
  );
};

export default Header;
