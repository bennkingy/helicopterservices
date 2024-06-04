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
import { usePathname } from "next/navigation";
import * as React from "react";

const training: {
	title: string;
	href: string;
	description: string;
	category: string;
}[] = [
	{
		title: "Private pilot license",
		category: "Licenses",
		href: "/training/private-pilot-licence",
		description: "Fly helicopters privately with a private pilot license.",
	},
	{
		title: "Commerical Pilot License",
		category: "Licenses",
		href: "/training/commercial-pilot-licence",
		description: "Fly for a living and get paid to do the job you love!",
	},
	{
		title: "Flight examiner rating",
		href: "/training/flight-examiner-ratings",
		category: "FlightRatings",
		description:
			"Helicopter flight examiners hold a lot of responsibility, setting the standards across the industry and ensuring that they are maintained.",
	},
	{
		title: "Type rating",
		href: "/training/type-ratings",
		category: "FlightRatings",
		description:
			"Putting you near the top of the ladder throughout the helicopter industry.",
	},
	{
		title: "Instrument rating",
		href: "/training/instrument-ratings",
		category: "FlightRatings",
		description:
			"The ultimate way to see London, one of the most famous cities in the world.",
	},
	{
		title: "Flight instructor rating",
		category: "FlightRatings",
		href: "/training/flight-instructor-ratings",
		description:
			"Allows you to fly helicopters under IFR down to a decision height of 200ft.",
	},
	{
		title: "Night rating",
		category: "FlightRatings",
		href: "/training/night-rating",
		description: "This add-on for your licence is a exciting challenge",
	},
	{
		title: "PBN",
		href: "/training/PBN",
		category: "Other",
		description: "Improving aircraft navigation with precision and efficiency.",
	},
	{
		title: "Virtual Reality Simulator",
		href: "/training/virtual-reality-simulator",
		category: "Simulators",
		description:
			"An incredibly realistic experience allowing for all flight profiles.",
	},
	{
		title: "Simulator",
		category: "Simulators",
		href: "/training/simulator",
		description:
			"Developing safe instrument flying skills, reducing costs, and enabling progress.",
	},
	{
		title: "ELCAS",
		category: "Other",
		href: "/training/ELCAS",
		description: "ELCAS approved training provider for military personnel.",
	},
	{
		title: "FAA",
		category: "Other",
		href: "/training/FAA",
		description:
			"Helicopter Services can train and maintain pilots under the FAA.",
	},
	{
		title: "Refresher seminars",
		category: "Other",
		href: "/training/refresher-seminars",
		description: "Expert Instructor and Examiner Seminars.",
	},
	{
		title: "Advanced flying programme",
		category: "Other",
		href: "/training/advanced-flying-programme",
		description:
			"Develop your skills while you expand your practical flying adventures.",
	},
];

const flights: {
	title: string;
	href: string;
	description: string;
	category: string;
}[] = [
	{
		title: "Airpot transfers",
		category: "Flights",
		href: "/flights/airport-transfers",
		description: "Your luxury airport transfer service.",
	},
	{
		title: "Helicopter Charter",
		category: "Flights",
		href: "/flights/helicopter-charter",
		description: "Transporting VIPs to special events for over 20 years.",
	},
	{
		title: "London sightseeing",
		category: "Tours",
		href: "/flights/london-sightseeing",
		description: "Unrivalled views of the most famous city in the world.",
	},
	{
		title: "Special events",
		category: "Flights",
		href: "/flights/special-events",
		description:
			"Private charters for weddings, tours, and celebrations, ensuring excellent service.",
	},
	{
		title: "Trail lessons",
		category: "Flights",
		href: "/flights/trail-lessons",
		description: "Discover the fun and manoeuvrability of a helicopter!",
	},
	{
		title: "Local area tours",
		category: "Tours",
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

const fleet: { title: string; href: string; category: string }[] = [
	{
		title: "A109",
		href: "/fleet/a109",
		category: "Agusta",
		// description: "Versatile and high-performance twin-engine helicopter.",
	},
	{
		title: "AS355",
		href: "/fleet/as355",
		category: "Agusta",
		// description: "A a multi-purpose, twin-engine light helicopter.",
	},
	{
		title: "AB206",
		href: "/fleet/ab206",
		category: "Agusta",
		// description:
		// 	"A light utility helicopter known for its reliability and versatility.",
	},
	{
		title: "R66",
		href: "/fleet/r66",
		category: "Robinson",
		// description: "Some description about the R66.",
	},
	{
		title: "R44",
		href: "/fleet/r44",
		category: "Robinson",
		// description: "Some description about the R44.",
	},
	{
		title: "R22",
		href: "/fleet/r22",
		category: "Robinson",
		// description: "Some description about the R22.",
	},
	{
		title: "Cabri G2",
		href: "/fleet/cabri-g2",
		category: "Guimbal",
		// description: "Some description about the Cabri G2.",
	},
	{
		title: "AS350",
		href: "/fleet/as350",
		category: "Airbus",
		// description: "A single-engine light utility helicopter.",
	},
	{
		title: "B206L",
		href: "/fleet/b206l",
		category: "Airbus",
		// description: "Some description about the B206L.",
	},
	{
		title: "EC135",
		href: "/fleet/ec135",
		category: "Airbus",
		// description: "Some description about the EC135.",
	},
	{
		title: "AW109",
		href: "/fleet/aw109",
		category: "Airbus",
		// description: "Some description about the AW109.",
	},
];

export function NavMenu() {
	const path = usePathname();

	return (
		<>
			<NavigationMenu className="hidden md:block font-workSans font-semibold text-brand-dark-blue">
				<NavigationMenuList>
					<NavigationMenuItem className="hidden lg:block" id="home">
						<Link href="/" legacyBehavior passHref className="text-lg">
							<NavigationMenuLink
								className={cn(
									navigationMenuTriggerStyle(),
									path === "/" && "bg-accent text-accent-foreground",
								)}
							>
								<span className="hover:text-brand-light-blue">Home</span>
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger
							className={cn(
								path.startsWith("/training") &&
									"bg-accent text-accent-foreground",
							)}
						>
							<a href="/training" className="hover:text-brand-light-blue">
								Training
							</a>
						</NavigationMenuTrigger>
						<NavigationMenuContent className="flex rounded-none">
							{/* <div className="p-5"> */}
							<div className="p-7 pb-4 max-w-[250px]">
								<p className="text-brand-light-blue">Licenses</p>
								<ul className="grid mt-2">
									{training
										.filter((component) => component.category === "Licenses")
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
								<p className="text-brand-light-blue mt-5">Flight ratings</p>
								<ul className="grid mt-2">
									{training
										.filter(
											(component) => component.category === "FlightRatings",
										)
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
							</div>
							<div className="p-7 pb-0 max-w-[350px]">
								<p className="text-brand-light-blue">Simulators</p>
								<ul className="grid mt-2">
									{training
										.filter((component) => component.category === "Simulators")
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
								<p className="text-brand-light-blue mt-5">
									Other training services
								</p>
								<ul className="grid mt-2">
									{training
										.filter((component) => component.category === "Other")
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
							</div>
							{/* </div> */}
							<div className="w-[250px] h-full ml-auto">
								<Image
									src="/images/helciopter-caves.jpg"
									alt="industry"
									width={250}
									height={400}
									className="h-full"
								/>
							</div>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger
							className={cn(
								path.startsWith("/industry") &&
									"bg-accent text-accent-foreground",
							)}
						>
							<a href="/industry" className="hover:text-brand-light-blue">
								Industry
							</a>
						</NavigationMenuTrigger>
						<NavigationMenuContent className="flex">
							<div className="p-7 pb-4 max-w-[250px]">
								<p className="text-brand-light-blue">Industry</p>
								<ul className="grid mt-2">
									<ListItem href="/industry/load-lifting" title="Load lifting">
										{/* Resolve many load lifting challenges with our range of load
									lifting services. */}
									</ListItem>
									<ListItem
										href="/industry/photography-filming"
										title="Photography and filming"
									>
										{/* Getting the best shots for companies, such as BBC, ITV, Sky,
									Channel 4. */}
									</ListItem>
								</ul>
							</div>
							<div className="w-[500px] h-[200px] ml-auto">
								<Image
									src="/images/helciopter-caves.jpg"
									alt="industry"
									width={500}
									height={200}
									className="h-full object-fill"
								/>
							</div>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger
							className={cn(
								path.startsWith("/flights") &&
									"bg-accent text-accent-foreground",
							)}
						>
							<a href="/flights" className="hover:text-brand-light-blue">
								Flights
							</a>
						</NavigationMenuTrigger>
						<NavigationMenuContent className="flex">
							<div className="p-7 pb-4 max-w-[250px]">
								<p className="text-brand-light-blue">Flights</p>
								<ul className="grid mt-2">
									{flights
										.filter((component) => component.category === "Flights")
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
								<p className="text-brand-light-blue mt-5">Tours</p>
								<ul className="grid mt-2">
									{flights
										.filter((component) => component.category === "Tours")
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
							</div>
							<div className="w-[500px] h-[310px] ml-auto">
								<Image
									src="/images/helciopter-caves.jpg"
									alt="industry"
									width={500}
									height={310}
									className="h-full object-fill"
								/>
							</div>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem className="hidden lg:block">
						<NavigationMenuTrigger
							className={cn(
								path.startsWith("/fleet") && "bg-accent text-accent-foreground",
							)}
						>
							<a href="/fleet" className="hover:text-brand-light-blue">
								Fleet
							</a>
						</NavigationMenuTrigger>
						<NavigationMenuContent className="flex">
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
						<NavigationMenuTrigger
							className={cn(
								path.startsWith("/about-us") &&
									"bg-accent text-accent-foreground",
							)}
						>
							<a href="/about-us" className="hover:text-brand-light-blue">
								About us
							</a>
						</NavigationMenuTrigger>
						<NavigationMenuContent className="flex">
							<div className="w-[500px] h-[200px]">
								<Image
									src="/images/helciopter-caves.jpg"
									alt="industry"
									width={500}
									height={200}
									className="h-full object-fill"
								/>
							</div>
							<div className="p-7 pb-4 max-w-[250px]">
								<div className="ml-auto">
									<p className="text-brand-light-blue">About us</p>
									<ul className="grid mt-2">
										{about
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
								</div>
							</div>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem id="enquire">
						<Link href="/enquire" legacyBehavior passHref>
							<NavigationMenuLink
								className={cn(
									navigationMenuTriggerStyle(),
									path === "/enquire" && "bg-accent text-accent-foreground",
								)}
							>
								<span className="hover:text-brand-light-blue">Enquire</span>
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
			<div className="flex visible md:hidden ml-auto">
				<Drawer direction="right">
					<DrawerTrigger
						className="mr-3 flex font-semibold text-black"
						name="menu"
					>
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
		<li className="group hover:text-brand-light-blue mt-2">
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"hover:text-brand-light-blue font-openSans block select-none space-y-1 rounded-md p-0 leading-none no-underline outline-none transition-colors",
						className,
					)}
					{...props}
				>
					<div className="leading-none text-base text-brand-dark-blue hover:text-brand-light-blue font-openSans">
						{title}
					</div>
					<p className="line-clamp-2 text-sm leading-snug font-normal text-base">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
