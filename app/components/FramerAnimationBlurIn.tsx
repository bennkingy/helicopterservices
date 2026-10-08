"use client";

import { motion } from "framer-motion";

const FramerAnimationBlurIn = ({ delay = 0.25, className, children }: any) => {
	return (
		<motion.div
			initial={{
				// Not 0: Chrome ignores fully transparent elements as LCP candidates,
				// and this wraps the page h1s, so LCP would wait for the animation.
				opacity: 0.01,
				filter: "blur(4px)",
				willChange: "filter, opacity",
			}}
			whileInView={{ opacity: 1, filter: "blur(0px)" }}
			transition={{ duration: 1, delay }}
			viewport={{ once: true }}
			className={`${className}`}
		>
			{children}
		</motion.div>
	);
};

export default FramerAnimationBlurIn;
