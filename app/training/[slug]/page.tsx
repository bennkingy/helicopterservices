import ContactCta from "@/app/components/ContactCta";
import GetinTouchSmall from "@/app/components/GetinTouchSmall";
import Header from "@/app/components/Header";
import Map from '@/app/components/Map';
import { training } from "@/lib/interface";
import { client } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import type { Metadata } from 'next';
export const revalidate = 30; // revalidate at most 30 seconds

async function getData(slug: string) {
  const query = `
    *[_type == "training" && slug.current == '${slug}'] {
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
      <Header title={data?.title} image={data.mainImage} />
      <main className="max-w-6xl mx-auto px-4 grid py-10 grid-cols-1 md:grid-cols-3">
        <div className="pr-0 sm:pr-20 mb-10 sm:mb-0 col-span-2">
          <div className="prose prose-a:text-brand-light-blue">
            <PortableText value={data?.body || ''} />
          </div>
        </div>
        <div>
          <ContactCta />
          <GetinTouchSmall />
          <Map />
        </div>
      </main >
    </>
  );
}