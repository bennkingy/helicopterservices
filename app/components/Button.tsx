import { Button as ButtonUI } from '@/components/ui/button';
import Link from 'next/link';
import { ReactNode } from 'react';
interface props {
  href: string;
  children: ReactNode;
  className?: string;
}

const Button = ({ href, children, className }: props) => {
  return (
    <Link href='/enquire'>
      <ButtonUI className={`uppercase bg-brand-light-blue text-white w-[150px] py-6 ${className}`}>Enquire Today</ButtonUI>
    </Link>
  )
}

export default Button