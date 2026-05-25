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
      className="shrink-0 bg-light"
      style={{
        paddingTop: '14px',
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 18px)',
        paddingLeft: '18px',
        paddingRight: '18px',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: '12px',
        flexShrink: 0,
      }}
    >
      {/* Prev */}
      <motion.button
        onClick={canGoBack ? onPrev : undefined}
        whileTap={canGoBack ? { scale: 0.92 } : {}}
        disabled={!canGoBack}
        aria-label="Enrere"
        style={{
          justifySelf: 'start',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'transparent',
          color: '#1a1410',
          border: '1.5px solid #1a1410',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: canGoBack ? 'pointer' : 'default',
          opacity: canGoBack ? 1 : 0.35,
          transition: 'opacity 260ms',
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </motion.button>

      {/* Centre counter */}
      <div style={{ textAlign: 'center', userSelect: 'none' }}>
        {typeof answered === 'number' && typeof total === 'number' && (
          <>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: '18px',
                letterSpacing: '-0.005em',
                lineHeight: 1,
                color: '#1a1410',
              }}
            >
              {answered} / {total}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                fontSize: '10px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(26,20,16,0.5)',
                marginTop: '6px',
              }}
            >
              {nextLabel ?? 'Respostes'}
            </div>
          </>
        )}
      </div>

      {/* Next */}
      <motion.button
        onClick={onNext}
        whileTap={{ scale: 0.92 }}
        aria-label="Següent"
        animate={canGoNext
          ? { boxShadow: ['0 0 0 0 rgba(0,255,0,0), 0 4px 10px -4px rgba(0,255,0,0.45)', '0 0 0 10px rgba(0,255,0,0.18), 0 4px 14px -4px rgba(0,255,0,0.5)', '0 0 0 0 rgba(0,255,0,0), 0 4px 10px -4px rgba(0,255,0,0.45)'] }
          : { boxShadow: '0 4px 10px -4px rgba(26,20,16,0.4)' }
        }
        transition={canGoNext ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } : {}}
        style={{
          justifySelf: 'end',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: canGoNext ? '#00ff00' : '#1a1410',
          color: canGoNext ? '#1a1410' : '#ece9e9',
          border: 0,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'background 260ms, color 260ms',
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </motion.button>
    </footer>
  );
}
