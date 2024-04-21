"use client";

import { motion } from "framer-motion";

const variants = {
  initial: {
    opacity: 0,
    transform: 'translateX(-150px)',
    // filter: 'blur(5px)'
  },
  animate: (index: number) => ({
    opacity: 1,
    transform: 'translateX(0px)',
    // filter: 'blur(0px)',
    transition: {
      duration: 1,
      ease: 'easeInOut',
      delay: 0.3 * index,
    }
  })
};

const FramerAnimationSlideIn = ({ items }: any) => {
  return (
    // @ts-ignore
    items.map((item, index) => (
      <motion.div
        variants={variants}
        initial="initial"
        whileInView="animate"
        key={item.src}
        viewport={{
          once: true,
        }}
        custom={index}
      >
        {item}
      </motion.div>
    )))
}

export default FramerAnimationSlideIn;