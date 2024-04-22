import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    heading: 'Private pilot license.',
    url: '/training/private-pilot-licence',
    description: 'A quick and easy way to get to your destination.',
    category: 'Training',
    subCategory: 'Licenses',
  },
  {
    heading: 'Commerical pilot license.',
    url: '/training/commercial-pilot-licence',
    description: 'A quick and easy way to get to your destination.',
    category: 'Training',
    subCategory: 'Licenses',
  },
  {
    heading: 'Flight examiner rating.',
    url: '/training/flight-examiner-ratings',
    description: 'A quick and easy way to get to your destination.',
    subCategory: 'Flight Ratings',
    category: 'Training',
  },
  {
    heading: 'Flight instructor rating.',
    url: '/training/flight-instructor-ratings',
    description: 'A quick and easy way to get to your destination.',
    subCategory: 'Flight Ratings',
    category: 'Training',
  },
  {
    heading: 'Instrument rating.',
    url: '/training/instrument-ratings',
    description: 'A quick and easy way to get to your destination.',
    subCategory: 'Flight Ratings',
    category: 'Training',
  },
  {
    heading: 'Type rating.',
    url: '/training/type-ratings',
    description: 'A quick and easy way to get to your destination.',
    subCategory: 'Flight Ratings',
    category: 'Training',
  },
  {
    heading: 'Night rating.',
    url: '/training/night-rating',
    description: 'A quick and easy way to get to your destination.',
    subCategory: 'Flight Ratings',
    category: 'Training',
  },
  {
    heading: 'Flight simulator.',
    url: '/training/simulator',
    description: 'A quick and easy way to get to your destination.',
    subCategory: 'Simulators',
    category: 'Training',
  },
  {
    heading: 'Virtual reality simulator.',
    url: '/training/virtual-reality-simulator',
    description: 'A quick and easy way to get to your destination.',
    subCategory: 'Simulators',
    category: 'Training',
  },
  {
    heading: 'PBN.',
    url: '/training/pbn',
    description: 'A quick and easy way to get to your destination.',
    subCategory: 'Other training services',
    category: 'Training',
  }
]

export default async function Training() {
  return (
    <>
      <main className="bg-brand-light-grey">
        <Header title="From beginner to advanced, you're in expert hands." tag='Training' />
        <section className="py-10 max-w-6xl mx-auto px-4 mt-14">
          <Tabs defaultValue="account">
            <TabsList className="mx-auto mb-10 w-full">
              <TabsTrigger value="account">Training services</TabsTrigger>
              <TabsTrigger value="password">Training route map</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Heading title="Licenses" titleSize="text-3xl" className="mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {flightServices.filter(service => service?.subCategory == 'Licenses').map(({ category, url, heading, description }: ServiceCard, i) => (
                  <ServiceCard
                    key={i + 1}
                    heading={heading}
                    url={url}
                    description={description}
                    category={category}
                  />
                ))}
              </div>
              <Heading title="Flight ratings" titleSize="text-3xl" className="mb-6 mt-12" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {flightServices.filter(service => service?.subCategory == 'Flight Ratings').map(({ category, url, heading, description }: ServiceCard, i) => (
                  <ServiceCard
                    key={i + 1}
                    heading={heading}
                    url={url}
                    description={description}
                    category={category}
                  />
                ))}
              </div>
              <Heading title="Simulators" titleSize="text-3xl" className="mb-6 mt-12" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {flightServices.filter(service => service?.subCategory == 'Simulators').map(({ category, url, heading, description }: ServiceCard, i) => (
                  <ServiceCard
                    key={i + 1}
                    heading={heading}
                    url={url}
                    description={description}
                    category={category}
                  />
                ))}
              </div>
              <Heading title="Other training services" titleSize="text-3xl" className="mb-6 mt-12" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {flightServices.filter(service => service?.subCategory == 'Other training services').map(({ category, url, heading, description }: ServiceCard, i) => (
                  <ServiceCard
                    key={i + 1}
                    heading={heading}
                    url={url}
                    description={description}
                    category={category}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="password">Training route map coming soon.</TabsContent>
          </Tabs>
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
