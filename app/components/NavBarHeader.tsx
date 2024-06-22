"use client";

import { cn } from "@/lib/utils";
import Headroom from "headroom.js";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import logo from "/public/images/LogoDarkVNew.svg";
// import { ModeToggle } from "./ModeToggle";
import { NavMenu } from "./NavMenu";

export default function NavbarHeader(menuData: any) {
	const path = usePathname();
	const headerRef = useRef(null);
	const headroomRef = useRef(null);

	useEffect(() => {
		if (headerRef.current) {
			const headroomInstance = new Headroom(headerRef.current, {
				offset: path !== "/" && path !== "/about-us" ? 140 : 100,
				tolerance: {
					up: 0,
					down: 0,
				},
			});
			headroomInstance.init();
			// @ts-ignore
			headroomRef.current = headroomInstance;
		}
	}, [path]);

	console.log(menuData);

	return (
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
				{/* @ts-ignore */}
				<NavMenu menuData={menuData} />
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
	);
}
