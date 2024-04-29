import { Icons } from '@/components/ui/icons';
import Image from 'next/image';
import Heading from "../components/Heading";

const reviews: any[] = [
  {
    img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/15/61/08/photo1jpg.jpg',
    name: "Alex", service: "", description: "Brilliant brilliant brilliant Leon who owns the company was so helpful and such a gent,not rushed or money grabbing at all, If you ever get the chance to try this I won’t use any other company !!! I booked a flight over London amazing !!!!"
  },
  {
    img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/50/21/8d/a3303xqpaulh.jpg',
    name: "Paul H", service: "", description: "We hit it at a quiet time and got a winner around the countryside then followed the Thames to the centre of London. West Minster, St Paul's, the shard and more. Best value for money anywhere on this trip. We loved it. We are so lucky."
  },
  {
    img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/f6/f2/7a/default-avatar-2020-25.jpg',
    name: "John Smith", service: "", description: "Just had the most amazing helicopter experience with my elderly father and my husband. Our pilot Tom was great really knowledgable of the area a really nice guy and do willing to please. Amazing experience highly recommend well worth the money !!!!"
  },
  {
    img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/d7/e4/3d/oscarwildetime.jpg',
    name: "Oscar Wildetime", service: "", description: "From the moment that Natalie explained the experience to me, took the booking and sent the confirmation etc within the hour I knew we were dealing with people who understood service. We had opted for my wife's birthday and 1 hour sightseeing helicopter trip over Central London. Arrived promptly and Tom, our pilot, was ready to start the trip. Firstly a safety briefing and then into the Robinson R44 chopper for a trip that was both stunning and informative. Tom really knew his stuff and we thoroughly enjoyed the whole experience and I have to say it was fantastic value for money. A great Birthday present and if you want everything for a great day out then choose Helicopter Services... you will not regret it. Thanks to all from both Tina and I."
  },
  {
    img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/f6/ed/00/default-avatar-2020-4.jpg',
    name: "Kanwar Tavy", service: "", description: "A nice add-on to a trip to Windsor castle. Closeby - great helicopter rides especially on a clear sunny day - great fun flying low in a small copter and seeing the area."
  },
  {
    img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-f/01/2e/70/64/avatar042.jpg',
    name: "Mahendra S", service: "", description: "To find sub a busy airfield at the back of high Wycombe is quite surprising. I booked for a 45 min tour of the chilterns. Never been on a helicopter but it was smooth and comfortable. Our pilot was very nice and showed us the sites. On a beautiful sunny day, we could see the skyscrapers of London. All in all, highly enjoyable.",
  },
];

const Reviews = () => {
  return (
    <div className='bg-brand-light-grey mt-0'>
      <div className="container pt-12 pb-20">
        <Heading title="Client feedback." center tag='Testimonials' iconColor='light-blue' className='mb-16' />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-10">
          {reviews.slice(0, 6).map((review, index) => (
            <div className='text-white drop-shadow-brand' key={index}>
              <div style={{ clipPath: 'polygon(0 0,calc(100% - 35px) 0,100% 35px,100% 100%,0 100%)' }} className='p-0'>
                <div className="max-w-sm mx-auto border-l-4 border-brand-light-blue bg-white p-4">
                  <div className="ml-4 brand-shadow flex pt-2">
                    <div className='w-[80px] h-[80px] overflow-hidden mr-5' style={{ clipPath: 'polygon(0 0,calc(100% - 20px) 0,100% 20px, 100% 100%,0 100%)' }}>
                      <Image
                        src={review?.img}
                        width={80}
                        height={80}
                        alt="Title Image"
                        priority
                      />
                    </div>
                    <div className='flex-1 pr-6 justify-center flex flex-col'>
                      <Image
                        src="/images/quotes.svg"
                        alt="Helicopter Services"
                        width={19}
                        height={10}
                        className='ml-auto'
                      />
                      <div className="text-md font-bold text-brand-dark-grey ">{review.name}</div>
                      <div className="flex">
                        <Icons.star fill="#1FB6DE" strokeWidth={0} className='-ml-1' />
                        <Icons.star fill="#1FB6DE" strokeWidth={0} />
                        <Icons.star fill="#1FB6DE" strokeWidth={0} />
                        <Icons.star fill="#1FB6DE" strokeWidth={0} />
                        <Icons.star fill="#1FB6DE" strokeWidth={0} />
                      </div>
                    </div>
                  </div>
                  <p className='text-brand-dark-grey p-4 line-clamp-4 pb-0 mb-1'><span className='text-lg'>“</span>{review?.description}<span className='text-lg'>”</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Reviews