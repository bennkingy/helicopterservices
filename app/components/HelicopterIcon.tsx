import Image from "next/image";

type props = {
  iconColor?: 'white' | 'light-blue' | 'dark-blue';
  iconSize?: number;
  className?: string;
}

const HelicopterIcon = ({ iconColor = 'white', iconSize = 20, className }: props) => {
  return (
    <>
      <Image src={`/images/helicopter-icon-${iconColor}.svg`} alt='' width={iconSize} height={iconSize} className={`mr-2 ${className}`} />
    </>
  )
}

export default HelicopterIcon