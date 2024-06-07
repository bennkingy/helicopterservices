"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import Headroom from "headroom.js";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import logo from "/public/images/LogoDarkVNew.svg";
// import { ModeToggle } from "./ModeToggle";
import { NavMenu } from "./NavMenu";

export default function Navbar() {
	const path = usePathname();
	const isSmallMobile = useMediaQuery("(max-width: 400px)");
	const headerRef = useRef(null);

	useEffect(() => {
		if (headerRef.current) {
			const headroom = new Headroom(headerRef.current, {
				offset: path !== "/" && path !== "/about-us" ? 140 : 100,
				tolerance: {
					up: 0,
					down: 0,
				},
			});
			headroom.init();
		}
	}, []);

	return (
		<>
			{path !== "/" && path !== "/about-us" ? (
				<div
					className={cn(
						"topbar w-full bg-brand-dark-blue flex justify-center align-center items-center transition-all duration-500 ease-in-out h-[40px]",
					)}
				>
					<div
						className={cn(
							"relative h-[14px] sm:h-[24px] w-[14px] sm:w-[24px] min-w-[14px] min-h-[14px]",
						)}
					>
						<Image
							priority
							fill
							quality={100}
							src={"/images/check1.svg"}
							alt="img"
							className="w-full object-cover"
						/>
					</div>
					<p className="ml-1 sm:ml-2 text-white text-center font-workSans text-xs sm:text-base">
						{isSmallMobile
							? "UK CAA & EASA approved Training Organisation"
							: "A leading UK CAA and EASA approved Training Organisation"}
					</p>
				</div>
			) : null}
			<header
				ref={headerRef}
				className={cn(
					"w-full transition-all duration-300 delay-0 ease-in-out shadow-md",
					"h-[65px] sm:h-[100px]",
					"border-b-4 border-brand-light-blue bg-white flex",
				)}
			>
				<div
					className={cn("container flex items-center justify-between", "px-4")}
				>
					<Link
						href="/"
						className="font-mono text-lg font-bold start"
						data-test-id="logo"
					>
						<Image
							src={logo}
							priority
							quality={100}
							alt="Helicopter Services"
							width={181}
							className="w-[135px] sm:w-[181px] sm:h-[117px]"
						/>
					</Link>
					<NavMenu />
					<div className="absolute bottom-0 right-0 hidden sm:block">
						<svg
							className="h-6 w-6 text-brand-light-blue"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<polygon points="20 0 20 20 0 20" />
						</svg>
					</div>
				</div>
			</header>
		</>
	);
}
