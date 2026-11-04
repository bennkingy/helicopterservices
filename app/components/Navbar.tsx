import { getNavigation } from "@/lib/navigation";
import { getOpeningStatus } from "@/lib/opening-hours";
import { getClosures, getOpeningHours } from "@/lib/opening-hours-sanity";
import AccrediationsText from "./AccrediationsText";
import NavbarHeader from "./NavBarHeader";

export const revalidate = 30;

// Top of every page: the blue accreditation strip and the sticky header
// (logo, mega menu, phone, opening hours).
export default async function Navbar() {
	const [data, hours, closures] = await Promise.all([getNavigation(), getOpeningHours(), getClosures()]);
	// UK-time text for the page HTML, so it's there on first paint. OpenClosed
	// corrects it in the browser for the visitor's timezone and the current time.
	const initialStatus = getOpeningStatus(new Date(), { hours, closures });

	return (
		<>
			<AccrediationsText />
			<NavbarHeader menuData={data} hours={hours} closures={closures} initialStatus={initialStatus} />
		</>
	);
}
