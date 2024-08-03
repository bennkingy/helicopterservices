// @ts-nocheck

"use client";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { AnimatePresence, motion } from "framer-motion";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Icons } from "@/components/ui/icons";

const initialMenus = {
	main: [
		{ title: "Home", slug: "/" },
		{ title: "Training", slug: "/training", submenu: "trainingMenu" },
		{ title: "Industry", slug: "/industry", submenu: "industryMenu" },
		{ title: "Flights", slug: "/flights", submenu: "flightsMenu" },
		{ title: "Fleet", slug: "/fleet", submenu: "fleetMenu" },
		{ title: "About us", slug: "/about-us", submenu: "aboutMenu" },
		{ title: "Enquire", slug: "/enquire" },
	],
	trainingMenu: [
		{ title: "Back", slug: "#", isBack: true },
		{ title: "View all Training Sersices", slug: "/training", viewAll: true },
	],
	industryMenu: [
		{ title: "Back", slug: "#", isBack: true },
		{ title: "View all Indstry Servsces", slug: "/industry", viewAll: true },
	],
	flightsMenu: [
		{ title: "Back", slug: "#", isBack: true },
		{ title: "View all Flights Servsces", slug: "/flights", viewAll: true },
	],
	fleetMenu: [
		{ title: "Back", slug: "#", isBack: true },
		{ title: "View all Fleet Helicosters", slug: "/fleet", viewAll: true },
	],
	aboutMenu: [
		{ title: "Back", slug: "#", isBack: true },
		{ title: "About us", slug: "/about-us", viewAll: false },
	],
};

const MobileMenu = ({
	onMobileOpen,
	menuData,
}: { onMobileOpen: () => void; menuData: any }) => {
	const [activeMenu, setActiveMenu] = useState("main");
	const [menuOpen, setMenuOpen] = useState(false);
	const [menufromCMS, setMenufromCMS] = useState(initialMenus);

	useEffect(() => {
		if (menuData) {
			const formattedData = menuData.menuData;
			const updatedMenus = { ...initialMenus };

			const updateMenuItems = (menuName, items) => {
				const menuItems = items.map((item: any) => ({
					title: item.title,
					slug: `/${menuName === "about" ? "about-us" : menuName}/${item.slug}`,
				}));

				updatedMenus[`${menuName}Menu`] = [
					{ title: "Back", slug: "#", isBack: true },
					...menuItems,
					{
						title: `${
							menuName !== "about"
								? `All ${menuName} ${menuName !== "fleet" && "services"}`
								: `${menuName} Us`
						}`,
						slug: `/${menuName === "about" ? "about-us" : menuName}`,
						isViewAll: menuName !== "about",
					},
				];
			};

			// Update the menus with data from CMS
			if (formattedData.training) {
				updateMenuItems(
					"training",
					formattedData.training.filter(
						(item) => item.title.toLowerCase() !== "training",
					),
				);
			}
			if (formattedData.industry) {
				updateMenuItems(
					"industry",
					formattedData.industry.filter(
						(item) => item.title.toLowerCase() !== "industry",
					),
				);
			}
			if (formattedData.flights) {
				updateMenuItems(
					"flights",
					formattedData.flights.filter(
						(item) => item.title.toLowerCase() !== "flights",
					),
				);
			}
			if (formattedData.fleet) {
				updateMenuItems("fleet", formattedData.fleet);
			}
			if (formattedData.about) {
				updateMenuItems("about", formattedData.about);
			}

			setMenufromCMS(updatedMenus);
		}
	}, [menuData]);

	const pathname = usePathname();
	useEffect(() => {
		// hide sidebar on path change
		setMenuOpen(false);
		setActiveMenu("main");
	}, [pathname]);

	const handleMenuClick = useCallback((e, submenu) => {
		e.preventDefault();
		setActiveMenu(submenu);
	}, []);

	const checkIfOnThisPage = (slug) => {
		if (pathname === slug) {
			setMenuOpen(false);
		}
	};

	const handleBackClick = useCallback((e) => {
		e.preventDefault();
		setActiveMenu("main");
	}, []);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 767 && menuOpen) {
				setMenuOpen(false);
			}
		};

		const debounceResize = debounce(handleResize, 200);

		// Attach resize event listener
		window.addEventListener("resize", debounceResize);

		// Clean up event listener on component unmount
		return () => {
			window.removeEventListener("resize", debounceResize);
		};
	}, [menuOpen]);

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
			>
				<DrawerTrigger
					className="mr-3 flex font-semibold text-black"
					aria-label="Open navigation menu"
				>
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
				<DrawerContent
					className="h-full ml-20 z-50 overflow-hidden"
					onInteractOutside={(e) => {
						e.preventDefault();
						setMenuOpen(false);
					}}
				>
					<AnimatePresence>
						{/* {activeMenu !== "main" && ( */}
						<div className="h-[50px] w-full bg-gray-100 text-xl flex items-center justify-center font-bold capitalize">
							{activeMenu === "main" ? "Home" : activeMenu.replace("Menu", "")}
						</div>
						{/* )} */}
						<motion.ul
							key={activeMenu}
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -100 }}
							transition={{ duration: 0.3 }}
							className="mobile-ul z-[60] absolute top-[50px] font-openSans text-brand-dark-blue font-bold w-full overflow-y-scroll h-full pb-[52px]"
						>
							{menufromCMS[activeMenu].map((item, index) => (
								<li
									className={`border-b border-gray-100 hover:text-brand-light-blue ${
										item.isViewAll ? "text-brand-dark-blue" : ""
									}`}
									key={item.title + (index + 1)}
								>
									{item.isBack ? (
										<Link
											href="#"
											onClick={handleBackClick}
											className="py-3 pl-[7px] w-full flex items-center"
										>
											<Icons.chevronLeft size={20} />
											{item.title}
										</Link>
									) : item.submenu ? (
										<Link
											passHref
											className="w-full flex items-center py-3 pl-3 justify-between"
											href={item.slug}
											onClick={(e) => handleMenuClick(e, item.submenu)}
										>
											{item.title}
											<Icons.chevronRight size={20} className="mr-2" />
										</Link>
									) : (
										<Link
											href={item.slug}
											passHref
											onClick={() => checkIfOnThisPage(item.slug)}
											className="w-full flex items-center justify-between py-3 pl-3"
										>
											{item.title}
											{/* {item.isViewAll && (
												<Icons.chevronRight size={20} className="mr-2" />
											)} */}
										</Link>
									)}
								</li>
							))}
							{activeMenu === "main" && (
								<div className="flex items-start flex-col pl-3 mt-3 pb-3">
									{/* <p className="text-brand-dark-blue">Enquire now</p> */}
									<a
										className="text-xl font-bold mt-0 hover:underline underline-offset-2 text-brand-orange"
										href="tel:+441494513166"
									>
										+44 1494 513 166
									</a>
								</div>
							)}
						</motion.ul>
					</AnimatePresence>
				</DrawerContent>
			</Drawer>
		</div>
	);
};

export default MobileMenu;

// Helper function to debounce resize events
function debounce(func, wait) {
	let timeout;
	return function (...args) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), wait);
	};
}
