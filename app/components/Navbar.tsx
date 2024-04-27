'use client';

import { cn } from "@/lib/utils";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from "react";
import Headroom from 'react-headroom';
import { ModeToggle } from "./ModeToggle";
import { NavMenu } from "./NavMenu";

export default function Navbar() {
  const [isPinned, setIsPinned] = useState(false);

  return (
    <Headroom
      downTolerance={10}
      className="absolute w-full"
      onPin={() => setIsPinned(true)}
      onUnfix={() => setIsPinned(false)}
    >
      {!isPinned ? <div className="h-[40px] w-full bg-brand-dark-blue flex justify-center align-center items-center">
        <div className="relative h-[14px] sm:h-[24px] w-[14px] sm:[w-[24px]">
          <Image priority fill src={'/images/check1.svg'} alt="img" className="w-full object-cover " />
        </div>
        <p className="ml-2 text-white text-center font-workSans text-xs sm:text-base">
          A leading UK CAA and EASA approved Training Organisation
        </p>
      </div> : null}
      <header className={cn(
        "w-full transition-all duration-300 ease-in-out",
        isPinned ? "h-[80px]" : "h-[115px]",
        "border-b-4 border-brand-light-blue bg-white flex"
      )}>
        <div className={cn(
          "container flex items-center justify-between",
          "px-4"
        )}>
          <Link href="/" className="font-mono text-lg font-bold start">
            <Image
              src="/images/LogoLightV1.svg"
              alt="Helicopter Services"
              width={191}
              height={117}
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