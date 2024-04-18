'use client'

import Image from "next/image";
interface HeadingProps {
  title: string;
  titleSize?:
  | 'text-5xl'
  | 'text-4xl'
  | 'text-3xl'
  | 'text-2xl'
  | 'text-xl'
  | 'text-lg'
  | 'text-md'
  | 'text-sm'
  | 'text-xs'
  | 'text-xxs';
  subtitle?: string;
  tag?: string;
  center?: boolean;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  titleSize = 'text-5xl',
  subtitle,
  tag = 'hs services',
  center,
  className,
}) => {
  return (
    <div className={`${center ? 'text-center ' : 'text-start '} max-w-screen-2xl ${className} font-workSans`}>
      <div className={`${center ? 'justify-center ' : 'justify-start'} font-workSans flex text-brand-light-blue text-lg`}>
        <Image src='/images/helicopter-icon-blue.svg' alt='' width={20} height={20} className="mr-2" />
        {tag}
      </div>
      <div className={`${'font-bold mt-2 '}${titleSize}`}>{title}</div>
      <div className='font-light text-neutral-500 mt-2'>{subtitle}</div>
    </div>
  );
};

export default Heading;
