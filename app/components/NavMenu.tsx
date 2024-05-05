"use client";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const training: { title: string; href: string; description: string }[] = [
	{
		title: "Private pilot license",
		href: "/training/private-pilot-licence",
		description: "Some description about the training course.",
	},
	{
		title: "Commerical Pilot License",
		href: "/training/commercial-pilot-licence",
		description: "ELCAS approved training provider for military personnel.",
	},
	{
		title: "Flight examiner rating",
		href: "/training/flight-examiner-ratings",
		description:
			"Helicopter flight examiners hold a lot of responsibility, setting the standards across the industry and ensuring that they are maintained.",
	},
	{
		title: "Type rating",
		href: "/training/type-ratings",
		description: "Some description about the training course.",
	},
	{
		title: "Instrument rating",
		href: "/training/instrument-ratings",
		description: "Some description about the training course.",
	},
	{
		title: "Flight instructor rating",
		href: "/training/flight-instructor-ratings",
		description: "Some description about the training course.",
	},
	{
		title: "Night rating",
		href: "/training/night-rating",
		description: "Some description about the training course.",
	},
	{
		title: "PBN",
		href: "/training/PBN",
		description:
			"The current generation of instrument flying is based on sensors with diverging definitions of precision in different countries.",
	},
	{
		title: "Virtual Reality Simulator",
		href: "/training/virtual-reality-simulator",
		description: "Some description about the training course.",
	},
	{
		title: "Simulator",
		href: "/training/simulator",
		description: "Some description about the training course.",
	},
	{
		title: "ELCAS",
		href: "/training/ELCAS",
		description: "ELCAS approved training provider for military personnel.",
	},
	{
		title: "FAA",
		href: "/training/FAA",
		description: "Some description about the training course.",
	},
	{
		title: "Refresher seminars",
		href: "/training/refresher-seminars",
		description: "Some description about the training course.",
	},
	{
		title: "Advanced flying programme",
		href: "/training/advanced-flying-programme",
		description: "Some description about the training course.",
	},
];

const flights: { title: string; href: string; description: string }[] = [
	{
		title: "Airpot transfers",
		href: "/flights/airport-transfers",
		description: "Some description about the transfers.",
	},
	{
		title: "Helicopter Charter",
		href: "/flights/helicopter-charter",
		description: "Some description about the helicopter charter.",
	},
	{
		title: "London sightseeing",
		href: "/flights/london-sightseeing",
		description: "Some description about the sightseeing.",
	},
	{
		title: "Special events",
		href: "/flights/special-events",
		description: "Some description about the special events.",
	},
	{
		title: "Trail lessons",
		href: "/flights/trail-lessons",
		description: "Some description about the trail lessons.",
	},
	{
		title: "Local area tours",
		href: "/flights/local-area-tours",
		description: "Some description about the local area tours.",
	},
];

const about: { title: string; href: string; description: string }[] = [
	{
		title: "Brexit",
		href: "/about-us/brexit",
		description: "Some description about us.",
	},
	{
		title: "Meet the team",
		href: "/about-us/meet-the-team",
		description: "Some description about the team.",
	},
	{
		title: "Helicopter fleet",
		href: "/fleet/helicopter-fleet",
		description: "Meet the fleet!",
	},
	{
		title: "The Hanger",
		href: "/about-us/the-hanger",
		description: "Some description about the hanger.",
	},
	{
		title: "FAQs",
		href: "/about-us/faqs",
		description: "FAQs.",
	},
];

const fleet: { title: string; href: string; description: string }[] = [
	{
		title: "A109",
		href: "/fleet/a109",
		description: "Some description about the A109.",
	},
	{
		title: "AS355",
		href: "/fleet/as355",
		description: "Some description about the AS355.",
	},
	{
		title: "AB206",
		href: "/fleet/ab206",
		description: "Some description about the AB206.",
	},
	{
		title: "R66",
		href: "/fleet/R66",
		description: "Some description about the R66.",
	},
	{
		title: "R44",
		href: "/fleet/r44",
		description: "Some description about the R44.",
	},
	{
		title: "R22",
		href: "/fleet/r22",
		description: "Some description about the R22.",
	},
	{
		title: "Cabri G2",
		href: "/fleet/cabri-g2",
		description: "Some description about the Cabri G2.",
	},
	{
		title: "AS350",
		href: "/fleet/as350",
		description: "Some description about the AS350.",
	},
	{
		title: "B206L",
		href: "/fleet/b206l",
		description: "Some description about the B206L.",
	},
	{
		title: "EC135",
		href: "/fleet/ec135",
		description: "Some description about the EC135.",
	},
	{
		title: "AW109",
		href: "/fleet/aw109",
		description: "Some description about the AW109.",
	},
];

export function NavMenu() {
	return (
		<>
			<NavigationMenu className="hidden sm:block font-workSans">
				<NavigationMenuList>
					<NavigationMenuItem className="hidden lg:block">
						<Link href="/" legacyBehavior passHref className="text-lg">
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Home
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger>
							<a href="/training">Training</a>
						</NavigationMenuTrigger>
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
						<NavigationMenuTrigger>
							<a href="/industry">Industry</a>
						</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
								<ListItem
									href="/industry/photography-filming"
									title="Photography and filming"
								>
									We offer the ultimate way to see London, one of the most
									famous cities in the world.
								</ListItem>
								<ListItem href="/industry/load-lifting" title="Load lifting">
									Something about load lifting.
								</ListItem>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger>
							<a href="/flights">Flights</a>
						</NavigationMenuTrigger>
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
						<NavigationMenuTrigger>
							<a href="/fleet/helicopter-fleet">Fleet</a>
						</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
								{fleet.map((component) => (
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
						<NavigationMenuTrigger>
							<a href="/about-us">About us</a>
						</NavigationMenuTrigger>
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
						<Link href="/enquire" legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Enquire
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
			<div className="flex visible sm:hidden ml-auto">
				<Drawer direction="right">
					<DrawerTrigger className="mr-3">
						<MenuIcon size={24} />
					</DrawerTrigger>
					<DrawerContent className="h-full ml-20">
						<ul>
							<li className="mb-4 ml-4">
								<a href="/">Home</a>
							</li>
							<li className="mb-4 ml-4">
								<a href="/training">Training</a>
							</li>
							<li className="mb-4 ml-4">
								<a href="/industry">Industry</a>
							</li>
							<li className="mb-4 ml-4 mt-4">
								<a href="/flights">Flights</a>
							</li>
							<li className="mb-4 ml-4">
								<a href="/fleet/helicopter-fleet">Fleet</a>
							</li>
							<li className="mb-4 ml-4">
								<a href="/about-us">About us</a>
							</li>
							<li className="mb-4 ml-4">
								<a href="/enquire">Enquire</a>
							</li>
						</ul>
					</DrawerContent>
				</Drawer>
			</div>
		</>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
						className,
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
ListItem.displayName = "ListItem";
