'use client'

import { cn } from "@/lib/utils";
import HelicopterIcon from "./HelicopterIcon";
interface HeadingProps {
  title: string;
  titleStyles?: any;
  subtitle?: string;
  tag?: string;
  tagSize?: any;
  center?: boolean;
  className?: string;
  iconSize?: number;
  iconStyles?: string;
  iconColor?: 'white' | 'dark-blue' | 'light-blue';
}

const Heading: React.FC<HeadingProps> = ({
  title,
  titleStyles,
  subtitle,
  iconSize,
  iconStyles,
  tag,
  iconColor = 'light-blue',
  tagSize = 'text-lg',
  center,
  className,
}) => {
  return (
    <div className="-mt-[5px]">
      <div className={`${center ? 'text-center max-w-[600px] mx-auto' : 'text-start'} font-workSans ${className}`}>
        <div className={`${center ? 'justify-center' : 'justify-start'} font-workSans flex text-brand-light-blue text-lg`}>
          {tag ? (<div className={`flex justify-center ${iconStyles}`}><HelicopterIcon iconColor={iconColor} iconSize={iconSize} className={`mr-2`} /><div className={cn(`font-normal ${tagSize}`)}>{tag}</div></div>) : null}
        </div>
        <div className={cn(`font-bold mt-2 text-brand-dark-blue ${titleStyles}`)}>{title}</div>
        <div className='font-light text-neutral-500 mt-2'>{subtitle}</div>
      </div>
    </div>
  );
};

export default Heading;
