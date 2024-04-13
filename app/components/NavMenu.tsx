'use client';

import Link from 'next/link';
import * as React from 'react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const training: { title: string; href: string; description: string }[] = [
  {
    title: 'Private pilot license',
    href: '/training/private-pilot-license',
    description: 'Some description about the training course.',
  },
  {
    title: 'Commerical Pilot License',
    href: '/training/commerical-pilot-license',
    description: 'ELCAS approved training provider for military personnel.',
  },
  {
    title: 'Flight examiner rating',
    href: '/training/flight-examiner-rating',
    description: 'Helicopter flight examiners hold a lot of responsibility, setting the standards across the industry and ensuring that they are maintained.',
  },
  {
    title: 'Type rating',
    href: '/training/type-rating',
    description: 'Some description about the training course.',
  },
  {
    title: 'Instrument rating',
    href: '/training/type-rating',
    description: 'Some description about the training course.',
  },
  {
    title: 'Flight instructor rating',
    href: '/training/flight-instructor-rating',
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

export function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Training</NavigationMenuTrigger>
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
          <NavigationMenuTrigger>Industry</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="from-muted/50 to-muted flex size-full select-none flex-col justify-start rounded-md bg-gradient-to-b p-6 no-underline outline-none focus:shadow-md"
                    href="/"
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
              <ListItem href="/" title="Airport transfer">
                We provide helicopter shuttle services to events including horse
                racing, motorsport, etc.
              </ListItem>
              <ListItem href="/" title="Photography and filming">
                We offer the ultimate way to see London, one of the most famous
                cities in the world.
              </ListItem>
              <ListItem href="/" title="Load lifting">
                Something about load lifting.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Flights</NavigationMenuTrigger>
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
          <NavigationMenuTrigger>About us</NavigationMenuTrigger>
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
