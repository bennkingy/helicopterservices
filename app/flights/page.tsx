import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import ContactCta from "../components/ContactCta";
import Header from "../components/Header";
import Heading from "../components/Heading";
import ServiceCard from "../components/ServiceCard";

export const metadata: Metadata = {
  title: "Flights - Helicopter Services",
  description: "Helicopter Services",
};

const flightServices: ServiceCard[] = [
  {
    header: 'Airport transfers.',
    url: '/airport-transfers',
    description: 'Your luxury airport transfer service.',
    category: 'Flights'
  },
  {
    header: 'Helicopter charter.',
    url: '/heli-charter',
    description: 'We have been transporting VIPs to special events for well over 20 years.',
    category: 'Flights'
  },
  {
    header: 'London sightseeing tour.',
    url: '/london-sightseeing-tour',
    description: 'The ultimate way to see London, one of the most famous cities in the world.',
    category: 'Flights'
  },
  {
    header: 'Special events.',
    url: '/special-events',
    description: 'Treat yourself to a wedding flight, a personalised sightseeing tour, or a day out',
    category: 'Flights'
  },
  {
    header: 'Local area tours.',
    url: '/local-area-tours',
    description: 'Your luxury airport transfer service.',
    category: 'Flights'
  },
  {
    header: 'Trail lessons.',
    url: '/airport-transfers',
    description: 'A quick and easy way to get to your destination.',
    category: 'Flights'
  }
]

export default async function Flights() {
  return (
    <>
      <main className="bg-brand-light-grey">
        <Header title="A leading uk helicopter flight service." />
        <section className="py-10 max-w-6xl mx-auto px-4 mt-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {flightServices.map(({ category, url, header, description }: ServiceCard, i) => (
              <ServiceCard
                key={i + 1}
                header={header}
                url={url}
                description={description}
                category={category}
              />
            ))}
          </div>
          <div className="mb-14 mt-20 grid grid-cols-1 sm:grid-cols-3">
            <div className="col-span-2 pr-0 sm:pr-20">
              <Heading title='Can’t find what your looking for?' titleSize="text-3xl" className="mb-6" />
              <p className="mb-4">We have over 20 years’ operating as one of the UKs most experienced helicopter charter, tours, photography, load lifting and consultancy companies.</p>
              <p className="mb-4">Whether you are looking for a wonderful gift, a time-efficient airport transfer, a private charter for your special occasion, help with aerial photograph, a load lifted economically we can help you.</p>
              <p className="mb-4">We adhere to the highest safety standards and many of our helicopters are able to fly in reduced visibility or at night. We offer both twin-engine or single-engine helicopters and can provide two pilots as may be required.</p>
              <p className="mb-4">Contact us to discuss your requirements and our Charter Manager for a competitive quote.</p>
              <p className="text-lg"><span className='font-bold'>Outside office hours? </span>Submit our form and out team will get back to you.</p>
              <Button size='lg' className="bg-brand-light-blue text-white mt-5 mx-auto">General enquiries</Button>
            </div>
            <div className="mt-20 sm:mt-0">
              <ContactCta />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
