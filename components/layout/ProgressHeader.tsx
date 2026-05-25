'use client';

import { motion } from 'framer-motion';
import type { Step } from '@/data/types';

const Q_STEPS: Step[] = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'];

interface Props {
  step: Step;
}

export default function ProgressHeader({ step }: Props) {
  const qIdx = Q_STEPS.indexOf(step);
  const isQuestion = qIdx >= 0;
  const isResults = step === 'results';

  return (
    <header className="bg-bg px-4 pt-3 pb-2 shrink-0">
      <div className="flex items-center gap-3">
        {/* Logo + green dot */}
        <div className="shrink-0 flex items-center gap-1.5">
          <span className="font-display font-black text-[15px] leading-none tracking-[-0.04em] text-bone uppercase">
            Bones<br />Notícies
          </span>
          <div className="w-2 h-2 rounded-full bg-green self-start mt-0.5" />
        </div>

        {/* 8-segment bar */}
        <div className="flex-1 flex items-center gap-0.5">
          {Q_STEPS.map((_, i) => {
            const isDone   = isResults || i < qIdx;
            const isActive = isQuestion && i === qIdx;
            return (
              <motion.div
                key={i}
                className="flex-1 h-[3px] rounded-full origin-center"
                style={{
                  background: isActive
                    ? '#00ff00'
                    : isDone
                    ? 'rgba(236,233,233,0.45)'
                    : 'rgba(236,233,233,0.18)',
                }}
                animate={{ scaleY: isActive ? 1.4 : 1 }}
                transition={{ duration: 0.3 }}
              />
            );
          })}
        </div>

        {/* Counter */}
        <div className="shrink-0 text-right">
          {isQuestion ? (
            <span className="font-sans font-medium text-[12px] tracking-[0.06em] text-bone-dim tabular-nums">
              {qIdx + 1}<span className="text-bone-mute">/8</span>
            </span>
          ) : isResults ? (
            <div className="w-5 h-5 rounded-full bg-green flex items-center justify-center">
              <span className="text-[9px] font-black text-ink">✓</span>
            </div>
          ) : (
            <span className="w-10 block" />
          )}
        </div>
      </div>

      {/* Kicker */}
      {isQuestion && (
        <div className="flex items-center gap-2 mt-1.5">
          <div className="w-[18px] h-[2px] bg-green/60 shrink-0" />
          <span className="font-sans font-medium text-[10.5px] tracking-[0.22em] uppercase text-green/60">
            Pregunta {qIdx + 1} de 8
          </span>
        </div>
      )}
    </header>
  );
}
