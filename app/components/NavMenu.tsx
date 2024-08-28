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
import { hoverStore } from "@/store/hoverStore";
// @ts-ignore
import { useStore } from "@nanostores/react";
import OpenClosed from "./OpenClosed";
// const fleet: {
// 	title: string;
// 	slug: string;
// 	category: string;
// 	engine: string;
// 	shortTitle?: string;
// }[] = [
// 	{
// 		title: "A109",
// 		slug: "/fleet/a109",
// 		category: "Agusta",
// 		engine: "Twin Engine",
// 		// description: "Versatile and high-performance twin-engine helicopter",
// 	},
// 	{
// 		title: "AS355",
// 		slug: "/fleet/as355",
// 		category: "Agusta",
// 		engine: "Twin Engine",
// 		// description: "A a multi-purpose, twin-engine light helicopter",
// 	},
// 	{
// 		title: "AB206",
// 		slug: "/fleet/ab206",
// 		category: "Agusta",
// 		engine: "Single Engine",
// 		// description:
// 		// 	"A light utility helicopter known for its reliability and versatility",
// 	},
// 	{
// 		title: "R66",
// 		slug: "/fleet/r66",
// 		category: "Robinson",
// 		engine: "Single Engine",
// 		// description: "Some description about the R66",
// 	},
// 	{
// 		title: "R44",
// 		slug: "/fleet/r44",
// 		engine: "Single Engine",
// 		category: "Robinson",
// 		// description: "Some description about the R44",
// 	},
// 	{
// 		title: "R22",
// 		slug: "/fleet/r22",
// 		engine: "Single Engine",
// 		category: "Robinson",
// 		// description: "Some description about the R22",
// 	},
// 	{
// 		title: "Cabri G2",
// 		engine: "Single Engine",
// 		slug: "/fleet/cabri-g2",
// 		category: "Guimbal",
// 		// description: "Some description about the Cabri G2",
// 	},
// 	{
// 		title: "AS350",
// 		slug: "/fleet/as350",
// 		engine: "Single Engine",
// 		category: "Airbus",
// 		// description: "A single-engine light utility helicopter",
// 	},
// 	{
// 		title: "B206L",
// 		slug: "/fleet/b206l",
// 		engine: "Single Engine",
// 		category: "Airbus",
// 		// description: "Some description about the B206L",
// 	},
// 	{
// 		title: "EC135",
// 		slug: "/fleet/ec135",
// 		engine: "Single Engine",
// 		category: "Airbus",
// 		// description: "Some description about the EC135",
// 	},
// 	{
// 		title: "AW109",
// 		slug: "/fleet/aw109",
// 		engine: "Twin Engine",
// 		category: "Airbus",
// 		// description: "Some description about the AW109",
// 	},
// ];

// @ts-ignore
export function NavMenu({
	menuData,
	onMobileOpen,
}: { onMobileOpen: () => void; menuData: any }) {
	const path = usePathname();
	const isHovered = useStore(hoverStore);

	React.useEffect(() => {
		if (isHovered) {
			const overlayDiv = document.createElement("div");
			overlayDiv.id = "hover-overlay";
			overlayDiv.style.position = "fixed";
			overlayDiv.style.top = "0";
			overlayDiv.style.left = "0";
			overlayDiv.style.width = "100vw";
			overlayDiv.style.height = "100vh";
			overlayDiv.style.zIndex = "9";
			overlayDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
			overlayDiv.style.backdropFilter = "blur(9px)";
			document.body.appendChild(overlayDiv);
		} else {
			const overlayDiv = document.getElementById("hover-overlay");
			if (overlayDiv) {
				document.body.removeChild(overlayDiv);
			}
		}

		return () => {
			const overlayDiv = document.getElementById("hover-overlay");
			if (overlayDiv) {
				document.body.removeChild(overlayDiv);
			}
		};
	}, [isHovered, path]);

	React.useEffect(() => {
		// If the path changes, remove the overlay
		const overlayDiv = document.getElementById("hover-overlay");
		if (overlayDiv) {
			document.body.removeChild(overlayDiv);
		}
	}, [path]);

	return (
		<>
			<NavigationMenu
				className="hidden md:block font-workSans font-semibold text-brand-dark-blue"
				id="header"
			>
				<NavigationMenuList>
					<NavigationMenuItem className="hidden xl:block" id="home">
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
							<Link href="/training" className="hover:text-brand-light-blue">
								Training
							</Link>
						</NavigationMenuTrigger>
						<NavigationMenuContent className="flex rounded-none">
							{/* <div className="p-5"> */}
							<div className="p-7 max-w-[300px]">
								<p className="text-brand-light-blue">Licences</p>
								<ul className="grid mt-2">
									{menuData?.menuData?.training
										// @ts-ignore
										.filter((component) => component.category?.licenses)
										// @ts-ignore
										.sort((a, b) => a.title.localeCompare(b.title))
										// @ts-ignore
										.map((component) => (
											<ListItem
												key={component.title}
												title={
													component?.shortTitle
														? component?.shortTitle
														: component.title
												}
												href={`/training/${component.slug}`}
											>
												{/* {component.description} */}
											</ListItem>
										))}
								</ul>
								<p className="text-brand-light-blue mt-5">Flight ratings</p>
								<ul className="grid mt-2">
									{/* // @ts-ignore */}
									{menuData?.menuData?.training
										// @ts-ignore
										.filter((component) => component.category?.flightRatings)
										// @ts-ignore
										.sort((a, b) => a.title.localeCompare(b.title))
										// @ts-ignore
										.map((component) => (
											<ListItem
												key={component.title}
												title={
													component?.shortTitle
														? component?.shortTitle
														: component.title
												}
												href={`/training/${component.slug}`}
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
										// @ts-ignore
										.filter((component) => component.category?.simulators)
										// @ts-ignore
										.sort((a, b) => a.title.localeCompare(b.title))
										// @ts-ignore
										.map((component) => (
											<ListItem
												key={component.title}
												title={
													component?.shortTitle
														? component?.shortTitle
														: component.title
												}
												href={`/training/${component.slug}`}
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
										// @ts-ignore
										.filter((component) => component.category?.other)
										// @ts-ignore
										.sort((a, b) => a.title.localeCompare(b.title))
										// @ts-ignore
										.map((component) => (
											<ListItem
												key={component.title}
												title={
													component?.shortTitle
														? component?.shortTitle
														: component.title
												}
												href={`/training/${component.slug}`}
											>
												{/* {component.description} */}
											</ListItem>
										))}
								</ul>
							</div>
							{/* </div> */}
							<div className="w-[250px] h-auto  ml-auto relative">
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
							<Link href="/industry" className="hover:text-brand-light-blue">
								Industry
							</Link>
						</NavigationMenuTrigger>
						<NavigationMenuContent className="flex">
							<div className="p-7 max-w-[250px]">
								<p className="text-brand-light-blue">Industry</p>
								<ul className="grid mt-2">
									{menuData?.menuData?.industry
										// @ts-ignore
										?.filter((component) => component.slug !== "industry")
										// @ts-ignore
										.sort((a, b) => a.title.localeCompare(b.title))
										// @ts-ignore
										.map((component) => (
											<ListItem
												key={component.title}
												title={
													component?.shortTitle
														? component?.shortTitle
														: component.title
												}
												href={`/industry/${component.slug}`}
											>
												{/* {component.description} */}
											</ListItem>
										))}
								</ul>
							</div>
							<div className="w-[500px] h-auto ml-auto relative">
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
							<Link href="/flights" className="hover:text-brand-light-blue">
								Flights
							</Link>
						</NavigationMenuTrigger>
						<NavigationMenuContent className="flex">
							<div className="p-7 max-w-[250px]">
								<p className="text-brand-light-blue">Flights</p>
								<ul className="grid mt-2">
									{menuData?.menuData?.flights
										// @ts-ignore
										.filter((component) => component.category?.flights)
										// @ts-ignore
										.sort((a, b) => a.title.localeCompare(b.title))
										// @ts-ignore
										.map((component) => (
											<ListItem
												key={component.title}
												title={
													component?.shortTitle
														? component?.shortTitle
														: component.title
												}
												href={`/flights/${component.slug}`}
											>
												{/* {component.description} */}
											</ListItem>
										))}
								</ul>
								<p className="text-brand-light-blue mt-5">Tours</p>
								<ul className="grid mt-2">
									{menuData?.menuData?.flights
										// @ts-ignore
										.filter((component) => component.category?.tours)
										// @ts-ignore
										.sort((a, b) => a.title.localeCompare(b.title))
										// @ts-ignore
										.map((component) => (
											<ListItem
												key={component.title}
												title={
													component?.shortTitle
														? component?.shortTitle
														: component.title
												}
												href={`/flights/${component.slug}`}
											>
												{/* {component.description} */}
											</ListItem>
										))}
								</ul>
							</div>
							<div className="w-[500px] h-auto ml-auto relative">
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
					<NavigationMenuItem className="hidden 2xl:block">
						<NavigationMenuTrigger
							className={cn(
								path.startsWith("/fleet") && "bg-accent text-accent-foreground",
							)}
						>
							<Link href="/fleet" className="hover:text-brand-light-blue">
								Fleet
							</Link>
						</NavigationMenuTrigger>
						<NavigationMenuContent className="flex rounded-none">
							{/* <div className="p-5"> */}
							<div className="p-7">
								<p className="text-brand-light-blue">Single Engine</p>
								<ul className="grid mt-2">
									{menuData?.menuData?.fleet
										.filter((component) => component.engineType === "Single")
										.sort((a, b) => a.title.localeCompare(b.title))
										.slice(0, 4)
										.map((component) => (
											<ListItem
												key={component.title}
												title={
													component?.shortTitle
														? component?.shortTitle
														: component.title
												}
												href={"/fleet/" + component.slug}
											>
												{/* {component.description} */}
											</ListItem>
										))}
								</ul>
							</div>
							<div className="p-7 pb-0 -ml-10">
								<p className="text-brand-light-blue">&nbsp;</p>
								<ul className="grid mt-2">
									{menuData?.menuData?.fleet
										?.filter((component) => component.engineType === "Single")
										.sort((a, b) => a.title.localeCompare(b.title))
										.slice(4, 10)
										.map((component) => (
											<ListItem
												key={component.title}
												title={
													component?.shortTitle
														? component?.shortTitle
														: component.title
												}
												href={"/fleet/" + component.slug}
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
									{menuData?.menuData?.fleet
										?.filter((component) => component.engineType === "Twin")
										.sort((a, b) => a.title.localeCompare(b.title))
										.map((component) => (
											<ListItem
												key={component.title}
												title={
													component?.shortTitle
														? component?.shortTitle
														: component.title
												}
												href={"/fleet/" + component.slug}
											>
												{/* {component.description} */}
											</ListItem>
										))}
								</ul>{" "}
							</div>
							<div className="w-[300px] h-auto  ml-auto relative">
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
							<Link href="/about-us" className="hover:text-brand-light-blue">
								About us
							</Link>
						</NavigationMenuTrigger>
						<NavigationMenuContent className="flex">
							<div className="w-[500px] h-auto relative">
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
							<div className="p-7 max-w-[250px]">
								<div className="ml-auto">
									<p className="text-brand-light-blue">About us</p>
									<ul className="grid mt-2">
										{menuData?.menuData?.about
											// @ts-ignore
											.sort((a, b) => a?.title.localeCompare(b.title))
											// @ts-ignore
											.map((component) => (
												<ListItem
													key={component?.title}
													title={component?.title}
													href={`/about-us/${component.slug}`}
												>
													{/* {component.description} */}
												</ListItem>
											))}
										<ListItem
											key={"Our Fleet"}
											title={"Our Helicopter Fleet"}
											href={"/fleet"}
										>
											{/* {component.description} */}
										</ListItem>
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
			<MobileMenu menuData={menuData} onMobileOpen={() => onMobileOpen()} />
			<div className="flex flex-col">
				<Link
					href="tel:+441494513166"
					className="text-md font-openSans text-brand-orange group"
				>
					<div className="flex justify-center">
						<Image
							priority
							src="/images/phone-orange.svg"
							alt="phone"
							height={20}
							quality={100}
							width={20}
							className="mr-2"
						/>
						<p className="font-workSans font-bold text-base text-[#545454] hidden lg:block  group-hover:text-brand-orange  transition-all duration-300 ease-in-out">
							+44 1494 513 166
						</p>
					</div>
				</Link>
				<div className="hidden lg:block text-center">
					<OpenClosed showPeriod={false} />
				</div>
			</div>
		</>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li className="group hover:text-brand-light-blue mt-1 cursor-pointer">
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"hover:text-brand-light-blue font-openSans block select-none space-y-1 rounded-md p-0 leading-none no-underline outline-none transition-colors",
						className,
					)}
					{...props}
				>
					<div className="leading-[23px] text-base text-brand-dark-blue hover:text-brand-light-blue font-openSans">
						{title}
					</div>
					<p className="line-clamp-2 leading-snug font-normal text-base">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
