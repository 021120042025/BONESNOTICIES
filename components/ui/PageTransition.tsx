'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  motionKey: string;
  direction?: 'forward' | 'back';
}

const variants = {
  enter: (dir: string) => ({
    x: dir === 'back' ? '-8%' : '8%',
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit:   (dir: string) => ({
    x: dir === 'back' ? '8%' : '-8%',
    opacity: 0,
  }),
};

export default function PageTransition({ children, motionKey, direction = 'forward' }: Props) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={motionKey}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col flex-1 min-h-0"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
