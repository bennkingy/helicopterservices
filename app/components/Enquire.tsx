import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'

const Enquire = () => {
  return (
    <>
      <Icons.PlaneTakeoff />
      <div className='flex items-center'>
        <Button className='uppercase'>Enquire Today</Button>
        <div className='ml-4'>
          <p>Call General enquiries:</p>
          <a href="tel:+441494513166" className='text-2xl font-bold'>+44 1494 513 166</a>
        </div>
      </div>
    </>
  )
}

export default Enquire