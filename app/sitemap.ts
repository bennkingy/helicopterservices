import { MetadataRoute } from "next";
import { client } from "./lib/sanity";

interface Post {
  mainImage?: string;
  title: string;
  currentSlug: string;
  smallDescription: string;
  updated: Date
}

async function getData() {
  const query = `*[_type == "training"] {
    "currentSlug": slug.current,
      "updated": _updatedAt
  }`
  const data = await client.fetch(query)
  return data;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data: any = await getData()

  const blogEntries: MetadataRoute.Sitemap = data.map((post: Post) => ({
    url: `https://helicopterservices.co.uk/training/${post.currentSlug}`,
    changeFrequency: "weekly",
    lastModified: post.updated
  }));

  // static routes
  return [
    {
      url: `https://helicopterservices.co.uk`,
      changeFrequency: "weekly",
      lastModified: "2024-01-10"
    },
    {
      url: `https://helicopterservices.co.uk/about`,
      changeFrequency: "weekly",
      lastModified: "2024-01-10"
    },
    {
      url: `https://helicopterservices.co.uk/contact`,
      changeFrequency: "weekly",
      lastModified: "2024-01-10"
    },
    ...blogEntries]
}