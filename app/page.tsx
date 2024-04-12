import { Card, CardContent } from "@/components/ui/card";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Hero from "./components/Hero";
import { MainServices } from "./components/MainServices";
import { formatDate } from "./lib/extensions";
import { helicopter } from "./lib/interafce";
import { client, urlFor } from "./lib/sanity";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData() {
  const query = `
  *[_type == 'helicopter'] | order(_createdAt desc) {
    model,
      capacity,
      topSpeed,
      introducedAt,
      description,
      mainImage,
      "currentSlug": slug.current,
  }`;

  const data: helicopter[] = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: helicopter[] = await getData();

  return (
    <main className="">
      <Hero title="Exceeding exacting industry standards." />
      <div className="py-10 bg-slate-100">
        <div className="max-w-6xl container">
          <MainServices />
        </div>
      </div>
      <div className="py-10 max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold">Our Fleet</h1>
        <div className="grid sm:grid-cols-3 gap-3">
          {data?.map((helicopter: helicopter, idx: number) => (
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
      </div>
    </main>
  );
}
