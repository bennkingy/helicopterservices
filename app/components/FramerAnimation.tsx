'use client'

import { motion } from 'framer-motion';

const FramerAnimation = ({ delay = 1, className, children }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1, delay }}
      viewport={{ once: true }}
      className={`${className}`}
    >
      {children}
    </motion.div>
  )
}

export default FramerAnimation