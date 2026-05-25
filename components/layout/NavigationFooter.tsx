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
    '0 0 0 10px rgba(0,255,0,0.18)',
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
  nextLabel,
}: Props) {
  return (
    <footer
      className="shrink-0 bg-light flex items-center gap-[8px] px-4"
      style={{
        borderTop: '1.5px solid #d4cecd',
        paddingTop: '0.75rem',
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.85rem)',
      }}
    >
      {/* Prev */}
      <motion.button
        onClick={canGoBack ? onPrev : undefined}
        whileTap={canGoBack ? { scale: 0.92 } : {}}
        disabled={!canGoBack}
        className="w-[46px] h-[46px] shrink-0 rounded-full flex items-center justify-center no-select transition-opacity"
        style={{ border: '1.5px solid #1a1410', opacity: canGoBack ? 1 : 0.2 }}
        aria-label="Anterior"
      >
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </motion.button>

      {/* Centre counter */}
      <div className="flex-1 text-center leading-[1.35]">
        {typeof answered === 'number' && typeof total === 'number' && (
          <>
            <span
              className="font-display font-black text-ink tabular-nums block"
              style={{ fontSize: '1rem' }}
            >
              {answered} / {total}
            </span>
            <span
              className="font-sans uppercase text-bone-mute block"
              style={{ fontSize: '0.58rem', letterSpacing: '0.1em' }}
            >
              {nextLabel ?? 'Respostes'}
            </span>
          </>
        )}
      </div>

      {/* Next */}
      <motion.button
        onClick={onNext}
        whileTap={{ scale: 0.92 }}
        className="w-[46px] h-[46px] shrink-0 rounded-full flex items-center justify-center no-select transition-colors duration-150"
        style={{ background: canGoNext ? '#00ff00' : '#1a1410' }}
        animate={canGoNext ? pulseAnim : { boxShadow: '0 0 0 0 rgba(0,255,0,0)' }}
        transition={canGoNext ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } : {}}
        aria-label="Següent"
      >
        <svg
          width="18"
          height="18"
          fill="none"
          stroke={canGoNext ? '#1a1410' : '#ece9e9'}
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </motion.button>
    </footer>
  );
}
