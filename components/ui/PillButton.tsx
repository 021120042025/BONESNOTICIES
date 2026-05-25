'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function PillButton({ children, selected, disabled, onClick, className = '' }: Props) {
  const base = 'relative inline-flex items-center justify-center px-4 py-3 rounded-full font-display font-[800] text-[16px] leading-tight tracking-[-0.01em] transition-colors duration-150 no-select cursor-pointer min-h-[52px]';

  const states = selected
    ? 'bg-green text-ink shadow-[0_0_0_2px_#1a1410,0_6px_18px_-6px_rgba(0,255,0,0.5)]'
    : disabled
    ? 'bg-card text-ink/30 cursor-not-allowed shadow-[0_2px_0_rgba(26,20,16,0.06),0_4px_14px_-6px_rgba(26,20,16,0.18)]'
    : 'bg-card text-ink shadow-[0_2px_0_rgba(26,20,16,0.06),0_4px_14px_-6px_rgba(26,20,16,0.18)] hover:brightness-95';

  return (
    <motion.button
      onClick={disabled ? undefined : onClick}
      whileTap={disabled ? {} : { scale: 0.96 }}
      className={`${base} ${states} ${className}`}
    >
      {children}
    </motion.button>
  );
}
