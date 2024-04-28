import { FAQ } from "@/app/components/FAQ";
import YouTube from "@/app/components/YouTube";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/extensions";
import { helicopter, training } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import type { Metadata } from 'next';
import Image from "next/image";

export const revalidate = 30; // revalidate at most 30 seconds

async function getPageData(slug: string) {
  const query = `
    *[_type == "about" && slug.current == '${slug}'] {
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

async function getHelicopterData() {
  const query = `
  *[_type == 'helicopter'] | order(_createdAt desc) {
    model,
      capacity,
      topSpeed,
      introducedAt,
      description,
      mainImage,
  }`;
  const data = await client.fetch(query);

  return data;
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data: training = await getPageData(params.slug.toLowerCase());

  return {
    title: data?.seoTitle,
    description: data?.seoDescription,
  }
}

export default async function TrainingPage({ params }: { params: { slug: string } }) {
  const data: training = await getPageData(params.slug.toLowerCase());
  const helicopterData: any = await getHelicopterData();

  const showFaqs = params.slug === 'faqs';
  const showHanger = params.slug === 'the-hanger';
  const showHelicopters = params.slug === 'helicopter-fleet';

  return (
    <>
      <main className="max-w-6xl mx-auto px-4 overflow-x-hidden">
        {
          !showHanger && <div className="my-8">
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
            {showFaqs ?
              <div className="mt-8">
                <FAQ className="mb-10" />
              </div> : null
            }
            {showHelicopters ?
              <div className="py-10 max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold">See our Fleet</h1>
                <div className="grid sm:grid-cols-3 gap-3 mb-6">
                  {helicopterData?.map((helicopter: helicopter, idx: number) => (
                    <Card key={idx} className="mt-5">
                      <CardContent className="mt-5">
                        <h2 className="text-1xl font-bold">{helicopter?.model}</h2>
                        <h5>Capacity: {helicopter?.capacity}</h5>
                        <h5>Top speed: {helicopter?.topSpeed}</h5>
                        <h5>Joined the fleet: {formatDate(helicopter?.introducedAt)}</h5>
                        {helicopter?.mainImage &&
                          <Image
                            src={urlFor(helicopter?.mainImage).url()}
                            width={800}
                            height={800}
                            alt="Title Image"
                            priority
                            className="rounded-lg my-8 border"
                          />
                        }
                        <PortableText value={helicopter?.description} />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div> : null}
          </div>}
      </main >
      {
        showHanger ?
          <YouTube />
          : null
      }
    </>
  );
}