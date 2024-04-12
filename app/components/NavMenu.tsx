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

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Flight Examiner Ratings',
    href: '/training/flight-examiner-ratings',
    description: 'Helicopter flight examiners hold a lot of responsibility, setting the standards across the industry and ensuring that they are maintained.',
  },
  // {
  //   title: 'Commerical Pilot License',
  //   href: '/training/commerical-pilot-license',
  //   description: 'ELCAS approved training provider for military personnel.',
  // },
  {
    title: 'PBN',
    href: '/training/PBN',
    description: 'The current generation of instrument flying is based on sensors with diverging definitions of precision in different countries.',
  },
  // {
  //   title: 'Simulator',
  //   href: '/training/simulator',
  //   description: 'ELCAS approved training provider for military personnel.',
  // },
  // {
  //   title: 'Virtual Reality Simulator',
  //   href: '/training/virtual-reality-simulator',
  //   description: 'ELCAS approved training provider for military personnel.',
  // },
  // {
  //   title: 'FAA',
  //   href: '/training/FAA',
  //   description: 'ELCAS approved training provider for military personnel.',
  // },
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
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="from-muted/50 to-muted flex size-full select-none flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Helicopters
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      We are able to operate fast, safe bespoke travel while
                      maintaining social distance in our sanitised helicopters
                      all subject to our Covid-19 policy.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/" title="Flight Services">
                We offer a luxury airport transfer service to help you avoid the
                traffic and stress.
              </ListItem>
              <ListItem href="/" title="Airport Transfer">
                We provide helicopter shuttle services to events including horse
                racing, motorsport, etc.
              </ListItem>
              <ListItem href="/" title="Helicopter Charter">
                We offer the ultimate way to see London, one of the most famous
                cities in the world.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Training</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
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
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contact
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
