import { Card, CardContent } from "@/components/ui/card";
import { PortableText } from "next-sanity";
import Image from "next/image";
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
    <main className="flex min-h-screen flex-col py-20">
      <h1 className="text-5xl font-bold mb-10">Our Fleet</h1>
      {data?.map((helicopter: helicopter, idx: number) => (
        <Card key={idx} className="mt-10">
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
    </main>
  );
}
