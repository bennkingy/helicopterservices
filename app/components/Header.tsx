'use client'

type props = {
  height?: string; // e.g. 'h-[70vh]' or 'h-[50vh]'
  title?: string; // e.g. 'Mallard Plumbing and Heating'
  subtitle?: string; // e.g. 'From checkout to global sales......'
  className?: string;
  image?: string;
  backgroundPosition?: 'bg-center' | 'bg-top' | 'bg-bottom' | 'bg-left' | 'bg-right' | 'bg-left-top' | 'bg-right-top' | 'bg-left-bottom' | 'bg-right-bottom';
};

const Header = ({ height = 'h-[420px]', title, subtitle, className, image, backgroundPosition = 'bg-center' }: props) => {

  // TODO: This should come from the page data: https://cdn.sanity.io/images/0he7nz2b/production/6970de59aa24da2973e3892c2f43231ef132fcee-1680x419.png

  return (
    <section
      className={`bg-[url('https://cdn.sanity.io/images/0he7nz2b/production/6970de59aa24da2973e3892c2f43231ef132fcee-1680x419.png')] bg-Header bg-no-repeat bg-cover ${backgroundPosition} ${height} ${className}`}
    >
      <div className='h-full grid max-w-6xl container'>
        <div className='mr-auto place-self-center lg:col-span-8 mt-[-96px]'>
          <p className='max-w-2xl mb-6 font-light text-white lg:mb-8 md:text-lg lg:text-xl dark:text-white'>
            {subtitle}
          </p>
        </div>
        <h1 className='max-w-2xl mb-4 text-4xl tracking-tight leading-none md:text-5xl xl:text-5xl dark:text-white text-white'>
          {title}
        </h1>
      </div>
    </section>
  );
};

export default Header;
