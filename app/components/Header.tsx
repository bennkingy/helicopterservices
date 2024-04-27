import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import Heading from "./Heading";

type props = {
  height?: string; // e.g. 'h-[70vh]' or 'h-[50vh]'
  title?: string; // e.g. 'Mallard Plumbing and Heating'
  className?: string;
  image?: string;
  tag?: string;
  tagColor?: 'white' | 'light-blue' | 'dark-blue';
};

const Header = async ({ height = 'h-[30px]', title, className, image, tag = 'Flights', tagColor = 'white' }: props) => {

  // .width(2000).height(400).dpr(2).quality(75)
  const imageUrl = urlFor(image).url() || ''
  // @ts-ignore
  // const blurUrl = image?.asset?.metadata?.lqip || ''

  const src = imageUrl;

  const buffer = await fetch(src).then(async (res) => {
    return Buffer.from(await res.arrayBuffer());
  })

  const { base64 } = await getPlaiceholder(buffer);

  return (
    <section
      className={`relative w-screen h-[330px] sm:h-[575px] ${className} z-1 bg-slate-5`}
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
      <div className='container relative z-10 flex items-center h-full pt-[115px]'>
        {/*//@ts-ignore*/}
        <Heading title={title || ''} tag={tag} tagSize='text-xs text-white' iconColor={tagColor} iconSize={14} titleSize="text-white text-xl sm:text-5xl font-light max-w-[600px]" />
      </div>
      <div className={`bg-opacity-70 bg-brand-dark-blue top-0 bottom-0 right-0 left-0 absolute`}></div>
    </section>
  );
};

export default Header;
