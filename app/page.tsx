import Carousel from "./components/Carousel";
import Hero from "./components/Hero";
import { MainServices } from "./components/MainServices";
export const revalidate = 30; // revalidate at most 30 seconds

export default async function Home() {

  return (
    <main className="">
      <Hero title="Exceeding exacting industry standards." height='h-[calc(100vh_-_68px)] sm:h-[calc(100vh_-_68px)]' />
      <div className="py-10 bg-brand-dark-blue">
        <div className="max-w-6xl container">
          <MainServices />
        </div>
      </div>
      <div className="py-10 max-w-6xl container mx-auto grid grid-cols-1 sm:grid-cols-2">
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
      <div className="py-10 bg-brand-light-grey">
        <div className="max-w-6xl container">
          <Carousel />
        </div>
      </div>
    </main>
  );
}
