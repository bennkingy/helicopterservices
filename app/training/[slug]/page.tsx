import Header from "@/app/components/Header";
import { training } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
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
    <main className="bg-brand-light-grey">
      <Header title={data?.title || 'no title'} image={urlFor(data.mainImage).url()} />
      <div className="prose prose-a:text-brand-light-blue">
        <PortableText value={data?.body || ''} />
      </div>
    </main>
  );
}