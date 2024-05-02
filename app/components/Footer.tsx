import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import GetInTouch from './GetInTouch';
import Weather from './Weather';
import logo from "/public/images/LogoLightV2New.svg";

export default function Footer() {
  return (
    <>
      <GetInTouch />
      <div className="bg-brand-dark-blue dark:bg-black text-white pt-20 pb-20 border-t-4 border-brand-light-blue">
        <div className="mx-auto flex flex-wrap container justify-between flex-col sm:flex-row"><div>
          <Link href="/" className="font-mono text-lg font-bold start">
            <Image
              src={logo}
              alt="Helicopter Services"
              width={153}
              height={43}
              className='min-w-[100px] mb-10 '
            />
          </Link>
          <div className="text-sm mb-3 mt-6 sm:mt-0 font-bold font-openSans">Contact</div>
          <p>
            Helicopter Services<br />
            White Waltham Airfield<br />
            Maidenhead<br />
            Berkshire<br />
            <a href='' className='text-brand-light-blue'>SL6 3NJ</a>
          </p>
          <div className="text-sm font-bold my-5 mb-3 mt-6 font-openSans">Social</div>
          <ul>
            <li className='flex text-brand-light-blue font-bold'><Image src='/images/facebook.png' width={25} height={25} alt='' className='mt-1 mr-1' />Instagram</li>
            <li className='flex text-brand-light-blue font-bold'><Image src='/images/instagram.png' width={20} height={20} alt='' className='mt-1 mr-[7px] ml-[2px]' />Facebook</li>
          </ul>
          <div className="text-sm font-bold mb-3 mt-7 font-openSans">Legals</div>
          <ul>
            <li>Terms and conditions</li>
            <li>Policy</li>
            <li>Cookies</li>
          </ul>
          {/* <div className='hidden sm:block'>
            <Suspense fallback={<p className='bg-red'>Loading weather data...</p>}>
              <Weather city="London" />
            </Suspense>
            <div className='mt-5'>
              <Suspense fallback={<p className='bg-red'>Loading weather data...</p>}>
                <Weather city="Manchester" airport='West London Aero Club' />
              </Suspense>
            </div>
          </div> */}
        </div>
          <div className="">
            <div className="text-sm font-bold mb-3 mt-5 sm:mt-0 font-openSans">Training</div>
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
            <div className="text-sm mb-3 mt-6 sm:mt-0 font-bold font-openSans">Flight</div>
            <ul>
              <li>London sightseeing</li>
              <li>Special events</li>
              <li>Trail lesson</li>
            </ul>
            <div className="text-sm mb-3 mt-6 font-bold font-openSans">Industry</div>
            <ul>
              <li>Airport transfer</li>
              <li>Helicopter charter</li>
              <li>Photography and filming</li>
              <li>Load lifting</li>
            </ul>
          </div>
          <div className='mt-8 sm:mt-0'>
            <Suspense fallback={<p className='bg-red'>Loading weather data...</p>}>
              <Weather />
            </Suspense>
            <div className='mt-9 sm:mt-6'>
              <Suspense fallback={<p className='bg-red'>Loading weather data...</p>}>
                <Weather lat={51.490280} lon={-0.772940} airport='West London Aero Club' />
              </Suspense>
            </div>
          </div>
        </div >
      </div >
    </>
  )
};