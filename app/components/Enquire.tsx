import { Button } from '@/components/ui/button'

const Enquire = ({ className }: any) => {
  return (
    <>
      <div className={`flex items-center ${className}`}>
        <Button className='uppercase bg-brand-light-blue text-white'>Enquire Today</Button>
        <div className='ml-4'>
          <p>Call General enquiries:</p>
          <a href="tel:+441494513166" className='text-2xl font-bold'>+44 1494 513 166</a>
        </div>
      </div>
    </>
  )
}

export default Enquire