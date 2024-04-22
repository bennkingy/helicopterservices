import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface MainServices {
  icon: JSX.Element;
  title: string;
  description: string;
  url: string;
}

const features: MainServices[] = [
  {
    icon: <Image src='/images/helicopter-icon.svg' alt='' width={40} height={40} />,
    title: "Training",
    description:
      "You're in expert hands, from beginner to advanced.",
    url: '/training',
  },
  {
    icon: <Image src='/images/helicopter-icon.svg' alt='' width={40} height={40} />,
    title: "Flights",
    description:
      "Flight examiner ratingsFE(H), TRE(H), and more.",
    url: '/flights',
  },
  {
    icon: <Image src='/images/helicopter-icon.svg' alt='' width={40} height={40} />,
    title: "Industry",
    description:
      "Elevating industry to new heights. Photography  & filming.",
    url: '/industry',
  },
  {
    icon: <Image src='/images/helicopter-icon.svg' alt='' width={40} height={40} />,
    title: "Our company",
    description:
      "Please feel free to drop us a message, we'd love to hear from you.",
    url: '/about-us',
  },
];

export const MainServices = () => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description, url }: MainServices, i) => (
          <Link href={url} key={i}>
            <Card key={title} className="bg-white rounded-none border-0 border-b-4 border-brand-light-blue relative group duration-300 ease-in-out hover:bg-brand-light-blue"
            >
              <CardHeader>
                <CardTitle className="grid gap-4 font-bold text-lg sm:text-2xl duration-300 ease-in-out group-hover:text-white">
                  {icon}
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent className="-mt-3 sm:-mt-2 text-black text-md sm:text-lg duration-300 ease-in-out group-hover:text-white">{description}</CardContent>
              <div className="absolute bottom-0 right-0">
                <svg className="text-brand-light-blue h-6 w-6 duration-300 ease-in-out" viewBox="0 0 20 20" fill="currentColor">
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
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};