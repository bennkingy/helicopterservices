import { Card, CardContent } from "@/components/ui/card";
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl font-bold">Helicopter Services</h1>
        {data.map((post: helicopter, idx) => (
               <Card key={idx}> <CardContent className="mt-5">
            <h2>Model: {post.model}</h2>
            <p>Capacity: {post.capacity}</p>          </CardContent>

            </Card>
        ))}
    </main>
  );
}
