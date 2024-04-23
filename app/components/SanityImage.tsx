// import { urlFor } from "@/lib/sanity";
// import Image from "next/image";
// // @ts-ignore
// import { getPlaiceholder } from "plaiceholder";

// const SanityImage = async ({ image, width, height, className, alt = 'Helicopter Services' }: any) => {

//   const imageUrl = urlFor(image).width(400).height(400).dpr(2).quality(100).url()

//   const src = imageUrl;
  
//   const buffer = await fetch(src).then( async (res) => {
//       return Buffer.from(await res.arrayBuffer())
//   })

//   const { base64 } = await getPlaiceholder(buffer)

//   return (
//     <Image 
//       className={className}
//       width={width}
//       height={height}
//       src={src || ''}
//       placeholder="blur"
//       blurDataURL={base64}
//       alt={alt}
//     />
//   )
// }
// export default SanityImage