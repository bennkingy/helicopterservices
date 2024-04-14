import Image from 'next/image';
import Carousel from "./components/Carousel";
import GetInTouch from "./components/GetInTouch";
import Hero from "./components/Hero";
import { MainServices } from "./components/MainServices";

export default async function Home() {

  return (
    <main className="">
      <Hero title="Exceeding exacting industry standards." height='h-[calc(100vh_-_68px)] sm:h-[calc(100vh_-_68px)]' />
      <div className="py-10 bg-brand-dark-blue">
        <div className="max-w-6xl container">
          <MainServices />
        </div>
      </div>
      <div className="py-10 max-w-6xl container mx-auto grid grid-cols-1 md:grid-cols-2 relative">
        <div className='pr-10 relative'>
          <Image
            src="/images/grandad-helicopter.png"
            alt="Helicopter Services"
            width={1000}
            height={1000}
            className='min-w-[100px] pr-0 sm:pr-10 md:pr-10 lg:pr-15 xl:pr-20'
          />
          <Image
            src="/images/grandad.png"
            alt="Helicopter Services"
            width={240}
            height={240}
            className='min-w-[100px] absolute bottom-20 right-0 md:right-14'
          />
        </div>
        <div>
          <h2 className="max-w-2xl text-3xl mb-4 mt-8 md:mt-0">Over 20 years helicopter
            operating experience.</h2>
          <p>We offer training from Private Pilot’s Licence to Commercial, Instruments, Instructor, and Examiner Ratings.  Our senior instructors/examiners in the UK provide type ratings on 17+ helicopter types, and advanced courses. . For gifts, transfers, charters, photography, load lifting, flight learning, helicopter purchase, AOC management, or medical info, we’re here.</p>
          <ul className='mt-5'>
            <li>Experienced pilots & instructors</li>
            <li>Professional & accommodating</li>
            <li>Excellent customer service</li>
            <li>Operating safely since 2000</li>
            <li>Exceeding exacting industry standards</li>
          </ul>
          <p className='mt-5'>
            Captain Leon Smith<br />Head Pilot / Chief Pilot<br />Helicopter Services
          </p>
        </div>
      </div>
      <div className="py-10 bg-brand-light-grey">
        <div className="max-w-6xl container">
          <Carousel />
        </div>
      </div>
      <GetInTouch />
    </main>
  );
}
