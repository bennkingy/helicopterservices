"use client";

import { LazyMotion } from "framer-motion";
import type { ReactNode } from "react";

const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

// Wraps the site so Framer Motion's `m` components share one lazily loaded
// animation engine. `strict` makes a stray `motion.*` (which would pull the
// whole library back into the first load) throw in development.
export default function MotionProvider({ children }: { children: ReactNode }) {
	return (
		<LazyMotion features={loadFeatures} strict>
			{children}
		</LazyMotion>
	);
}
