"use client";

import React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

const AccrediationsText = () => {
	const isSmallMobile = useMediaQuery("(max-width: 400px)");
	const path = usePathname();

	return (
		<>
			{path !== "/" && path !== "/about-us" ? (
				<div
					className={cn(
						"topbar w-full bg-brand-dark-blue flex justify-center align-center items-center transition-all duration-500 ease-in-out h-[40px] z-[1000000] relative",
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
		</>
	);
};

export default AccrediationsText;
