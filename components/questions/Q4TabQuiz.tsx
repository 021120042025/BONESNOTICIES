'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Q4_MINI } from '@/data/quizData';
import type { Q4Answer } from '@/data/types';

interface Props {
  value: Q4Answer;
  onChange: (v: Q4Answer) => void;
}

export default function Q4TabQuiz({ value, onChange }: Props) {
  const [active, setActive] = useState(() => {
    const first = Q4_MINI.findIndex((_, i) => value[i] === undefined);
    return first === -1 ? 2 : first;
  });

  function handleSelect(option: string) {
    const next = { ...value, [active]: option };
    onChange(next);
    const nextUnanswered = Q4_MINI.findIndex((_, i) => i > active && next[i] === undefined);
    if (nextUnanswered !== -1) {
      setTimeout(() => setActive(nextUnanswered), 350);
    }
  }

  const mini = Q4_MINI[active];

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {Q4_MINI.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex-1 h-1.5 rounded-full transition-colors no-select ${
              i === active ? 'bg-ink' : value[i] !== undefined ? 'bg-green border border-ink' : 'bg-ink/20'
            }`}
          />
        ))}
      </div>

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
              height: '200px',
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
            className="relative z-20 bg-card border-2 border-ink/20 rounded-2xl overflow-hidden shadow-[0_2px_12px_-4px_rgba(26,20,16,0.12)]"
          >
            <div className="bg-ink px-4 py-3">
              <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-bone/70">
                Sistema electoral · {active + 1} de {Q4_MINI.length}
              </span>
            </div>

            <div className="p-4">
              <p className="font-serif text-[15px] text-ink leading-snug mb-4">
                {mini.question}
              </p>

              <div className="space-y-2">
                {mini.options.map(opt => {
                  const selected = value[active] === opt;
                  return (
                    <motion.button
                      key={opt}
                      onClick={() => handleSelect(opt)}
                      whileTap={{ scale: 0.97 }}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 font-sans font-semibold text-[14px] transition-colors no-select ${
                        selected
                          ? 'bg-green border-ink text-ink'
                          : 'bg-light border-ink/20 text-ink hover:border-ink/50'
                      }`}
                    >
                      {opt}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
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
          {active + 1} / {Q4_MINI.length}
        </span>
        <button
          onClick={() => setActive(Math.min(Q4_MINI.length - 1, active + 1))}
          disabled={active === Q4_MINI.length - 1}
          className="font-sans text-xs font-medium text-ink/50 disabled:opacity-30 no-select"
        >
          Següent →
        </button>
      </div>
    </div>
  );
}
