import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="bg-brand-dark-blue dark:bg-black text-white pt-20 pb-20 sm:pb-28 sm:pt-24">
      <div className="mx-auto flex flex-wrap container justify-between flex-col sm:flex-row"><div>
        <Link href="/" className="font-mono text-lg font-bold start">
          <Image
            src="/images/logo.png"
            alt="Helicopter Services"
            width={100}
            height={34}
            className='min-w-[100px] mb-10 '
          />
        </Link></div>
        <div className="">
          <div className="text-sm uppercase font-bold mb-4 mt-5 sm:mt-0">Training</div>
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
          <div className="text-sm uppercase mb-5 mt-14 sm:mt-0 font-bold">Flight</div>
          <ul>
            <li>London sightseeing</li>
            <li>Special events</li>
            <li>Trail lesson</li>
          </ul>
          <div className="text-sm uppercase my-5 mt-14 font-bold">Industry</div>
          <ul>
            <li>Airport transfer</li>
            <li>Helicopter charter</li>
            <li>Photography and filming</li>
            <li>Load lifting</li>
          </ul>
        </div>
        <div>
          <div className="text-sm uppercase mb-5 mt-14 sm:mt-0 font-bold">Contact</div>
          <p>
            Helicopter Services<br />
            White Waltham Airfield<br />
            Maidenhead<br />
            Berkshire<br />
            SL6 3NJ
          </p>
          <div className="text-sm uppercase font-bold my-5 mt-14">Social</div>
          <ul>
            <li>Instagram</li>
            <li>Facebook</li>
          </ul>
          <div className="text-sm uppercase font-bold my-5 mt-14">Legals</div>
          <ul>
            <li>Terms and conditions</li>
            <li>Policy</li>
            <li>Cookies</li>
          </ul>
        </div>
      </div>
    </div>
  )
};