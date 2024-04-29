import { client } from "@/lib/sanity";
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
  // const data: training = await getPageData(params.slug.toLowerCase());
  const helicopterData: any = await getHelicopterData();

  const showFaqs = params.slug === 'faqs';
  const showHanger = params.slug === 'the-hanger';
  const showHelicopters = params.slug === 'helicopter-fleet';

  return (
    <>
      <main className="container py-40 overflow-x-hidden">
      </main>
    </>
  );
}