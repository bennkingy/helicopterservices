import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import GetInTouch from './GetInTouch';
import Weather from './Weather';

export default function Footer() {
  return (
    <>
      <GetInTouch />
      <div className="bg-brand-dark-blue dark:bg-black text-white pt-20 pb-20 border-t-4 border-brand-light-blue">
        <div className="mx-auto flex flex-wrap container justify-between flex-col sm:flex-row"><div>
          <Link href="/" className="font-mono text-lg font-bold start">
            <Image
              src="/images/logo.png"
              alt="Helicopter Services"
              width={100}
              height={34}
              className='min-w-[100px] mb-10 '
            />
          </Link>
          <div className='hidden sm:block'>
            <Suspense fallback={<p className='bg-red'>Loading weather data...</p>}>
              <Weather city="London" />
            </Suspense>
          </div>
        </div>
          <div className="">
            <div className="text-sm font-bold mb-3 mt-5 sm:mt-0">Training</div>
            <ul>
              <li>Private pilot license</li>
              <li>Commercial pilot license</li>
              <li>Flight examiner rating</li>
              <li>Type rating</li>
              <li>Instrument rating</li>
              <li>Flight instructor rating</li>
              <li>Night Rating</li>
              <li>Performance based navigation</li>
              <li>Virtual reality simulator</li>
              <li>Simulator</li>
              <li>ELCAS</li>
              <li>FAA</li>
              <li>Refresher seminars</li>
              <li>Advanced flying programme</li>
            </ul>
          </div>
          <div className="">
            <div className="text-sm mb-3 mt-6 sm:mt-0 font-bold">Flight</div>
            <ul>
              <li>London sightseeing</li>
              <li>Special events</li>
              <li>Trail lesson</li>
            </ul>
            <div className="text-sm mb-3 mt-6 font-bold">Industry</div>
            <ul>
              <li>Airport transfer</li>
              <li>Helicopter charter</li>
              <li>Photography and filming</li>
              <li>Load lifting</li>
            </ul>
          </div>
          <div>
            <div className="text-sm mb-3 mt-6 sm:mt-0 font-bold">Contact</div>
            <p>
              Helicopter Services<br />
              White Waltham Airfield<br />
              Maidenhead<br />
              Berkshire<br />
              SL6 3NJ
            </p>
            <div className="text-sm font-bold my-5 mb-3 mt-6">Social</div>
            <ul>
              <li>Instagram</li>
              <li>Facebook</li>
            </ul>
            <div className="text-sm font-bold mb-3 mt-6">Legals</div>
            <ul>
              <li>Terms and conditions</li>
              <li>Policy</li>
              <li>Cookies</li>
            </ul>
          </div>
          <div className='block sm:hidden mt-6 sm:mt-0'>
            <Suspense fallback={<p className='bg-red'>Loading weather data...</p>}>
              <Weather city="London" />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
};