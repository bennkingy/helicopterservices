import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";

interface MainServices {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: MainServices[] = [
  {
    icon: <Icons.PlaneTakeoff />,
    title: "Training",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum",
  },
  {
    icon: <Icons.PlaneTakeoff />,
    title: "Flights",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum",
  },
  {
    icon: <Icons.PlaneTakeoff />,
    title: "Industry",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum",
  },
  {
    icon: <Icons.PlaneTakeoff />,
    title: "Our company",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum",
  },
];

export const MainServices = () => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: MainServices) => (
          <Card
            key={title}
            className="bg-white rounded-none border-0 border-b-4 border-brand-light-blue relative"
          >
            <CardHeader>
              <CardTitle className="grid gap-4">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="-mt-4">{description}</CardContent>
            <div className="absolute bottom-0 right-0">
              <svg className="h-6 w-6 text-brand-light-blue" viewBox="0 0 20 20" fill="currentColor">
                <polygon points="20 0 20 20 0 20" />
              </svg>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};