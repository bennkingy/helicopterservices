import GetinTouchSmall from "@/app/components/GetinTouchSmall";
import Header from "@/app/components/Header";
import { training } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import type { Metadata } from 'next';
import { PortableText } from "next-sanity";
import Image from "next/image";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData(slug: string) {
  const query = `
    *[_type == "industry" && slug.current == '${slug}'] {
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
  const headerImage = data?.mainImage ? urlFor(data.mainImage).url() : 'https://images.pexels.com/photos/1549308/pexels-photo-1549308.jpeg?auto=compress&cs=tinysrgb&w=2000';

  console.log(headerImage);

  return (
    <>
      <Header title={data?.title} image={data.mainImage} backgroundPosition={'bg-bottom'} />
      <main className="max-w-6xl mx-auto px-4 grid py-10 grid-cols-1 md:grid-cols-3">
        <div className="pr-0 sm:pr-20 mb-10 sm:mb-0 col-span-2">
          <div className="animate-in fade-in zoom-in prose prose-a:text-blue-400">
            <PortableText value={data?.body || ''} />
          </div>
        </div>
        <div className='text-white bg-brand-medium-blue h-fit'>
          <div className='bg-brand-medium-blue py-5 text-white p-10 relative'>
            <Image
              src={'/images/ruth.png'}
              width={82}
              height={82}
              alt="Title Image"
              priority
              className="rounded-lg -top-5 right-5 absolute z-10"
            />
          </div>
          <div className=' text-white relative z-1'>
            <h5 className="font-bold mb-4  pl-10 pr-20">“Contact us today for a customised quote tailored to your needs”</h5>
            <p className='pl-10'>Captain Ruth Downey,<br /><span className="text-brand-light-blue">Accountable Manager/Examiner</span></p>
            <table className={`table-fixed mt-5 ml-10 w-full`}>
              <tbody>
                <tr>
                  <td>Monday:</td> <td>08:30 - 1730</td>
                </tr>
                <tr>
                  <td>Tuesday:</td> <td>08:30 - 1730</td>
                </tr>
                <tr>
                  <td>Wednesday:</td> <td>08:30 - 1730</td>
                </tr>
                <tr>
                  <td>Thursday:</td> <td>08:30 - 1730</td>
                </tr>
                <tr>
                  <td>Friday:</td> <td>08:30 - 1730</td>
                </tr>
                <tr className="font-bold">
                  <td>Saturday:</td> <td>Closed</td>
                </tr>
                <tr className="font-bold">
                  <td>Sunday:</td> <td>Closed</td>
                </tr>
              </tbody>
            </table>
          </div>
          <GetinTouchSmall />
        </div>
      </main >
    </>
  );
}