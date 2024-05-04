import { FAQ } from "@/app/components/FAQ";
import HelicopterCard from "@/app/components/HelicopterCard";
import Template from "@/app/components/Template";
import YouTube from "@/app/components/YouTube";
import { helicopter, training } from "@/lib/interface";
import { client } from "@/lib/sanity";
import { cn } from "@/lib/utils";
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

  console.log(showHanger)

  return (
    <>
      <Template data={data} showHanger={showHanger}>
        {!showHanger && <div className="mt-8">
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
              <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3")}>
                {helicopterData?.map((helicopter: helicopter, idx: number) => (
                  <HelicopterCard key={idx} helicopter={helicopter} />
                ))}
              </div>
            </div>
            : null}
        </div>}
      </Template>
      {
        showHanger ?
          <YouTube />
          : null
      }
    </>
  );
}