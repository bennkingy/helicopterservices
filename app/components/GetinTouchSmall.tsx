'use client'
import { Button } from '@/components/ui/button';
import { useIsVisible } from '@/hooks/use-is-visible';
import { useRef } from 'react';

const GetinTouchSmall = () => {

  // TODO Pass ref down, or try framer motion - https://www.framer.com/motion/scroll-animations/
  const ref = useRef();
  const isVisible = useIsVisible(ref);

  return (
    <div ref={ref} className={`bg-brand-medium-grey mt-10 text-brand-dark-blue text-center p-5 border-t-4 border-white animate-in ${isVisible ? "opacity-100" : "opacity-0"}`}>
      <div>
        <p><span className="font-bold">Outside office hours?</span> Submit our form and out team will get back to you.</p>
        <Button className='bg-brand-dark-blue text-white py-2 px-4 rounded-lg mt-2'>Enquire Form</Button>
      </div>
    </div>
  )
}

export default GetinTouchSmall