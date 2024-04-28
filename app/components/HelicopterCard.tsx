import { Card, CardContent } from "@/components/ui/card";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";

interface HelicopterCard {
  helicopter: any;
}

const HelicopterCard = async ({ helicopter }: HelicopterCard) => {

  const imageUrl = helicopter?.mainImage && urlFor(helicopter?.mainImage).width(240).height(140).url()

  const src = imageUrl

  const buffer = await fetch(src).then(async (res) => {
    return Buffer.from(await res.arrayBuffer())
  })

  const { base64 } = await getPlaiceholder(buffer)

  return (
    <a href={helicopter?.url}>
      <Card className="mt-5 border-0">
        <CardContent className="p-0 flex justify-between relative bg-white shadow-brand rounded-none border-0 border-b-4 border-brand-light-blue">
          <div className="flex flex-col flex-wrap justify-center pl-3 sm:pl-4">
            <p className="text-sm font-workSans text-brand-dark-grey">Type</p>
            <h3 className="text-xl font-bold font-workSans">{helicopter?.model}</h3>
          </div>
          <div className="h-[90px] w-[120px] relative">
            {helicopter?.mainImage &&
              <Image
                fill
                src={src || ''}
                placeholder="blur"
                blurDataURL={base64}
                alt=""
                className="object-cover  rounded-none transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            }
          </div>
          {/* <PortableText value={helicopter?.description} /> */}
          <div className="absolute bottom-0 right-0 z-[1]">
            <svg className="text-brand-light-blue h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <polygon points="20 0 20 20 0 20" />
            </svg>
            <Image
              src="/images/caret-right.svg"
              alt="Helicopter Services"
              width={6}
              height={6}
              className='absolute bottom-0 right-1'
            />
          </div>
        </CardContent>
      </Card>
    </a>
  )
}

export default HelicopterCard