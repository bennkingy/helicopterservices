import { carouselItem } from '@/lib/interface';
import Image from 'next/image';
import Carousel from "./components/Carousel";
import Enquire from './components/Enquire';
import FramerAnimationSlide from './components/FramerAnimationSlideIn';
import Heading from './components/Heading';
import Hero from "./components/Hero";
import { MainServices } from "./components/MainServices";

export default async function Home() {

  const items: carouselItem[] = [
    { img: '/images/circle-heli.png', title: "Airport Transfer", description: "We offer training from Private Pilots license to Commercial, instruments, instructor and examiner ratings.", link: "/#" },
    { img: '/images/circle-heli.png', title: "City Tours", description: "Explore the city's top attractions with our experienced guides.", link: "/tours" },
    { img: '/images/circle-heli.png', title: "Hotel Services", description: "Enjoy our world-class accommodations and hospitality.", link: "/hotels" },
    { img: '/images/circle-heli.png', title: "Dining Experiences", description: "Taste the best local and international cuisines.", link: "/dining" },
    { img: '/images/circle-heli.png', title: "Adventure Sports", description: "Get your adrenaline pumping with our adventure sports packages.", link: "/adventures" },
  ];

  const reviews: any[] = [
    {
      img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/15/61/08/photo1jpg.jpg',
      name: "Alex", service: "", description: "Brilliant brilliant brilliant Leon who owns the company was so helpful and such a gent,not rushed or money grabbing at all, If you ever get the chance to try this I won’t use any other company !!! I booked a flight over London amazing !!!!"
    },
    {
      img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/50/21/8d/a3303xqpaulh.jpg',
      name: "Paul H", service: "", description: "It's never going to be cheap in a helicopter and your own pilot but we hit it at a quiet time and got a winner. Around the countryside then followed the Thames to the centre of London. West Minster, St Paul's, the shard and more. Best value for money anywhere on this trip. We loved it. We are so lucky."
    },
    {
      img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/f6/f2/7a/default-avatar-2020-25.jpg',
      name: "John Smith", service: "", description: "Just had the most amazing helicopter experience with my elderly father and my husband. Our pilot Tom was great really knowledgable of the area a really nice guy and do willing to please. Amazing experience highly recommend well worth the money !!!!"
    },
    {
      img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/d7/e4/3d/oscarwildetime.jpg',
      name: "Oscar Wildetime", service: "", description: "From the moment that Natalie explained the experience to me, took the booking and sent the confirmation etc within the hour I knew we were dealing with people who understood service. We had opted for my wife's birthday and 1 hour sightseeing helicopter trip over Central London. Arrived promptly and Tom, our pilot, was ready to start the trip. Firstly a safety briefing and then into the Robinson R44 chopper for a trip that was both stunning and informative. Tom really knew his stuff and we thoroughly enjoyed the whole experience and I have to say it was fantastic value for money. A great Birthday present and if you want everything for a great day out then choose Helicopter Services... you will not regret it. Thanks to all from both Tina and I."
    },
    {
      img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/f6/ed/00/default-avatar-2020-4.jpg',
      name: "Kanwar Tavy", service: "", description: "A nice add-on to a trip to Windsor castle. Closeby - great helicopter rides especially on a clear sunny day - great fun flying low in a small copter and seeing the area."
    },
    {
      img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-f/01/2e/70/64/avatar042.jpg',
      name: "Mahendra S", service: "", description: "To find sub a busy airfield at the back of high Wycombe is quite surprising. I booked for a 45 min tour of the chilterns. Never been on a helicopter but it was smooth and comfortable. Our pilot was very nice and showed us the sites. On a beautiful sunny day, we could see the skyscrapers of London. All in all, highly enjoyable.",
    },
  ];

  return (
    <main className="">
      <Hero title="Exceeding exacting industry standards." height='h-[calc(100vh_-_60px)] sm:h-[calc(100vh_-_68px)]' />
      <div className="py-20 bg-brand-dark-blue">
        <div className="container">
          <MainServices />
        </div>
      </div>
      <div className="py-20 container mx-auto grid grid-cols-1 md:grid-cols-2 relative">
        <div className='pr-0 sm:pr-10 relative'>
          <FramerAnimationSlide
            items={[
              <Image
                src="/images/grandad-helicopter.png"
                alt="Helicopter Services"
                width={1000}
                key={1}
                height={1000}
                className='min-w-[100px] pr-0 sm:pr-10 md:pr-10 lg:pr-20 xl:pr-20'
              />,
              <Image
                src="/images/grandad.png"
                alt="Helicopter Services"
                width={240}
                height={240}
                key={2}
                className='absolute -bottom-20 sm:bottom-20 right-0 md:right-14 border-8 border-white drop-shadow-sm shadow-xl' />
            ]}
          />
        </div>
        <div>
          <Heading title="Over 20 years helicopter operating experience." tag='About us' className='mb-8 mt-36 sm:mt-0' />
          <p className='font-openSans'>We offer training from Private Pilot’s Licence to Commercial, Instruments, Instructor, and Examiner Ratings.  Our senior instructors/examiners in the UK provide type ratings on 17+ helicopter types, and advanced courses. For gifts, transfers, charters, photography, load lifting, flight learning, helicopter purchase, AOC management, or medical info, we’re here.</p>
          <ul className="max-w-md space-y-1 mt-7 list-inside font-openSans">
            <li className="flex items-center">
              <svg className="w-3.5 h-3.5 me-2 text-brand-light-blue flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>Experienced pilots & instructors
            </li>
            <li className="flex items-center"><svg className="w-3.5 h-3.5 me-2 text-brand-light-blue flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>Professional & accommodating</li>
            <li className="flex items-center"><svg className="w-3.5 h-3.5 me-2 text-brand-light-blue flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>Excellent customer service</li>
            <li className="flex items-center"><svg className="w-3.5 h-3.5 me-2 text-brand-light-blue flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>Operating safely since 2000</li>
            <li className="flex items-center"><svg className="w-3.5 h-3.5 me-2 text-brand-light-blue flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>Exceeding exacting industry standards</li>
          </ul>
          <Image
            src="/images/signature.svg"
            alt="Helicopter Services"
            width={139}
            height={43}
            className='min-w-[100px] mt-7'
          />
          <p className='mt-3 font-bold font-openSans'>Captain Leon Smith</p>
          <p className='mt-0 text-brand-light-blue font-openSans'>Head Pilot / Chief Pilot</p>
          <p className='mt-0 font-openSans'>Helicopter Services</p>
        </div>
      </div>
      <div className="py-20 bg-brand-dark-blue">
        <div className="container relative mx-auto grid grid-cols-1 md:grid-cols-2">
          <div>
            <Heading title="From beginner to advanced, you're in expert hands." tag='training' className='mb-8' titleSize='text-white' />
            <p className='font-openSans text-white'>{`Our highly experienced instructors and examiners are among the UK's most senior. We provide type ratings for over 17 helicopter types, along with Flight Instructor Refresher and Instrument Rating Examiner courses.`}</p>
            <p className='font-openSans mt-4 text-white'>Additionally, we offer a helicopter flight simulator for safe instrument flying skill development and an advanced program to enhance PPL skills.</p>
            <div className="flex space-x-5 mt-7">
              <Image
                src="/images/easa.svg"
                alt="Helicopter Services"
                width={109}
                height={36}
              />
              <Image
                src="/images/caa.svg"
                alt="Helicopter Services"
                width={50}
                height={38}
              />
            </div>
            <Enquire className='mt-7' textStyle='text-white' />
          </div>
          <div className='pr-0 sm:pl-10 relative mt-20 sm:mt-0'>
            <FramerAnimationSlide
              items={[
                <Image
                  src="/images/flying.png"
                  alt="Helicopter Services"
                  width={1000}
                  key={1}
                  height={1000}
                  className='min-w-[100px] pr-0 sm:pl-10 md:pl-10 lg:pl-20 xl:pl-20'
                />
              ]}
            />
          </div>
        </div>
      </div>
      <div className="pb-20 pt-20 bg-brand-light-grey">
        <div className="container">
          <Heading title="For gifts, swift transfers and private charters." tag='Flights' center className='mb-10' />
          <Carousel slides={items} />
        </div>
      </div>
      <div className="container pb-20 pt-20 bg-white grid grid-cols-1 md:grid-cols-2">
        <div className=" mx-auto relative">
          <div className='pr-0 sm:pr-10 relative'>
            <FramerAnimationSlide
              items={[
                <Image
                  src="/images/loadlifting.png"
                  alt="Helicopter Services"
                  width={1000}
                  key={1}
                  height={1000}
                  className='min-w-[100px] pr-0 sm:pr-10 md:pr-10 lg:pr-20 xl:pr-20'
                />,
                <Image
                  src="/images/planes.jpg"
                  alt="Helicopter Services"
                  width={240}
                  height={240}
                  key={2}
                  className='absolute -bottom-20 sm:bottom-20 right-0 md:right-14 border-8 border-white drop-shadow-sm shadow-xl' />
              ]}
            />
          </div>
        </div>
        <div>
          <Heading title="Elevating industry to new heights." tag='Industry' className='mb-8 mt-36 sm:mt-0' />
          <p className='font-openSans'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
          <ul className="max-w-md space-y-1 mt-7 list-inside font-openSans">
            <li className="flex items-center">
              <svg className="w-3.5 h-3.5 me-2 text-brand-light-blue flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>Lorem ipsum dolor
            </li>
            <li className="flex items-center"><svg className="w-3.5 h-3.5 me-2 text-brand-light-blue flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>Amet, consectetur</li>
            <li className="flex items-center"><svg className="w-3.5 h-3.5 me-2 text-brand-light-blue flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>Adipiscing elit, sed do</li>
            <li className="flex items-center"><svg className="w-3.5 h-3.5 me-2 text-brand-light-blue flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>Mod tempor incididunt</li>
            <li className="flex items-center"><svg className="w-3.5 h-3.5 me-2 text-brand-light-blue flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>Labore et dolore magna aliqua</li>
          </ul>
          <Enquire className='mt-7' />
        </div>
      </div>
      <div className='bg-brand-light-grey mt-0'>
        <div className="container pt-12 pb-20">
          <Heading title="Client feedback." center tag='Testimonials' className='mb-16' />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {reviews.map((review, index) => (
              <div className='text-white drop-shadow-brand' key={index}>
                <div style={{ clipPath: 'polygon(0 0,calc(100% - 35px) 0,100% 35px,100% 100%,0 100%)' }} className='p-0'>
                  <div className="max-w-sm mx-auto border-l-4 border-brand-light-blue bg-white p-4">
                    <div className="ml-4 brand-shadow flex">
                      <div className='w-[80px] h-[80px] overflow-hidden mr-5' style={{ clipPath: 'polygon(0 0,calc(100% - 20px) 0,100% 20px, 100% 100%,0 100%)' }}>
                        <Image
                          src={review?.img}
                          width={80}
                          height={80}
                          alt="Title Image"
                          priority
                        />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-600">{review.name}</div>
                        {/* <div className="text-sm text-gray-600">{review.service}</div> */}
                      </div>
                    </div>
                    <p className='text-brand-dark-grey p-4'>“{review?.description}”</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main >
  );
}
