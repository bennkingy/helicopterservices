import { cn } from "@/lib/utils";
import IconsHelper from "./IconsHelper";
interface HeadingProps {
  title: string;
  // Heading level for the title. Use h1 once per page, for the page title.
  as?: 'h1' | 'h2' | 'h3';
  titleStyles?: any;
  // Title size. 'lg' for page sections, 'md' for cards and grid items.
  // titleStyles can still override it.
  size?: 'lg' | 'md';
  subtitle?: string;
  tag?: string;
  tagSize?: any;
  center?: boolean;
  className?: string;
  iconSize?: number;
  iconStyles?: string;
  iconColor?: 'White' | 'Dark' | 'Blue';
  iconType?: 'Industry' | 'Company' | 'Flights' | 'Training';
}

const Heading: React.FC<HeadingProps> = ({
  title,
  as: Title = 'h2',
  titleStyles,
  size = 'lg',
  subtitle,
  iconSize,
  iconStyles,
  tag,
  iconColor = 'Blue',
  iconType = 'Flights',
  tagSize,
  center,
  className,
}) => {
  return (
    <div>
      <div className={`${center ? 'text-center max-w-[600px] mx-auto' : 'text-start'} font-workSans ${className}`}>
        <div className={`${center ? 'justify-center' : 'justify-start'} font-workSans flex text-brand-light-blue text-lg`}>
          {tag ? (<div className={`flex justify-center ${iconStyles}`}><IconsHelper iconColor={iconColor} iconSize={iconSize} iconType={iconType} className={'mr-2'} /><div className={cn('text-base font-normal', tagSize)}>{tag}</div></div>) : null}
        </div>
        <Title className={cn('font-bold mt-2 leading-tight text-brand-dark-blue', size === 'lg' ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl', titleStyles)}>{title}</Title>
        {subtitle ? <p className='font-light text-neutral-500 mt-2'>{subtitle}</p> : null}
      </div>
    </div>
  );
};

export default Heading;
