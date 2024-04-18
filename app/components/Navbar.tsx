'use client';

import { cn } from "@/lib/utils";
import Image from 'next/image';
import Link from 'next/link';
import Headroom from 'react-headroom';
import { ModeToggle } from "./ModeToggle";
import { NavMenu } from "./NavMenu";

export default function Navbar() {

  return (
    <Headroom>
      <header className="w-full border-b-4 border-brand-light-blue bg-white">
        <div className={cn("container flex h-14 sm:h-16 items-center justify-between",
          "container", "px-4"
        )}>
          <Link href="/" className="font-mono text-lg font-bold start">
            <Image
              src="/images/logo.png"
              alt="Helicopter Services"
              width={100}
              height={34}
              className='min-w-[100px]'
            />
          </Link>
          <NavMenu />
          <ModeToggle />
          <div className="absolute bottom-0 right-0">
            <svg className="h-6 w-6 text-brand-light-blue" viewBox="0 0 20 20" fill="currentColor">
              <polygon points="20 0 20 20 0 20" />
            </svg>
          </div>
        </div>
      </header>
    </Headroom>
  );
};