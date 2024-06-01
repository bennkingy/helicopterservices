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
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

const training: { title: string; href: string; description: string }[] = [
	{
		title: "Private pilot license",
		href: "/training/private-pilot-licence",
		description: "Fly helicopters privately with a private pilot license.",
	},
	{
		title: "Commerical Pilot License",
		href: "/training/commercial-pilot-licence",
		description: "Fly for a living and get paid to do the job you love!",
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
		description:
			"Putting you near the top of the ladder throughout the helicopter industry.",
	},
	{
		title: "Instrument rating",
		href: "/training/instrument-ratings",
		description:
			"The ultimate way to see London, one of the most famous cities in the world.",
	},
	{
		title: "Flight instructor rating",
		href: "/training/flight-instructor-ratings",
		description:
			"Allows you to fly helicopters under IFR down to a decision height of 200ft.",
	},
	{
		title: "Night rating",
		href: "/training/night-rating",
		description: "This add-on for your licence is a exciting challenge",
	},
	{
		title: "PBN",
		href: "/training/PBN",
		description: "Improving aircraft navigation with precision and efficiency.",
	},
	{
		title: "Virtual Reality Simulator",
		href: "/training/virtual-reality-simulator",
		description:
			"An incredibly realistic experience allowing for all flight profiles.",
	},
	{
		title: "Simulator",
		href: "/training/simulator",
		description:
			"Developing safe instrument flying skills, reducing costs, and enabling progress.",
	},
	{
		title: "ELCAS",
		href: "/training/ELCAS",
		description: "ELCAS approved training provider for military personnel.",
	},
	{
		title: "FAA",
		href: "/training/FAA",
		description:
			"Helicopter Services can train and maintain pilots under the FAA.",
	},
	{
		title: "Refresher seminars",
		href: "/training/refresher-seminars",
		description: "Expert Instructor and Examiner Seminars.",
	},
	{
		title: "Advanced flying programme",
		href: "/training/advanced-flying-programme",
		description:
			"Develop your skills while you expand your practical flying adventures.",
	},
];

const flights: { title: string; href: string; description: string }[] = [
	{
		title: "Airpot transfers",
		href: "/flights/airport-transfers",
		description: "Your luxury airport transfer service.",
	},
	{
		title: "Helicopter Charter",
		href: "/flights/helicopter-charter",
		description: "Transporting VIPs to special events for over 20 years.",
	},
	{
		title: "London sightseeing",
		href: "/flights/london-sightseeing",
		description: "Unrivalled views of the most famous city in the world.",
	},
	{
		title: "Special events",
		href: "/flights/special-events",
		description:
			"Private charters for weddings, tours, and celebrations, ensuring excellent service.",
	},
	{
		title: "Trail lessons",
		href: "/flights/trail-lessons",
		description: "Discover the fun and manoeuvrability of a helicopter!",
	},
	{
		title: "Local area tours",
		href: "/flights/local-area-tours",
		description: "Experience the UK from the air with our local area tours.",
	},
];

const about: { title: string; href: string; description: string }[] = [
	{
		title: "Meet the team",
		href: "/about-us/meet-the-team",
		description: "Meet our lovely team!",
	},
	{
		title: "Helicopter fleet",
		href: "/fleet",
		description: "Check out our helicopter fleet.",
	},
	{
		title: "The Hanger",
		href: "/about-us/the-hanger",
		description: "Check out the hanger.",
	},
	{
		title: "FAQs",
		href: "/about-us/faqs",
		description: "Fequently asked questions and answers.",
	},
];

const fleet: { title: string; href: string }[] = [
	{
		title: "A109",
		href: "/fleet/a109",
		// description: "Versatile and high-performance twin-engine helicopter.",
	},
	{
		title: "AS355",
		href: "/fleet/as355",
		// description: "A a multi-purpose, twin-engine light helicopter.",
	},
	{
		title: "AB206",
		href: "/fleet/ab206",
		// description:
		// 	"A light utility helicopter known for its reliability and versatility.",
	},
	{
		title: "R66",
		href: "/fleet/r66",
		// description: "Some description about the R66.",
	},
	{
		title: "R44",
		href: "/fleet/r44",
		// description: "Some description about the R44.",
	},
	{
		title: "R22",
		href: "/fleet/r22",
		// description: "Some description about the R22.",
	},
	{
		title: "Cabri G2",
		href: "/fleet/cabri-g2",
		// description: "Some description about the Cabri G2.",
	},
	{
		title: "AS350",
		href: "/fleet/as350",
		// description: "A single-engine light utility helicopter.",
	},
	{
		title: "B206L",
		href: "/fleet/b206l",
		// description: "Some description about the B206L.",
	},
	{
		title: "EC135",
		href: "/fleet/ec135",
		// description: "Some description about the EC135.",
	},
	{
		title: "AW109",
		href: "/fleet/aw109",
		// description: "Some description about the AW109.",
	},
];

export function NavMenu() {
	return (
		<>
			<NavigationMenu className="hidden sm:block font-workSans font-semibold text-brand-dark-blue">
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
								{training
									.sort((a, b) => a.title.localeCompare(b.title))
									.map((component) => (
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
								<ListItem href="/industry/load-lifting" title="Load lifting">
									Resolve many load lifting challenges with our range of load
									lifting services.
								</ListItem>
								<ListItem
									href="/industry/photography-filming"
									title="Photography and filming"
								>
									Getting the best shots for companies, such as BBC, ITV, Sky,
									Channel 4.
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
								{flights
									.sort((a, b) => a.title.localeCompare(b.title))
									.map((component) => (
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
							<a href="/fleet">Fleet</a>
						</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-3 lg:w-[600px] ">
								{fleet
									.sort((a, b) => a.title.localeCompare(b.title))
									.map((component) => (
										<ListItem
											key={component.title}
											title={component.title}
											href={component.href}
										>
											{/* {component.description} */}
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
								{about
									.sort((a, b) => a.title.localeCompare(b.title))
									.map((component) => (
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
					<DrawerTrigger className="mr-3 flex font-semibold text-black">
						{/* Menu */}
						<MenuIcon size={30} />
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
								<a href="/fleet">Fleet</a>
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
			<Link href="tel:+44 1494513 166" className="">
				{/* <Icons.phone className="text-brand-light-blue" height={20} /> */}
				<Image
					src="/images/circle-phone.svg"
					alt="phone"
					height={30}
					width={30}
				/>
			</Link>
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
					<div className="leading-none text-md font-bold text-brand-dark-blue">
						{title}
					</div>
					<p className="line-clamp-2 text-sm leading-snug font-normal">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
