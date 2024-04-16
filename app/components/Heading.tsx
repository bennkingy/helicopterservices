'use client'
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
  tag,
  center,
  className,
}) => {
  return (
    <div className={`${center ? 'text-center ' : 'text-start '} max-w-screen-2xl ${className}`}>
      <div className='font-bold'>{tag}</div>
      <div className={`${'font-bold mt-2 '}${titleSize}`}>{title}</div>
      <div className='font-light text-neutral-500 mt-2'>{subtitle}</div>
    </div>
  );
};

export default Heading;
