'use client';

import { motion } from 'framer-motion';

interface Props {
  onPrev?: () => void;
  onNext: () => void;
  canGoBack?: boolean;
  canGoNext: boolean;
  answered?: number;
  total?: number;
  nextLabel?: string;
}

const pulseAnim = {
  boxShadow: [
    '0 0 0 0 rgba(0,255,0,0)',
    '0 0 0 10px rgba(0,255,0,0.16)',
    '0 0 0 0 rgba(0,255,0,0)',
  ],
};

export default function NavigationFooter({
  onPrev,
  canGoBack = true,
  onNext,
  canGoNext,
  answered,
  total,
}: Props) {
  return (
    <footer className="shrink-0 bg-light px-4 py-3 flex items-center gap-4">
      {/* Prev */}
      <motion.button
        onClick={canGoBack ? onPrev : undefined}
        whileTap={canGoBack ? { scale: 0.92 } : {}}
        className="w-[50px] h-[50px] rounded-full border-[1.5px] border-ink flex items-center justify-center text-ink text-lg no-select shrink-0"
        aria-label="Anterior"
      >
        ←
      </motion.button>

      {/* Counter */}
      <div className="flex-1 text-center">
        {typeof answered === 'number' && typeof total === 'number' && (
          <div className="flex items-baseline gap-1 justify-center">
            <span className="font-display font-black text-[18px] text-ink leading-none tabular-nums">
              {answered}
            </span>
            <span className="font-sans font-medium text-[10px] uppercase tracking-wider text-ink/50">
              /{total} Respostes
            </span>
          </div>
        )}
      </div>

      {/* Next */}
      <motion.button
        onClick={canGoNext ? onNext : undefined}
        whileTap={canGoNext ? { scale: 0.92 } : {}}
        className={`w-[50px] h-[50px] rounded-full flex items-center justify-center text-lg no-select shrink-0 font-bold ${
          canGoNext ? 'bg-green text-ink' : 'bg-ink text-bone/30'
        }`}
        animate={canGoNext ? pulseAnim : { boxShadow: '0 0 0 0 rgba(0,255,0,0)' }}
        transition={canGoNext ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } : {}}
        aria-label="Següent"
      >
        →
      </motion.button>
    </footer>
  );
}
