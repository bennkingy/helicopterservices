"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const variants = {
	initial: {
		opacity: 0,
		transform: "translateX(-40%)",
		filter: "blur(5px)",
		willChange: "transform, opacity, filter",
	},
	animate: (index: number) => ({
		opacity: 1,
		transform: "translateX(0px)",
		filter: "blur(0px)",
		transition: {
			duration: 1,
			ease: "easeInOut",
			delay: 0.3 * index,
		},
	}),
};

const FramerAnimationSlideIn = ({ items }: { items: Array<any> }) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	return (
		<div ref={ref} className="flex flex-col justify-center gap-2">
			{items.map((item, index) => (
				<motion.div
					key={index}
					variants={variants}
					initial="initial"
					animate={isInView && "animate"}
					custom={index}
					className="flex items-center justify-center"
				>
					{item}
				</motion.div>
			))}
		</div>
	);
};

export default FramerAnimationSlideIn;
