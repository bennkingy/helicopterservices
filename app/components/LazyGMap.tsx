"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// The Google Maps script is heavy, so it only loads once the map is about to
// scroll into view.
const GMap = dynamic(() => import("./GMap"), { ssr: false });

const LazyGMap = ({ className = "" }: { className?: string }) => {
	const ref = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const element = ref.current;
		if (!element || visible) return;
		if (!("IntersectionObserver" in window)) {
			setVisible(true);
			return;
		}
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					setVisible(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "400px" },
		);
		observer.observe(element);
		return () => observer.disconnect();
	}, [visible]);

	return (
		<div ref={ref} className={`w-full ${className}`}>
			{visible ? (
				<GMap />
			) : (
				// Same square shape as the map, so nothing shifts when it loads.
				<div className="w-full aspect-square bg-brand-light-grey" />
			)}
		</div>
	);
};

export default LazyGMap;
