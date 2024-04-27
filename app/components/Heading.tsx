'use client'

import HelicopterIcon from "./HelicopterIcon";
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
  tagColor?: 'white' | 'blue' | 'dark-blue';
}

const Heading: React.FC<HeadingProps> = ({
  title,
  titleSize,
  subtitle,
  iconSize,
  iconStyles,
  tag,
  tagColor = 'white',
  tagSize = 'text-lg',
  center,
  className,
}) => {
  return (
    <div className={`${center ? 'text-center max-w-[600px] mx-auto' : 'text-start'} font-workSans ${className}`}>
      <div className={`${center ? 'justify-center' : 'justify-start'} font-workSans flex text-brand-light-blue text-lg`}>
        {tag ? (<div className={`flex justify-center ${iconStyles}`}><HelicopterIcon iconColor={tagColor} iconSize={iconSize} className={`mr-2`} /><div className={`${tagSize}`}>{tag}</div></div>) : null}
      </div>
      <div className={`font-bold mt-2 text-brand-dark-blue text-5xl ${titleSize}`}>{title}</div>
      <div className='font-light text-neutral-500 mt-2'>{subtitle}</div>
    </div>
  );
};

export default Heading;
