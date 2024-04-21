import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

export const client = createClient({
  apiVersion: "2023-05-03",
  dataset: "production",
  projectId: "0he7nz2b",
  useCdn: false, // We use ISR, so we don't need the CDN
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}


// Function to generate URL and fetch metadata for an image
// export function urlFor(source: any, includeMetadata = false) {
//   const url = builder.image(source).url();
//   if (!includeMetadata) {
//     return url;
//   }

//   // Assuming metadata is part of the source object
//   // This would require your queries fetching 'source' to include metadata fields
//   const metadata = {
//     dimensions: source.metadata.dimensions,
//     lqip: source.metadata.lqip,
//   };

//   console.log(metadata)
  
//   return {
//     url,
//     metadata,
//   };
// // }