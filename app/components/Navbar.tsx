"use client";

import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery } from '../hooks/use-media-query';
import { ModeToggle } from "./ModeToggle";
import { NavMenu } from "./NavMenu";

export default function Navbar() {

  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <header className="w-full border-b-4 border-blue-400">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-mono text-lg font-bold">
          <Image
            src="/images/logo.png"
            alt="Helicopter Services"
            width={100}
            height={34}
          />
        </Link>
        {isDesktop ? <NavMenu /> :
          <Drawer direction='left'>
            <DrawerTrigger>
              <MenuIcon size={24} />
            </DrawerTrigger>
            <DrawerContent className='h-full mr-20'>
              Mobile menu
            </DrawerContent>
          </Drawer>}
        <ModeToggle />
      </div>
    </header >
  );
};