import Image from "next/image";

type props = {
  iconColor?: 'White' | 'Blue' | 'Dark';
  iconSize?: number;
  iconType?: 'Industry' | 'Company' | 'Flights' | 'Training';
  className?: string;
}

const IconHelper = ({ iconType = "Flights", iconColor = 'White', iconSize = 20, className }: props) => {
  return (
    <Image 
      src={`/images/icons/${iconType}${iconColor}.svg`} 
      alt='Helicopter Services' 
      width={iconSize} 
      height={iconSize} 
      className={`mr-2 ${className}`} 
    />
  )
}

export default IconHelper;