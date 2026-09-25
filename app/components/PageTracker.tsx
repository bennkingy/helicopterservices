"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Remembers the current and previous page for this browser tab, so the
// enquiry form can pre-select the service the visitor was just looking at.
export const CURRENT_PATH_KEY = "hs:currentPath";
export const PREVIOUS_PATH_KEY = "hs:previousPath";

const PageTracker = () => {
	const pathname = usePathname();

	useEffect(() => {
		try {
			const current = sessionStorage.getItem(CURRENT_PATH_KEY);
			if (current && current !== pathname) {
				sessionStorage.setItem(PREVIOUS_PATH_KEY, current);
			}
			sessionStorage.setItem(CURRENT_PATH_KEY, pathname);
		} catch {
			// Storage can be unavailable, for example in private browsing.
		}
	}, [pathname]);

	return null;
};

export default PageTracker;
