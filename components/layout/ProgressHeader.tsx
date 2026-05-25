'use client';

import { motion } from 'framer-motion';
import type { Step } from '@/data/types';

const Q_STEPS: Step[] = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'];

interface Props {
  step: Step;
}

export default function ProgressHeader({ step }: Props) {
  const qIdx       = Q_STEPS.indexOf(step);
  const isQuestion = qIdx >= 0;
  const isResults  = step === 'results';

  return (
    <header className="bg-bg px-5 pt-3 pb-2 shrink-0">
      {/* Row 1: brand | progress strip | counter */}
      <div className="flex items-center gap-3">

        {/* Logo */}
        <div className="shrink-0 flex items-center gap-[5px]">
          <span
            className="font-display font-black text-bone uppercase leading-none"
            style={{ fontSize: '1.1rem', letterSpacing: '-0.02em' }}
          >
            Bones Notícies
          </span>
          <div className="w-2 h-2 rounded-full bg-green self-start mt-0.5" />
        </div>

        {/* 8-segment strip */}
        <div className="flex-1 flex items-center gap-[5px]">
          {Q_STEPS.map((_, i) => {
            const isDone   = isResults || i < qIdx;
            const isActive = isQuestion && i === qIdx;
            return (
              <motion.div
                key={i}
                className="flex-1 h-[4px] rounded-full origin-center"
                style={{
                  background: isActive
                    ? '#00ff00'
                    : isDone
                    ? 'rgba(255,255,255,0.40)'
                    : 'rgba(255,255,255,0.15)',
                }}
                animate={{ scaleY: isActive ? 1.8 : 1 }}
                transition={{ duration: 0.25 }}
              />
            );
          })}
        </div>

        {/* Counter */}
        <div className="shrink-0">
          {isQuestion ? (
            <span
              className="font-sans text-bone-dim tabular-nums"
              style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}
            >
              {qIdx + 1} / 8
            </span>
          ) : isResults ? (
            <div className="w-5 h-5 rounded-full bg-green flex items-center justify-center">
              <span className="text-[9px] font-black text-ink">✓</span>
            </div>
          ) : null}
        </div>
      </div>

      {/* Row 2 (question only): green dash + muted label */}
      {isQuestion && (
        <div className="flex items-center gap-[8px] mt-[7px]">
          <div className="w-4 h-[1.5px] rounded-full bg-green shrink-0" />
          <span
            className="font-sans uppercase text-bone/30"
            style={{ fontSize: '0.55rem', letterSpacing: '0.14em' }}
          >
            Pregunta {qIdx + 1} de 8
          </span>
        </div>
      )}
    </header>
  );
}
