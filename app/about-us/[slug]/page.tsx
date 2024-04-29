import ContactCta from "@/app/components/ContactCta";
import { FAQ } from "@/app/components/FAQ";
import GetinTouchSmall from "@/app/components/GetinTouchSmall";
import Header from "@/app/components/Header";
import HelicopterCard from "@/app/components/HelicopterCard";
import Map from '@/app/components/Map';
import YouTube from "@/app/components/YouTube";
import { helicopter, training } from "@/lib/interface";
import { client } from "@/lib/sanity";
import { cn } from "@/lib/utils";
import { PortableText } from "@portabletext/react";
import type { Metadata } from 'next';

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
      mainImage,
      type,
      url,
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

export default async function AboutPage({ params }: { params: { slug: string } }) {
  const data: training = await getPageData(params.slug.toLowerCase());
  const helicopterData: any = await getHelicopterData();

  const showFaqs = params.slug === 'faqs';
  const showHanger = params.slug === 'the-hanger';
  const showHelicopters = params.slug === 'helicopter-fleet';

  console.log(helicopterData)

  return (
    <>
      <Header title={data?.title} image={data.mainImage} />
      <main className="container mx-auto px-4 grid py-16 grid-cols-1 md:grid-cols-3">
        <div className="pr-0 sm:pr-20 mb-10 sm:mb-0 col-span-2">
          <div className="prose prose-a:text-brand-light-blue font-openSans prose-h2:font-workSans prose-h2:text-4xl prose-strong:font-bold marker:text-brand-light-blue max-w-full">
            <PortableText value={data?.body || ''} />
          </div>
          {
            !showHanger && <div className="my-8">
              {showFaqs ?
                <div className="mt-8">
                  <FAQ className="mb-10" />
                </div> : null
              }
              {showHelicopters ?
                <div className="pt-5">
                  <h1 className="text-xl font-bold font-workSans">Guimbal Type</h1>
                  <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 mb-6")}>
                    {/* // @ts-ignore */}
                    {helicopterData?.filter((helicopter: helicopter) => helicopter?.type === 'Guimbal').map((helicopter: helicopter, idx: number) => (
                      <HelicopterCard key={idx} helicopter={helicopter} />
                    ))}
                  </div>
                  <h1 className="text-xl font-bold font-workSans mt-12">Robinson Type</h1>
                  <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 mb-6")}>
                    {helicopterData?.map((helicopter: helicopter, idx: number) => (
                      <HelicopterCard key={idx} helicopter={helicopter} />
                    ))}
                  </div>
                  <h1 className="text-xl font-bold font-workSans mt-12">Aérospatiale, Eurocopter & Airbus Type</h1>
                  <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 mb-6")}>
                    {helicopterData?.map((helicopter: helicopter, idx: number) => (
                      <HelicopterCard key={idx} helicopter={helicopter} />
                    ))}
                  </div>
                  <h1 className="text-xl font-bold font-workSans mt-12">Agusta Type</h1>
                  <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 mb-6")}>
                    {helicopterData?.map((helicopter: helicopter, idx: number) => (
                      <HelicopterCard key={idx} helicopter={helicopter} />
                    ))}
                  </div>
                  <h1 className="text-xl font-bold font-workSans mt-12">Bell Type</h1>
                  <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 mb-6")}>
                    {helicopterData?.map((helicopter: helicopter, idx: number) => (
                      <HelicopterCard key={idx} helicopter={helicopter} />
                    ))}
                  </div>
                </div>
                : null}
            </div>}
        </div>
        <div>
          <ContactCta />
          <GetinTouchSmall className='mt-3' />
          <Map className='h-[400px] mt-3' />
        </div>
      </main >
      {
        showHanger ?
          <YouTube />
          : null
      }
    </>
  );
}