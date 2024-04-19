import type { Metadata } from "next";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";

export const metadata: Metadata = {
  title: "Industry - Helicopter Services",
  description: "Helicopter Services",
};

const industryServices: ServiceCard[] = [
  {
    header: 'Airport transfers.',
    url: '/airport-transfers',
    description: 'A quick and easy way to get to your destination.',
    category: 'Industry'
  },
  {
    header: 'Special events.',
    url: '/airport-transfers',
    description: 'A quick and easy way to get to your destination.',
    category: 'Industry'
  },
  {
    header: 'Airport transfers.',
    url: '/airport-transfers',
    description: 'A quick and easy way to get to your destination.',
    category: 'Industry'
  },
  {
    header: 'Airport transfers.',
    url: '/airport-transfers',
    description: 'A quick and easy way to get to your destination.',
    category: 'Industry'
  },
  {
    header: 'Airport transfers.',
    url: '/airport-transfers',
    description: 'A quick and easy way to get to your destination.',
    category: 'Industry'
  },
  {
    header: 'Airport transfers.',
    url: '/airport-transfers',
    description: 'A quick and easy way to get to your destination.',
    category: 'Industry'
  }
]

export default async function Industry() {
  return (
    <>
      <main>
        <Header />
        <section className="py-10 max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industryServices.map(({ category, url, header, description }: ServiceCard, i) => (
              <ServiceCard
                key={i + 1}
                header={header}
                url={url}
                description={description}
                category={category}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
