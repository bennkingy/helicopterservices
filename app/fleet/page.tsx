import { FAQ } from "@/app/components/FAQ";
import HelicopterCard from "@/app/components/HelicopterCard";
import YouTube from "@/app/components/YouTube";
import { helicopter, training } from "@/lib/interface";
import { client } from "@/lib/sanity";
import { cn } from "@/lib/utils";
import { PortableText } from "@portabletext/react";
import type { Metadata } from 'next';

export const revalidate = 30; // revalidate at most 30 seconds

async function getPageData(slug: string) {
  const query = `
    *[_type == "fleet" && slug.current == '${slug}'] {
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
  // const data: training = await getPageData(params.slug.toLowerCase());

  return {
    // title: data?.seoTitle,
    // description: data?.seoDescription,
  }
}

export default async function FleetPage({ params }: { params: { slug: string } }) {
  const data: training = await getPageData(params.slug.toLowerCase());
  const helicopterData: any = await getHelicopterData();

  const showFaqs = params.slug === 'faqs';
  const showHanger = params.slug === 'the-hanger';
  const showHelicopters = params.slug === 'helicopter-fleet';

  return (
    <>
      <main className="container py-40 overflow-x-hidden">
        {
          !showHanger && <div className="my-8">
            <h1 className="block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
              {data?.title || 'no title'}
            </h1>
            <div className="mt-8">
              <PortableText value={data?.body || ''} />
            </div>
            {showFaqs ?
              <div className="mt-8">
                <FAQ className="mb-10" />
              </div> : null
            }
            {showHelicopters ?
              <div className="py-10">
                <h1 className="text-3xl font-bold">See our Fleet</h1>
                <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6")}>
                  {helicopterData?.map((helicopter: helicopter, idx: number) => (
                    <HelicopterCard key={idx} helicopter={helicopter} />
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