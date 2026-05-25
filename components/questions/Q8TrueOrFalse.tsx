'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Q8_MINI } from '@/data/quizData';
import type { Q8Answer } from '@/data/types';

interface Props {
  value: Q8Answer;
  onChange: (v: Q8Answer) => void;
}

export default function Q8TrueOrFalse({ value, onChange }: Props) {
  const [active, setActive] = useState(() => {
    const first = Q8_MINI.findIndex((_, i) => value[i] === undefined);
    return first === -1 ? 2 : first;
  });

  function handleVerdict(verdict: string) {
    const next = { ...value, [active]: verdict };
    onChange(next);
    const nextUnanswered = Q8_MINI.findIndex((_, i) => i > active && next[i] === undefined);
    if (nextUnanswered !== -1) {
      setTimeout(() => setActive(nextUnanswered), 400);
    }
  }

  const mini = Q8_MINI[active];

  return (
    <div className="space-y-3">
      {/* Progress dots */}
      <div className="flex gap-2">
        {Q8_MINI.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex-1 h-1.5 rounded-full transition-colors no-select ${
              i === active ? 'bg-ink' : value[i] !== undefined ? 'bg-green border border-ink' : 'bg-ink/20'
            }`}
          />
        ))}
      </div>

      {/* Statement card */}
      <div className="relative">
        {[2, 1].map(offset => (
          <div
            key={offset}
            className="absolute inset-x-0 bg-card border-2 border-ink/20 rounded-2xl"
            style={{
              top: `${offset * 6}px`,
              zIndex: 10 - offset,
              opacity: 0.45,
              transform: `scale(${1 - offset * 0.025})`,
              height: '140px',
            }}
          />
        ))}

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="relative z-20 bg-ink border-2 border-ink rounded-2xl overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-bone/10">
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-bone/40">
                Afirmació {active + 1} de {Q8_MINI.length}
              </span>
            </div>
            <div className="px-4 py-5">
              <p className="font-serif font-bold text-[17px] text-bone leading-snug text-center">
                &ldquo;{mini.statement}&rdquo;
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* VERITAT / FALS buttons */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        {(['VERITAT', 'FALS'] as const).map(verdict => {
          const selected = value[active] === verdict;
          const isVeritat = verdict === 'VERITAT';
          return (
            <motion.button
              key={verdict}
              onClick={() => handleVerdict(verdict)}
              whileTap={{ scale: 0.95 }}
              className={`py-4 rounded-2xl border-2 font-display font-black text-base tracking-widest transition-colors no-select ${
                selected
                  ? isVeritat
                    ? 'bg-green border-ink text-ink'
                    : 'bg-ink border-ink text-bone shadow-[inset_0_0_0_2px_#00ff00]'
                  : 'bg-card border-ink/20 text-ink hover:border-ink/50'
              }`}
            >
              {verdict}
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-between items-center pt-1">
        <button
          onClick={() => setActive(Math.max(0, active - 1))}
          disabled={active === 0}
          className="font-sans text-xs font-medium text-ink/50 disabled:opacity-30 no-select"
        >
          ← Anterior
        </button>
        <span className="font-sans text-xs font-medium text-ink/40 tabular-nums">
          {active + 1} / {Q8_MINI.length}
        </span>
        <button
          onClick={() => setActive(Math.min(Q8_MINI.length - 1, active + 1))}
          disabled={active === Q8_MINI.length - 1}
          className="font-sans text-xs font-medium text-ink/50 disabled:opacity-30 no-select"
        >
          Següent →
        </button>
      </div>
    </div>
  );
}
