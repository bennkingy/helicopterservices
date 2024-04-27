'use client'

import Image from "next/image";
interface HeadingProps {
  title: string;
  titleSize?: any;
  subtitle?: string;
  tag?: string;
  tagSize?:
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
  center?: boolean;
  className?: string;
  iconSize?: number;
  iconStyles?: string;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  titleSize,
  subtitle,
  iconSize,
  iconStyles,
  tag,
  tagSize = 'text-lg',
  center,
  className,
}) => {
  return (
    <div className={`${center ? 'text-center max-w-[600px] mx-auto' : 'text-start'} font-workSans ${className}`}>
      <div className={`${center ? 'justify-center' : 'justify-start'} font-workSans flex text-brand-light-blue text-lg`}>
        {tag ? (<div className={`flex justify-center ${iconStyles}`}><Image src='/images/helicopter-icon-blue.svg' alt='' width={iconSize ?? 20} height={iconSize ?? 20} className={`mr-2`} /><div className={`${tagSize}`}>{tag}</div></div>) : null}
      </div>
      <div className={`font-bold mt-2 text-brand-dark-blue text-5xl ${titleSize}`}>{title}</div>
      <div className='font-light text-neutral-500 mt-2'>{subtitle}</div>
    </div>
  );
};

export default Heading;
