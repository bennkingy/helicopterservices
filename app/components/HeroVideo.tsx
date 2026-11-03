"use client";

import { useEffect, useRef } from "react";

// The hero video only starts downloading after the page has finished loading,
// so it never competes with the poster image (the LCP element) for bandwidth.
// Until then the poster behind it is what the visitor sees.
export default function HeroVideo({ className }: { className?: string }) {
	const ref = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const video = ref.current;
		if (!video) return;

		const start = () => {
			const mobile = window.matchMedia("(max-width: 767px)").matches;
			video.src = mobile ? "/videos/heroVideo-mobile.mp4" : "/videos/heroVideo.mp4";
			video.play().catch(() => {
				// Autoplay blocked (e.g. low-power mode): the poster stays visible.
			});
		};
		const startWhenIdle = () => {
			if ("requestIdleCallback" in window) {
				window.requestIdleCallback(start, { timeout: 2000 });
			} else {
				setTimeout(start, 200);
			}
		};

		if (document.readyState === "complete") {
			startWhenIdle();
			return;
		}
		window.addEventListener("load", startWhenIdle, { once: true });
		return () => window.removeEventListener("load", startWhenIdle);
	}, []);

	return (
		<video
			ref={ref}
			loop
			muted
			playsInline
			preload="none"
			aria-hidden="true"
			className={className}
		/>
	);
}
