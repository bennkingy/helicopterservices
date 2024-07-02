"use client";

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
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import MobileMenu from "./MobileMenu";
// import TextLink from "./TextLink";

const fleet: {
	title: string;
	href: string;
	category: string;
	engine: string;
}[] = [
	{
		title: "A109",
		href: "/fleet/a109",
		category: "Agusta",
		engine: "Twin Engine",
		// description: "Versatile and high-performance twin-engine helicopter",
	},
	{
		title: "AS355",
		href: "/fleet/as355",
		category: "Agusta",
		engine: "Twin Engine",
		// description: "A a multi-purpose, twin-engine light helicopter",
	},
	{
		title: "AB206",
		href: "/fleet/ab206",
		category: "Agusta",
		engine: "Single Engine",
		// description:
		// 	"A light utility helicopter known for its reliability and versatility",
	},
	{
		title: "R66",
		href: "/fleet/r66",
		category: "Robinson",
		engine: "Single Engine",
		// description: "Some description about the R66",
	},
	{
		title: "R44",
		href: "/fleet/r44",
		engine: "Single Engine",
		category: "Robinson",
		// description: "Some description about the R44",
	},
	{
		title: "R22",
		href: "/fleet/r22",
		engine: "Single Engine",
		category: "Robinson",
		// description: "Some description about the R22",
	},
	{
		title: "Cabri G2",
		engine: "Single Engine",
		href: "/fleet/cabri-g2",
		category: "Guimbal",
		// description: "Some description about the Cabri G2",
	},
	{
		title: "AS350",
		href: "/fleet/as350",
		engine: "Single Engine",
		category: "Airbus",
		// description: "A single-engine light utility helicopter",
	},
	{
		title: "B206L",
		href: "/fleet/b206l",
		engine: "Single Engine",
		category: "Airbus",
		// description: "Some description about the B206L",
	},
	{
		title: "EC135",
		href: "/fleet/ec135",
		engine: "Single Engine",
		category: "Airbus",
		// description: "Some description about the EC135",
	},
	{
		title: "AW109",
		href: "/fleet/aw109",
		engine: "Twin Engine",
		category: "Airbus",
		// description: "Some description about the AW109",
	},
];

// @ts-ignore
export function NavMenu({
	menuData,
	onMobileOpen,
}: { onMobileOpen: () => void; menuData: any }) {
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
									{menuData?.menuData?.training
										.filter((component) => component.category?.licenses)
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
									{menuData?.menuData?.training
										.filter((component) => component.category?.flightRatings)
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
									{menuData?.menuData?.training
										.filter((component) => component.category?.simulators)
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
									{menuData?.menuData?.training
										.filter((component) => component.category?.other)
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
							<div className="w-[250px] h-[350px] ml-auto relative">
								<Image
									src="/images/nav-training.jpg"
									alt="industry"
									fill
									placeholder="blur"
									blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAECAIAAAArjXluAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAJUlEQVR4nGNgl1VlYONluPX/f/vS3QwNq7Y1z57OoObgpu7iAQCHQwoQq8g8EgAAAABJRU5ErkJggg=="
									priority
									quality={100}
									className="object-cover"
								/>
							</div>
							{/* <TextLink
									label="Comparison chart"
									className="mt-8 mb-0 absolute bottom-0 left-10"
									onClick={() => {}}
								/> */}
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
									{menuData?.menuData?.industry
										?.filter((component) => component.slug !== "industry")
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
							<div className="w-[500px] h-[200px] ml-auto relative">
								<Image
									src="/images/nav-industry.jpg"
									alt="industry"
									placeholder="blur"
									blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAIAAADwyuo0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAI0lEQVR4nGN49uzF7n1HM7Ny//37wcDJwsDJx+noJZWQpQIAueIK57IS+4IAAAAASUVORK5CYII="
									fill
									priority
									quality={100}
									className="object-cover"
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
									{menuData?.menuData?.flights
										.filter((component) => component.category?.flights)
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
									{menuData?.menuData?.flights
										.filter((component) => component.category?.tours)
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
							<div className="w-[500px] h-[310px] ml-auto relative">
								<Image
									src="https://cdn.sanity.io/images/0he7nz2b/production/60e72d0df6aa15d699ebce3c6b1a75790f1deafc-1024x685.webp"
									alt="industry"
									fill
									placeholder="blur"
									blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAAMklEQVR4nAEnANj/AFqe5KHQ/3rH/6/l/wBwsOZKcJS00fDr/f8AAAgFAAITGCUyAA4UygISgzsbSj4AAAAASUVORK5CYII="
									className="h-full object-cover"
									priority
									quality={100}
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
						<NavigationMenuContent className="flex rounded-none">
							{/* <div className="p-5"> */}
							<div className="p-7 pb-4">
								<p className="text-brand-light-blue">Single Engine</p>
								<ul className="grid mt-2">
									{fleet
										.filter((component) => component.engine === "Single Engine")
										.sort((a, b) => a.title.localeCompare(b.title))
										.slice(0, 4)
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
							<div className="p-7 pb-0 -ml-10">
								<p className="text-brand-light-blue">&nbsp;</p>
								<ul className="grid mt-2">
									{fleet
										.filter((component) => component.engine === "Single Engine")
										.sort((a, b) => a.title.localeCompare(b.title))
										.slice(4, 10)
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
							<div className="p-7 pb-0 max-w-[350px]">
								<p className="text-brand-light-blue">Twin Engine</p>
								<ul className="grid mt-2">
									{fleet
										.filter((component) => component.engine === "Twin Engine")
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
								</ul>{" "}
							</div>
							<div className="w-[300px] h-[200px] ml-auto relative">
								<Image
									src="/images/Heli006.jpg"
									alt="industry"
									fill
									priority
									quality={100}
									blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAAP0lEQVR4nAE0AMv/APL6/+Dp/9Tf/d/n/gCTmq+mrr+Fh5nO2fEAlJuVrrOuBQIAODs8ALasTL2vUbutTreqTpEEHq3vNREcAAAAAElFTkSuQmCC"
									placeholder="blur"
									className="object-cover"
								/>
							</div>
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
							<div className="w-[500px] h-[250px] relative">
								<Image
									src="/images/nav-copters.jpg"
									alt="flights"
									fill
									placeholder="blur"
									blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAIAAADwyuo0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAI0lEQVR4nGMw1lJxtDFlYWLg5uZmuH9k2/8/n69fvxUZEQcAXXwKOWElP7QAAAAASUVORK5CYII="
									className="h-full object-cover"
									priority
									quality={100}
								/>
							</div>
							<div className="p-7 pb-4 max-w-[250px]">
								<div className="ml-auto">
									<p className="text-brand-light-blue">About us</p>
									<ul className="grid mt-2">
										{menuData?.menuData?.about
											?.sort((a, b) => a?.title.localeCompare(b.title))
											.map((component) => (
												<ListItem
													key={component?.title}
													title={component?.title}
													href={component?.slug}
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
			<MobileMenu onMobileOpen={() => onMobileOpen()} />
			<Link href="tel:+44 1494513 166" className="">
				{/* <Icons.phone className="text-brand-light-blue" height={20} /> */}
				<Image
					priority
					src="/images/square-phone.svg"
					alt="phone"
					height={30}
					quality={100}
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
		<li className="group hover:text-brand-light-blue mt-2 cursor-pointer">
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
