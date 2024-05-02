import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface props {
  textStyle?: string;
  className?: string;
}

const Enquire = ({ className, textStyle }: props) => {
  return (
    <div className={`flex sm:items-center flex-col sm:flex-row ${className}`}>
      <Link href='/enquire'>
        <Button className='uppercase bg-brand-light-blue text-white w-[150px] py-6'>Enquire Today</Button>
      </Link>
      <div className={`mt-5 sm:mt-0 sm:ml-7 font-openSans ${textStyle}`}>
        <p className='mb-[2px] font-thin text-sm'>Call General enquiries:</p>
        <a href="tel:+441494513166" className='text-xl font-bold mt-0'>+44 1494 513 166</a>
      </div>
    </div >
  )
}

export default Enquire