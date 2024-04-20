'use client';

import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from "@/lib/utils";
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

const training: { title: string; href: string; description: string }[] = [
  {
    title: 'Private pilot license',
    href: '/training/private-pilot-licence',
    description: 'Some description about the training course.',
  },
  {
    title: 'Commerical Pilot License',
    href: '/training/commercial-pilot-licence',
    description: 'ELCAS approved training provider for military personnel.',
  },
  {
    title: 'Flight examiner rating',
    href: '/training/flight-examiner-ratings',
    description: 'Helicopter flight examiners hold a lot of responsibility, setting the standards across the industry and ensuring that they are maintained.',
  },
  {
    title: 'Type rating',
    href: '/training/type-ratings',
    description: 'Some description about the training course.',
  },
  {
    title: 'Instrument rating',
    href: '/training/instrument-ratings',
    description: 'Some description about the training course.',
  },
  {
    title: 'Flight instructor rating',
    href: '/training/flight-instructor-ratings',
    description: 'Some description about the training course.',
  },
  {
    title: 'Night rating',
    href: '/training/night-rating',
    description: 'Some description about the training course.',
  },
  {
    title: 'PBN',
    href: '/training/PBN',
    description: 'The current generation of instrument flying is based on sensors with diverging definitions of precision in different countries.',
  },
  {
    title: 'Virtual Reality Simulator',
    href: '/training/virtual-reality-simulator',
    description: 'Some description about the training course.',
  },
  {
    title: 'Simulator',
    href: '/training/simulator',
    description: 'Some description about the training course.',
  },
  {
    title: 'ELCAS',
    href: '/training/ELCAS',
    description: 'ELCAS approved training provider for military personnel.',
  },
  {
    title: 'FAA',
    href: '/training/FAA',
    description: 'Some description about the training course.',
  },
  {
    title: 'Refresher seminars',
    href: '/training/refresher-seminars',
    description: 'Some description about the training course.',
  },
  {
    title: 'Advanced flying programme',
    href: '/training/advanced-flying-programme',
    description: 'Some description about the training course.',
  },
];

const flights: { title: string; href: string; description: string }[] = [
  {
    title: 'London sightseeing',
    href: '/flights/london-sightseeing',
    description: 'Some description about the tour.',
  },
  {
    title: 'Special events',
    href: '/flights/special-events',
    description: 'Some description about the tour.',
  },
  {
    title: 'Trail lessons',
    href: '/flights/trail-lessons',
    description: 'Some description about the tour.',
  },
];

const about: { title: string; href: string; description: string }[] = [
  {
    title: 'Brexit',
    href: '/about-us/brexit',
    description: 'Some description about us.',
  },
  {
    title: 'Meet the team',
    href: '/about-us/meet-the-team',
    description: 'Some description about the team.',
  },
  {
    title: 'Helicopter fleet',
    href: '/about-us/helicopter-fleet',
    description: 'Meet the fleet!',
  },
  {
    title: 'The Hanger',
    href: '/about-us/the-hanger',
    description: 'Some description about the hanger.',
  },
  {
    title: 'FAQs',
    href: '/about-us/faqs',
    description: 'FAQs.',
  },
];

const industry: { title: string; href: string; description: string }[] = [
  {
    title: 'Aiport transfer',
    href: '/industry/airport-transfers',
    description: 'Some description airport transfer.',
  },
  {
    title: 'Helicopter charter',
    href: '/industry/helicopter-charter',
    description: 'Some description about the team.',
  },
  {
    title: 'Photography and filming',
    href: '/industry/photography-and-filming',
    description: 'Photography and filming',
  },
  {
    title: 'Load lifting',
    href: '/industry/load-lifting',
    description: 'Some description about load lifting.',
  },
];


export function NavMenu() {
  return (
    <>
      <NavigationMenu className='hidden sm:block font-workSans'>
        <NavigationMenuList>
          <NavigationMenuItem className='hidden lg:block'>
            <Link href="/" legacyBehavior passHref className='text-lg'>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger><a href="/training">Training</a></NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-3 lg:w-[800px] ">
                {training.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger><a href="/industry">Industry</a></NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="from-muted/50 to-muted flex size-full select-none flex-col justify-start rounded-md bg-gradient-to-b p-6 no-underline outline-none focus:shadow-md"
                      href="/industry/helicopter-charter"
                    >
                      <div className="mb-2 text-lg font-medium">
                        Helicopter charter
                      </div>
                      <p className="text-muted-foreground text-sm leading-tight">
                        We are able to operate fast, safe bespoke travel while
                        maintaining social distance.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/industry/airport-transfers" title="Airport transfer">
                  We provide helicopter shuttle services to events including horse
                  racing, motorsport, etc.
                </ListItem>
                <ListItem href="/industry/photography-and-filming" title="Photography and filming">
                  We offer the ultimate way to see London, one of the most famous
                  cities in the world.
                </ListItem>
                <ListItem href="/industry/load-lifting" title="Load lifting">
                  Something about load lifting.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger><a href="/flights">Flights</a></NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {flights.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger><a href="/about-us">About us</a></NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {about.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/inquire" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Inquire
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className='flex visible sm:hidden ml-auto'>
        <Drawer direction='right'>
          <DrawerTrigger className='mr-3'>
            <MenuIcon size={24} />
          </DrawerTrigger>
          <DrawerContent className='h-full ml-20'>
            <ul>
              <li className='mb-4 ml-4 mt-4'><a href='/flights'>Flights</a></li>
              <li className='mb-4 ml-4'><a href='/industry'>Industry</a></li>
              <li className='mb-4 ml-4'><a href='/training'>Training</a></li>
              <li className='mb-4 ml-4'><a href='/about-us'>About Us</a></li>
              <li className='mb-4 ml-4'><a href='/inquire'>Inquire</a></li>
            </ul>
          </DrawerContent>
        </Drawer>
      </div >
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
