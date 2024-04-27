'use client';

import { cn } from "@/lib/utils";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from "react";
import Headroom from 'react-headroom';
import { ModeToggle } from "./ModeToggle";
import { NavMenu } from "./NavMenu";

export default function Navbar() {
  const [isFixed, setIsFixed] = useState(true);

  return (
    <Headroom
      onUnfix={() => setIsFixed(false)}
      onPin={() => setIsFixed(true)}
    >
      <header className={cn(
        "w-full transition-all duration-300 ease-in-out",
        isFixed ? "h-[80px]" : "h-[115px]",
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