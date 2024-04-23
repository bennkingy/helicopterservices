'use client'
import { Button } from "@/components/ui/button";

const GetinTouchSmall = ({className}: any) => {

  // TODO Try framer motion - https://www.framer.com/motion/scroll-animations/
  return (
    <div className={`bg-brand-medium-grey text-brand-dark-blue text-left p-5 ${className}`}>
      <div>
        <p><span className="font-bold">Outside office hours?</span> Submit our form and out team will get back to you.</p>
        <Button size='lg' className="bg-brand-light-blue text-white w-full mt-3">General enquiries</Button>
      </div>
    </div>
  )
}

export default GetinTouchSmall