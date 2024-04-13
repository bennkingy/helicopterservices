import { training } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import type { Metadata } from 'next';
import Image from "next/image";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData(slug: string) {
  const query = `
    *[_type == "flights" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          title,
          seoTitle,
          seoDescription,
          body,
          mainImage,
      }[0]`;
  const data = await client.fetch(query);

  return data;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data: training = await getData(params.slug.toLowerCase());

  return {
    title: data?.seoTitle,
    description: data?.seoDescription,
  }
}

export default async function TrainingPage({ params }: { params: { slug: string } }) {
  const data: any = await getData(params.slug.toLowerCase());

  return (
    <>
      <main className="max-w-6xl mx-auto px-4">
        <div className="my-8">
          <h1 className="block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
            {data?.title || 'no title'}
          </h1>
          {data?.mainImage && <Image
            src={urlFor(data.mainImage).url()}
            width={2000}
            height={800}
            alt="Title Image"
            priority
            className="rounded-lg mt-8 border"
          />}
          <div className="mt-8">
            <PortableText value={data?.body || ''} />
          </div>
        </div>
      </main >
    </>
  );
}