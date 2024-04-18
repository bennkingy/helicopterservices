'use client';

import { cn } from "@/lib/utils";
import Image from 'next/image';
import Link from 'next/link';
import Headroom from 'react-headroom';
import { ModeToggle } from "./ModeToggle";
import { NavMenu } from "./NavMenu";

export default function Navbar() {

  return (
    <Headroom >
      <header className="w-full border-b-4 border-brand-light-blue bg-white">
        <div className={cn("container flex h-16 items-center justify-between",
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
        </div>
      </header>
    </Headroom>
  );
};