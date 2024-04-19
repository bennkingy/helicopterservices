'use client'
import { Button } from "@/components/ui/button";

const GetinTouchSmall = () => {

  // TODO Try framer motion - https://www.framer.com/motion/scroll-animations/
  return (
    <div className={`bg-brand-medium-grey text-brand-dark-blue text-center p-5 border-t-4 border-white`}>
      <div>
        <p><span className="font-bold">Outside office hours?</span> Submit our form and out team will get back to you.</p>
        <Button className='bg-brand-dark-blue text-white py-2 px-4 rounded-lg mt-2' size='lg'>Enquire Form</Button>
      </div>
    </div>
  )
}

export default GetinTouchSmall