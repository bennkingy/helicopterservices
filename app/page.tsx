import { Card, CardContent } from "@/components/ui/card";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Carousel from "./components/Carousel";
import Enquire from "./components/Enquire";
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
      <div className="py-10 bg-brand-dark-blue">
        <div className="max-w-6xl container">
          <MainServices />
        </div>
      </div>
      <div className="py-10 max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2">
        <div>
          Images go here
        </div>
        <div>
          <h2 className="max-w-2xl">Over 20 years helicopter
            operating experience.</h2>
          <p>We offer training from Private Pilot’s Licence to Commercial, Instruments, Instructor, and Examiner Ratings.  Our senior instructors/examiners in the UK provide type ratings on 17+ helicopter types, and advanced courses. . For gifts, transfers, charters, photography, load lifting, flight learning, helicopter purchase, AOC management, or medical info, we’re here.</p>
          <ul>
            <li>Experienced pilots & instructors</li>
            <li>Professional & accommodating</li>
            <li>Excellent customer service</li>
            <li>Operating safely since 2000</li>
            <li>Exceeding exacting industry standards</li>
          </ul>
          <p>
            Captain Leon Smith<br />Head Pilot / Chief Pilot<br />Helicopter Services
          </p>
        </div>
      </div>
      <div className="py-10 max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold">See our Fleet</h1>
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
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
      <div className="py-10 bg-brand-light-grey">
        <div className="max-w-6xl container">
          <Carousel />
        </div>
        <div className="py-10 max-w-6xl mx-auto px-4">
          <div className="py-6"></div>
          <Enquire />
        </div>
      </div>
    </main>
  );
}
