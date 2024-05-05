import ContactCta from "@/app/components/ContactCta";
import GetinTouchSmall from "@/app/components/GetinTouchSmall";
import Header from "@/app/components/Header";
import Map from '@/app/components/Map';
import { urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Gallery from "./Gallery";

type props = {
  data: any;
  children?: any;
  showHanger?: boolean;
}

const Template = ({ data, children, showHanger = false }: props) => {

  return (
    <>
      {!showHanger ?
        <>
          <Header title={data?.title} image={data.mainImage} />
          <main className="container mx-auto px-4 grid py-16 grid-cols-1 md:grid-cols-3 overflow-x-hidden">
            <div className="pr-0 sm:pr-20 mb-10 sm:mb-0 col-span-2">
              <div className="prose prose-a:text-brand-light-blue font-openSans prose-h2:font-workSans prose-h2:text-4xl prose-strong:font-bold marker:text-brand-light-blue max-w-full">
                <PortableText value={data?.body || ''} />
              </div>
              {children}
              <Gallery galleryType={"gallery"} className="mt-10">
                {data?.gallery?.images?.map((item: any, index: number) => {
                  const image = urlFor(item).url();
                  if (!image) return null;

                  return (
                    <div key={index}>
                      <a
                        data-lg-size="542-305"
                        data-pinterest-text="Pin it"
                        data-tweet-text="lightGallery slide 1"
                        className="gallery__item"
                        data-src={image}
                        data-sub-html="<h4>Photo by - <a href='test' >Test </a></h4><p> Test</p>"
                      >
                        <img
                          className="img-responsive cursor-pointer"
                          style={{ clipPath: 'polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)' }}
                          src={image} />
                      </a>
                    </div>
                  )
                })}
              </Gallery>
            </div>
            <div>
              <ContactCta />
              <GetinTouchSmall className='mt-10 sm:mt-3' />
              <Map className='mt-10 sm:mt-3' />
            </div>
          </main>
        </>
        : null}
    </>
  )
}

export default Template