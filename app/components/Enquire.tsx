import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface props {
  textStyle?: string;
  className?: string;
}

const Enquire = ({ className, textStyle }: props) => {
  return (
    <Link href='/enquire'>
      <div className={`flex sm:items-center flex-col sm:flex-row ${className}`}>
        <Button className='uppercase bg-brand-light-blue text-white w-[150px]'>Enquire Today</Button>
        <div className={`mt-5 sm:mt-0 sm:ml-4 font-openSans ${textStyle}`}>
          <p className='-mb-1'>Call General enquiries:</p>
          <a href="tel:+441494513166" className='text-2xl font-bold mt-0'>+44 1494 513 166</a>
        </div>
      </div>
    </Link>
  )
}

export default Enquire