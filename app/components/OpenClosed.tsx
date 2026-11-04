"use client";

import { getOpeningStatus, type WeeklyHours } from "@/lib/opening-hours";
import { useEffect, useState } from "react";

interface OpenClosedProps {
	// Only affects UK visitors; times converted to another timezone always show am/pm.
	showPeriod?: boolean;
	// From Sanity via getOpeningHours(). Omitted = the built-in hours.
	hours?: WeeklyHours;
	// Closed dates from getClosures(). Omitted = Christmas Day and New Year's Day.
	closures?: string[];
	// UK-time text worked out on the server (Navbar), shown until the browser takes over.
	initialStatus?: string | null;
}

// "Open today 8:30am - 5:00pm" / "By appointment only today" in the header.
// The rules are always UK time; visitors elsewhere see the times converted to
// their own clock. Logic and its tests: lib/opening-hours.ts.
//
// The page HTML carries initialStatus so the text is there on first paint. It
// is built ahead of time and doesn't know the visitor's timezone, so it's worked
// out again in the browser after load. Refreshed on each new minute and when the
// tab comes back into view (browsers slow timers in background tabs).
export default function OpenClosed({ showPeriod = true, hours, closures, initialStatus = null }: OpenClosedProps) {
	const [status, setStatus] = useState<string | null>(initialStatus);

	useEffect(() => {
		const visitorTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
		const update = () => {
			try {
				setStatus(getOpeningStatus(new Date(), { hours, showPeriod, visitorTimeZone, closures }));
			} catch {
				setStatus(null); // never take the header down over this text
			}
		};
		update();

		// Line up with the clock so the text changes right at closing time.
		let interval: ReturnType<typeof setInterval> | undefined;
		const timeout = setTimeout(
			() => {
				update();
				interval = setInterval(update, 60_000);
			},
			60_000 - (Date.now() % 60_000),
		);
		const onVisible = () => {
			if (document.visibilityState === "visible") update();
		};
		document.addEventListener("visibilitychange", onVisible);

		return () => {
			clearTimeout(timeout);
			clearInterval(interval);
			document.removeEventListener("visibilitychange", onVisible);
		};
	}, [showPeriod, hours, closures]);

	return (
		<p className="font-workSans font-bold text-base sm:text-[11.5px] mt-1 text-brand-dark-blue h-6 leading-6 whitespace-nowrap">
			{status ?? " "}
		</p>
	);
}
