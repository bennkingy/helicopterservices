import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import FramerAnimation from "./FramerAnimation";

interface MainServices {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: MainServices[] = [
  {
    icon: <Image src='/images/helicopter-icon.svg' alt='' width={40} height={40} />,
    title: "Training",
    description:
      "You're in expert hands, from beginner to advanced.",
  },
  {
    icon: <Image src='/images/helicopter-icon.svg' alt='' width={40} height={40} />,
    title: "Flights",
    description:
      "Flight examiner ratingsFE(H), TRE(H), and more.",
  },
  {
    icon: <Image src='/images/helicopter-icon.svg' alt='' width={40} height={40} />,
    title: "Industry",
    description:
      "Elevating industry to new heights. Photography  & filming.",
  },
  {
    icon: <Image src='/images/helicopter-icon.svg' alt='' width={40} height={40} />,
    title: "Our company",
    description:
      "Please feel free to drop us a message, we'd love to hear from you.",
  },
];

export const MainServices = () => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: MainServices, i) => (
          <FramerAnimation delay={0.25 + (i / 10)} key={title}>
            <Card
              className="bg-white rounded-none border-0 border-b-4 border-brand-light-blue relative"
            >
              <CardHeader>
                <CardTitle className="grid gap-4 font-bold text-lg sm:text-2xl">
                  {icon}
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent className="-mt-3 sm:-mt-2 text-black text-md sm:text-lg">{description}</CardContent>
              <div className="absolute bottom-0 right-0">
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
            </Card>
          </FramerAnimation>
        ))}
      </div>
    </section>
  );
};