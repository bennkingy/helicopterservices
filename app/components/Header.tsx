import { urlFor } from "@/lib/sanity";
import Image from "next/image";
// @ts-ignore
import { getPlaiceholder } from "plaiceholder";
import Heading from "./Heading";

type props = {
  height?: string; // e.g. 'h-[70vh]' or 'h-[50vh]'
  title?: string; // e.g. 'Mallard Plumbing and Heating'
  className?: string;
  image?: string;
  tag?: string;
};

const Header = async ({ height = 'h-[420px]', title, className, image, tag = 'Flights' }: props) => {

  const imageUrl = urlFor(image).width(2000).height(400).dpr(2).quality(100).url() || ''
  // @ts-ignore
  // const blurUrl = image?.asset?.metadata?.lqip || ''

  const src = imageUrl;

  const buffer = await fetch(src).then( async (res) => {
      return Buffer.from(await res.arrayBuffer());
  })

  const { base64 } = await getPlaiceholder(buffer);

    return (
    <section
      className={`relative w-screen h-[150px] sm:h-[300px] ${className} z-0 bg-slate-5`}
    >
     <Image
        priority
        src={src || ''}
        placeholder="blur"
        objectFit="cover"
        objectPosition="center"
        fill
        blurDataURL={base64}
        alt="hero image example"
      />
      <div className='container max-w-6xl relative z-10 flex items-center h-full'>
        {/*//@ts-ignore*/}
        <Heading title={title || ''} tag={tag} tagSize='text-xs' iconSize={14} titleSize="text-white text-xl sm:text-5xl font-light max-w-[600px]" />
      </div>
      <div className={`bg-opacity-70 bg-brand-dark-blue top-0 bottom-0 right-0 left-0 absolute`}></div>
    </section>
  );
};

export default Header;
