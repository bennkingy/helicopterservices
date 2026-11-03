import { getNavigation } from "@/lib/navigation";
import { getOpeningHours } from "@/lib/opening-hours-sanity";
import AccrediationsText from "./AccrediationsText";
import NavbarHeader from "./NavBarHeader";

export const revalidate = 30;

// Top of every page: the blue accreditation strip and the sticky header
// (logo, mega menu, phone, opening hours).
export default async function Navbar() {
	const [data, hours] = await Promise.all([getNavigation(), getOpeningHours()]);

	return (
		<>
			<AccrediationsText />
			<NavbarHeader menuData={data} hours={hours} />
		</>
	);
}
