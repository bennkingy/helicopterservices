import Template from "@/app/components/Template";
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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await getPageData(params.slug.toLowerCase());

  return {
    title: data?.seoTitle,
    description: data?.seoDescription,
  }
}

export default async function FleetItemPage({ params }: { params: { slug: string } }) {
  const data: any = await getPageData(params.slug.toLowerCase());

  return (
    <>
      <Template data={data} />
    </>
  );
}