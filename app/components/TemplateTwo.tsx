import ContactCta from "@/app/components/ContactCta";
import GetinTouchSmall from "@/app/components/GetinTouchSmall";
import Map from '@/app/components/Map';
import { PortableText } from "@portabletext/react";

type props = {
  data: any;
  children?: any;
}

const TemplateTwo = ({ data, children }: props) => {
  return (
    <>
      <main className="container mx-auto px-4 grid py-16 grid-cols-1 md:grid-cols-3 overflow-x-hidden">
        <div className="pr-0 sm:pr-20 mb-10 sm:mb-0 col-span-2">
          <div className="prose prose-a:text-brand-light-blue font-openSans prose-h2:font-workSans prose-h2:text-4xl prose-strong:font-bold marker:text-brand-light-blue max-w-full">
            <PortableText value={data?.body || ''} />
          </div>
          {children}
        </div>
        <div>
          <ContactCta />
          <GetinTouchSmall className='mt-3' />
          <Map className='h-[400px] mt-3' />
        </div>
      </main >
    </>
  )
}

export default TemplateTwo