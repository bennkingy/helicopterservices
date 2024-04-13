import { Button } from "@/components/ui/button";

type props = {
  height?: string; // e.g. 'h-[70vh]' or 'h-[50vh]'
  title?: string; // e.g. 'Mallard Plumbing and Heating'
  subtitle?: string; // e.g. 'From checkout to global sales......'
  cta?: {
    label: string; // e.g. 'Get a quote'
    onClick: () => void; // e.g. () => registerModal.onOpen()
  };
  cta2?: {
    label: string; // e.g. 'Get a quote'
    onClick: () => void; // e.g. () => registerModal.onOpen()
  };
};

const Hero = ({ height = 'h-[70vh]', cta, cta2, title, subtitle }: props) => {
  return (
    <section
      className={`bg-[url('https://images.pexels.com/photos/1549308/pexels-photo-1549308.jpeg')] bg-hero bg-no-repeat bg-cover bg-center ${height}`}
    >
      <div className={`backdrop-brightness-50 ${height}`}>
        <div className='h-full grid max-w-screen-xl px-4 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12'>
          <div className='mr-auto place-self-center lg:col-span-6 m-[-100px]'>
            <h1 className='max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-5xl dark:text-white text-white'>
              {title}
            </h1>
            <p className='max-w-2xl mb-6 font-light text-white lg:mb-8 md:text-lg lg:text-xl dark:text-white'>
              {subtitle}
            </p>
            {cta && (
              <Button
                onClick={() => {
                  cta?.onClick();
                }}
              />
            )}
            {cta2 && (
              <Button
                onClick={() => {
                  cta2?.onClick();
                }}
                className='ml-3'
              />
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-blue-500 dark:bg-black bg-opacity-50 dark:bg-opacity-50 flex items-center justify-center text-white text-center">
          <p>A leading UK CAA and EASA approved Training Organisation</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
