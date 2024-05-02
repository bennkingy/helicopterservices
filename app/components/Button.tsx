import { Button as ButtonUI } from '@/components/ui/button';
import Link from 'next/link';
interface props {
  href: string;
  className?: string;
}

const Button = ({ href, className }: props) => {
  return (
    <Link href='/enquire' className={className}>
      <ButtonUI className={`uppercase bg-brand-light-blue text-white w-[150px] py-6`}>Enquire Today</ButtonUI>
    </Link>
  )
}

export default Button