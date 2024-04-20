"use client";

import { motion } from "framer-motion";

const variants = {
  initial: {
    opacity: 0,
    x: -100,
    filter: 'blur(5px)'
  },
  animate: (index: number) => ({
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
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
        key={JSON.stringify(item)}
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