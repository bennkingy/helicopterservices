"use client";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { AnimatePresence, motion } from "framer-motion";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const menus = {
	main: [
		{ name: "Home", href: "/" },
		{ name: "Training", href: "/training", submenu: "trainingMenu" },
		{ name: "Industry", href: "/industry", submenu: "industryMenu" },
		{ name: "Flights", href: "/flights", submenu: "flightsMenu" },
		{ name: "Fleet", href: "/fleet", submenu: "fleetMenu" },
		{ name: "About us", href: "/about-us", submenu: "aboutMenu" },
		{ name: "Enquire", href: "/enquire" },
	],
	trainingMenu: [
		{ name: "Back", href: "#", isBack: true },
		{ name: "Private pilot license", href: "/training/private-pilot-licence" },
		{
			name: "Commerical Pilot License",
			href: "/training/commercial-pilot-licence",
		},
		{
			name: "Flight examiner rating",
			href: "/training/flight-examiner-ratings",
		},
		{ name: "Type rating", href: "/training/type-ratings" },
		{ name: "Instrument rating", href: "/training/instrument-ratings" },
		{
			name: "Flight instructor rating",
			href: "/training/flight-instructor-ratings",
		},
		{ name: "Night rating", href: "/training/night-rating" },
		{ name: "PBN", href: "/training/PBN" },
		{
			name: "Virtual Reality Simulator",
			href: "/training/virtual-reality-simulator",
		},
		{ name: "Simulator", href: "/training/simulator" },
		{ name: "ELCAS", href: "/training/ELCAS" },
		{ name: "FAA", href: "/training/FAA" },
		{ name: "Refresher seminars", href: "/training/refresher-seminars" },
		{
			name: "Advanced flying programme",
			href: "/training/advanced-flying-programme",
		},
	],
	industryMenu: [
		{ name: "Back", href: "#", isBack: true },
		{ name: "Load lifting", href: "/industry/load-lifting" },
		{ name: "Photography and filming", href: "/industry/photography-filming" },
	],
	flightsMenu: [
		{ name: "Back", href: "#", isBack: true },
		{ name: "Airport transfers", href: "/flights/airport-transfers" },
		{ name: "Helicopter Charter", href: "/flights/helicopter-charter" },
		{ name: "London sightseeing", href: "/flights/london-sightseeing" },
		{ name: "Special events", href: "/flights/special-events" },
		{ name: "Trail lessons", href: "/flights/trail-lessons" },
		{ name: "Local area tours", href: "/flights/local-area-tours" },
	],
	fleetMenu: [
		{ name: "Back", href: "#", isBack: true },
		{ name: "A109", href: "/fleet/a109" },
		{ name: "AS355", href: "/fleet/as355" },
		{ name: "AB206", href: "/fleet/ab206" },
		{ name: "R66", href: "/fleet/r66" },
		{ name: "R44", href: "/fleet/r44" },
		{ name: "R22", href: "/fleet/r22" },
		{ name: "Cabri G2", href: "/fleet/cabri-g2" },
		{ name: "AS350", href: "/fleet/as350" },
		{ name: "B206L", href: "/fleet/b206l" },
		{ name: "EC135", href: "/fleet/ec135" },
		{ name: "AW109", href: "/fleet/aw109" },
	],
	aboutMenu: [
		{ name: "Back", href: "#", isBack: true },
		{ name: "Meet the team", href: "/about-us/meet-the-team" },
		{ name: "Helicopter fleet", href: "/fleet" },
		{ name: "The Hanger", href: "/about-us/the-hanger" },
		{ name: "FAQs", href: "/about-us/faqs" },
	],
};

// @ts-ignore
const MobileMenu = ({ onMobileOpen }: { onMobileOpen: () => void }) => {
	const [activeMenu, setActiveMenu] = useState("main");
	const [menuOpen, setMenuOpen] = useState(false);

	// const isSmallMobile = useMediaQuery("(max-width: 400px)");

	const pathname = usePathname();
	useEffect(() => {
		// hide sidebar on path change
		setMenuOpen(false);
		setActiveMenu("main");
	}, [pathname]);

	// @ts-ignore
	const handleMenuClick = (e, submenu) => {
		e.preventDefault();
		setActiveMenu(submenu);
	};

	// @ts-ignore
	const handleBackClick = (e) => {
		e.preventDefault();
		setActiveMenu("main");
	};

	// useEffect(() => {
	// 	const handleResize = () => {
	// 		if (window.innerWidth > 767 && menuOpen) {
	// 			setMenuOpen(!menuOpen);
	// 		}
	// 	};

	// 	// Attach resize event listener
	// 	window.addEventListener("resize", handleResize);

	// 	// Clean up event listener on component unmount
	// 	return () => {
	// 		window.removeEventListener("resize", handleResize);
	// 	};
	// }, [menuOpen]);

	const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent);

	return (
		<div className="flex visible md:hidden ml-auto">
			<Drawer
				direction="right"
				open={menuOpen}
				dismissible={false}
				onClose={() => {
					setMenuOpen(false);
					setActiveMenu("main");
				}}
				fixed
				disablePreventScroll
				onDrag={() => console.log("dragging")}
			>
				<DrawerTrigger
					className="mr-3 flex font-semibold text-black"
					aria-label="Open navigation menu"
				>
					{/* Menu */}
					<MenuIcon
						size={30}
						onClick={() => {
							isIOS() && window.scrollTo(0, 0);
							setTimeout(() => {
								setMenuOpen(true);
							}, 10);
						}}
					/>
				</DrawerTrigger>
				{/* {createPortal( */}
				<DrawerContent
					className="h-full ml-20 z-50 overflow-hidden"
					onInteractOutside={(e) => {
						e.preventDefault();
						setMenuOpen(false);
					}}
				>
					<AnimatePresence>
						<motion.ul
							key={activeMenu}
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -100 }}
							transition={{ duration: 0.3 }}
							className="z-[60] absolute top-0 font-openSans text-brand-light-blue font-bold w-full h-full overflow-y-scroll"
						>
							{
								// @ts-ignore
								menus[activeMenu].map((item, index) => (
									<li className="py-3 border-b pl-3" key={index}>
										{item.isBack ? (
											<a href="#" onClick={handleBackClick}>
												{item.name}
											</a>
										) : item.submenu ? (
											<a
												href={item.href}
												onClick={(e) => {
													handleMenuClick(e, item.submenu);
												}}
											>
												{item.name}
											</a>
										) : (
											<Link href={item.href} passHref className="w-full block">
												{item.name}
											</Link>
										)}
									</li>
								))
							}
							<div className="flex items-start flex-col pl-3 mt-3 pb-3">
								<p className="text-brand-dark-blue">Enquire now</p>
								<a
									className="text-lg font-bold mt-0 hover:underline underline-offset-2 text-brand-orange"
									href="tel:+441494513166"
								>
									+44 1494 513 166
								</a>
							</div>
						</motion.ul>
					</AnimatePresence>
				</DrawerContent>
				{/* document.body,
				)} */}
			</Drawer>
		</div>
	);
};

export default MobileMenu;
