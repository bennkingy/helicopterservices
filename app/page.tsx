import { Card, CardContent } from "@/components/ui/card";
import { FAQ } from "./components/FAQ";
import { helicopter } from "./lib/interafce";
import { client } from "./lib/sanity";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData() {
  const query = `
  *[_type == 'helicopter'] | order(_createdAt desc) {
    model,
      capacity,
      "currentSlug": slug.current,
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: helicopter[] = await getData();

  console.log(data);

  return (
    <main className="flex min-h-screen flex-col py-20">
      <h1 className="text-5xl font-bold mb-10">Helicopter Services</h1>
      {data.map((post: helicopter, idx) => (
        <Card key={idx}>
          <CardContent className="mt-5">
            <h2 className="text-1xl font-bold">Model: {post.model}</h2>
            <h5>Capacity: {post.capacity}</h5>
          </CardContent>
        </Card>
      ))}
      <FAQ />
    </main>
  );
}
