import { Button } from '@/components/ui/button';

interface props {
  textStyle?: string;
  className?: string;
}

const Enquire = ({ className, textStyle }: props) => {
  return (
    <>
      <div className={`flex items-center ${className}`}>
        <Button className='uppercase bg-brand-light-blue text-white min-w-[150px]'>Enquire Today</Button>
        <div className={`ml-4 font-openSans ${textStyle}`}>
          <p className='-mb-1'>Call General enquiries:</p>
          <a href="tel:+441494513166" className='text-2xl font-bold mt-0'>+44 1494 513 166</a>
        </div>
      </div>
    </>
  )
}

export default Enquire