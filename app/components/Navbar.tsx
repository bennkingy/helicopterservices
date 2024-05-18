"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Headroom from "react-headroom";
import logo from "/public/images/LogoDarkVNew.svg";
// import { ModeToggle } from "./ModeToggle";
import { NavMenu } from "./NavMenu";

export default function Navbar() {
	const [isPinned, setIsPinned] = useState(false);
	const path = usePathname();
	const isSmallMobile = useMediaQuery("(max-width: 400px)");
	const isMobile = useMediaQuery("(max-width: 639px)");

	return (
		<Headroom
			downTolerance={10}
			onPin={() => setIsPinned(true)}
			upTolerance={0}
			onUnfix={() => setIsPinned(false)}
			style={{ zIndex: 5 }}
			calcHeightOnResize={true}
			disable={isMobile}
		>
			{path !== "/" && path !== "/about-us" && !isPinned ? (
				<div
					className={cn(
						"topbar w-full bg-brand-dark-blue flex justify-center align-center items-center transition-all duration-500 ease-in-out",
						!isPinned ? "h-[40px]" : "h-0",
					)}
				>
					<div className="relative h-[14px] sm:h-[24px] w-[14px] sm:w-[24px] min-w-[14px] min-h-[14px]">
						<Image
							priority
							fill
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
				className={cn(
					"w-full transition-all duration-300 ease-in-out shadow-md",
					isPinned ? "h-[65px] sm:h-[80px]" : "h-[65px] sm:h-[115px]",
					// "h-[65px] sm:h-[80px]",
					"border-b-4 border-brand-light-blue bg-white flex",
				)}
			>
				<div
					className={cn("container flex items-center justify-between", "px-4")}
				>
					<Link
						href="/"
						className="font-mono text-lg font-bold start"
						data-testId="logo"
					>
						<Image
							src={logo}
							alt="Helicopter Services"
							width={191}
							height={117}
							className="w-[135px] sm:w-[191px] sm:h-[117px]"
						/>
					</Link>
					<NavMenu />
					<div className="absolute bottom-0 right-0">
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
		</Headroom>
	);
}
