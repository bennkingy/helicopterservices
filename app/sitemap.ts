import { client } from "@/lib/sanity";
import { MetadataRoute } from "next";

interface Page {
  currentSlug: string;
  updated: Date
}

async function getTrainingData() {
  const query = `*[_type == "training"] {
    "currentSlug": slug.current,
      "updated": _updatedAt
  }`
  const data: Page[] = await client.fetch(query)
  return data;
}

async function getAboutData() {
  const query = `*[_type == "about"] {
    "currentSlug": slug.current,
      "updated": _updatedAt
  }`
  const data: Page[] = await client.fetch(query)
  return data;
}

async function getFlightstData() {
  const query = `*[_type == "flights"] {
    "currentSlug": slug.current,
      "updated": _updatedAt
  }`
  const data: Page[] = await client.fetch(query)
  return data;
}

async function getLegalData() {
  const query = `*[_type == "legal"] {
    "currentSlug": slug.current,
      "updated": _updatedAt
  }`
  const data: Page[] = await client.fetch(query)
  return data;
}

async function getIndustryData() {
  const query = `*[_type == "industry"] {
    "currentSlug": slug.current,
      "updated": _updatedAt
  }`
  const data: Page[] = await client.fetch(query)
  return data;
}

async function getFleetData() {
  const query = `*[_type == "fleet"] {
    "currentSlug": slug.current,
      "updated": _updatedAt
  }`
  const data: Page[] = await client.fetch(query)
  return data;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const trainingData: Page[] = await getTrainingData()
  const aboutData: Page[] = await getAboutData()
  const flightsData: Page[] = await getFlightstData()
  const legalData: Page[] = await getLegalData()
  const industryData: Page[] = await getIndustryData()
  const fleetData: Page[] = await getFleetData()

  const training: MetadataRoute.Sitemap = trainingData.map((page: Page) => ({
    url: `https://helicopterservices.co.uk/training/${page.currentSlug}`,
    changeFrequency: "weekly",
    lastModified: page.updated
  }));

  const about: MetadataRoute.Sitemap = aboutData.map((page: Page) => ({
    url: `https://helicopterservices.co.uk/about-us/${page.currentSlug}`,
    changeFrequency: "weekly",
    lastModified: page.updated
  }));

  const flights: MetadataRoute.Sitemap = flightsData.map((page: Page) => ({
    url: `https://helicopterservices.co.uk/flights/${page.currentSlug}`,
    changeFrequency: "weekly",
    lastModified: page.updated
  }));

  const legal: MetadataRoute.Sitemap = legalData.map((page: Page) => ({
    url: `https://helicopterservices.co.uk/legal/${page.currentSlug}`,
    changeFrequency: "weekly",
    lastModified: page.updated
  }));

  const fleet: MetadataRoute.Sitemap = fleetData.map((page: Page) => ({
    url: `https://helicopterservices.co.uk/fleet/${page.currentSlug}`,
    changeFrequency: "weekly",
    lastModified: page.updated
  }));

  const industry: MetadataRoute.Sitemap = industryData.map((page: Page) => ({
    url: `https://helicopterservices.co.uk/industry/${page.currentSlug}`,
    changeFrequency: "weekly",
    lastModified: page.updated
  }));

  return [
    {
      url: `https://helicopterservices.co.uk`,
      changeFrequency: "weekly",
      lastModified: "2024-01-10"
    },
    {
      url: `https://helicopterservices.co.uk/training`,
      changeFrequency: "weekly",
      lastModified: "2024-01-10"
    },
    ...training,
    {
      url: `https://helicopterservices.co.uk/industry`,
      changeFrequency: "weekly",
      lastModified: "2024-01-10"
    },
    ...industry,
    {
      url: `https://helicopterservices.co.uk/flights`,
      changeFrequency: "weekly",
      lastModified: "2024-01-10"
    },
    ...flights,
    {
      url: `https://helicopterservices.co.uk/fleet`,
      changeFrequency: "weekly",
      lastModified: "2024-01-10"
    },
    ...fleet,
    {
      url: `https://helicopterservices.co.uk/about-us`,
      changeFrequency: "weekly",
      lastModified: "2024-01-10"
    },
    ...about,
    {
      url: `https://helicopterservices.co.uk/Enquire`,
      changeFrequency: "weekly",
      lastModified: "2024-01-10"
    },
    ...legal,
  ]
}