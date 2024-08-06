//ts-nocheck
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { AnimatePresence, motion } from "framer-motion";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type SetStateAction, useCallback, useEffect, useState } from "react";
import { Icons } from "@/components/ui/icons";
import Image from "next/image";

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
	trainingMenu: [],
	industryMenu: [],
	flightsMenu: [],
	fleetMenu: [],
	aboutMenu: [{ title: "About us", slug: "/about-us", viewAll: false }],
};

const MobileMenu = ({ onMobileOpen, menuData }: any) => {
	const [activeMenu, setActiveMenu] = useState("main");
	const [menuOpen, setMenuOpen] = useState(false);
	const [menufromCMS, setMenufromCMS] = useState(initialMenus);

	useEffect(() => {
		if (menuData) {
			const formattedData = menuData.menuData;
			const updatedMenus = { ...initialMenus };
			// @ts-ignore
			const updateMenuItems = (menuName, items) => {
				// @ts-ignore
				const menuItems = items.map((item) => ({
					title: item.title,
					slug: `/${menuName === "about" ? "about-us" : menuName}/${item.slug}`,
				}));

				// @ts-ignore
				updatedMenus[`${menuName}Menu`] = [...menuItems];
			};

			if (formattedData.training) {
				const trainingCategories = {
					licenses: [],
					flightRatings: [],
					simulators: [],
					other: [],
				};
				// biome-ignore lint/complexity/noForEach: <explanation>
				formattedData.training.forEach((item: any) => {
					const category = item.category;
					if (category) {
						if (category.licenses) trainingCategories.licenses.push(item);
						if (category.flightRatings)
							trainingCategories.flightRatings.push(item);
						if (category.simulators) trainingCategories.simulators.push(item);
						if (category.other) trainingCategories.other.push(item);
					}
				});

				const sortItems = (a, b) => a.title.localeCompare(b.title);

				updatedMenus.trainingMenu = [
					{ title: "Licenses", slug: "#", isCategoryTitle: true },
					...trainingCategories.licenses.sort(sortItems).map((item) => ({
						title: item.title,
						slug: `/training/${item.slug}`,
					})),
					{ title: "Flight Ratings", slug: "#", isCategoryTitle: true },
					...trainingCategories.flightRatings.sort(sortItems).map((item) => ({
						title: item.title,
						slug: `/training/${item.slug}`,
					})),
					{ title: "Simulators", slug: "#", isCategoryTitle: true },
					...trainingCategories.simulators.sort(sortItems).map((item) => ({
						title: item.title,
						slug: `/training/${item.slug}`,
					})),
					{ title: "Other", slug: "#", isCategoryTitle: true },
					...trainingCategories.other.sort(sortItems).map((item) => ({
						title: item.title,
						slug: `/training/${item.slug}`,
					})),
				];
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
				const flightCategories = {
					flights: [],
					tours: [],
				};

				formattedData.flights.forEach((item) => {
					const category = item.category;
					if (category) {
						if (category.flights) flightCategories.flights.push(item);
						if (category.tours) flightCategories.tours.push(item);
					}
				});

				const sortItems = (a, b) => a.title.localeCompare(b.title);

				updatedMenus.flightsMenu = [
					{ title: "Flights", slug: "#", isCategoryTitle: true },
					...flightCategories.flights.sort(sortItems).map((item) => ({
						title: item.title,
						slug: `/flights/${item.slug}`,
					})),
					{ title: "Tours", slug: "#", isCategoryTitle: true },
					...flightCategories.tours.sort(sortItems).map((item) => ({
						title: item.title,
						slug: `/flights/${item.slug}`,
					})),
				];
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
		setMenuOpen(false);
		setActiveMenu("main");
	}, [pathname]);

	const handleMenuClick = useCallback(
		(e: { preventDefault: () => void }, submenu: SetStateAction<string>) => {
			e.preventDefault();
			setActiveMenu(submenu);
		},
		[],
	);

	const checkIfOnThisPage = (slug: string) => {
		if (pathname === slug) {
			setMenuOpen(false);
		}
	};

	const handleBackClick = useCallback((e: { preventDefault: () => void }) => {
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

		window.addEventListener("resize", debounceResize);

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
						<div className="h-[50px] w-full bg-gray-50 text-xl text-brand-light-blue flex items-center justify-center font-bold capitalize">
							{activeMenu !== "main" && (
								<Link
									href="#"
									onClick={handleBackClick}
									className="absolute left-4 py-3 flex items-center"
								>
									<Icons.chevronLeft
										size={20}
										className="text-brand-dark-blue"
									/>
								</Link>
							)}
							{activeMenu === "main" ? "Home" : activeMenu.replace("Menu", "")}
						</div>
						<motion.ul
							key={activeMenu}
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -100 }}
							transition={{ duration: 0.3 }}
							className="mobile-ul z-[60] absolute top-[50px] font-openSans text-brand-dark-blue font-bold w-full overflow-y-scroll h-full pb-[52px]"
						>
							{
								// @ts-ignore
								menufromCMS[activeMenu].map((item, index) => (
									<li
										className={`  ${
											item.isViewAll ? "text-brand-dark-blue" : ""
										} ${item.isCategoryTitle ? "text-gray-500" : "pb-0"}`}
										key={item.title + (index + 1)}
									>
										{item.isCategoryTitle ? (
											<div className="pt-3 pb-0 pl-3 text-gray-500 text-sm uppercase">
												{item.title}
											</div>
										) : item.submenu ? (
											<Link
												passHref
												className="w-full flex items-center py-0 pl-3 justify-between"
												href={item.slug}
											>
												{item.title}
												{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
												<div
													className="px-3 py-3"
													onClick={(e) => handleMenuClick(e, item.submenu)}
												>
													<Icons.chevronRight size={20} className="" />
												</div>
											</Link>
										) : (
											<Link
												href={item.slug}
												passHref
												onClick={() => checkIfOnThisPage(item.slug)}
												className="w-full flex items-center justify-between py-3 pl-3"
											>
												{item.title}
											</Link>
										)}
									</li>
								))
							}
							{activeMenu === "main" && (
								<>
									<div className="flex items-center pl-3 mt-3 pb-3">
										<Icons.phone
											className="text-brand-orange mr-1"
											height={22}
										/>
										<Link
											href="tel:+441494513166"
											className="text-xl font-bold mt-0 text-brand-orange"
										>
											+44 1494 513 166
										</Link>
									</div>
								</>
							)}
						</motion.ul>
						{/* <Image
							src="/images/approvals.svg"
							alt="Helicopter Services"
							width={250}
							quality={100}
							height={100}
							className="mt-12 ml-3 pl-[2px] absolute bottom-0 mb-[16px]"
							placeholder="blur"
							blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABCAYAAAD5PA/NAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAGklEQVR4nGNgELI6zcBmdIbBNuHMs3//TwMAKT4HM0/7dVEAAAAASUVORK5CYII="
						/> */}
					</AnimatePresence>
				</DrawerContent>
			</Drawer>
		</div>
	);
};

export default MobileMenu;

function debounce(func: { (): void; apply?: any }, wait: number | undefined) {
	// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
	let timeout: any;
	return function (...args: any) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), wait);
	};
}
