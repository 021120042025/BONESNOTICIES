'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Q6_STATEMENTS, Q6_PARTIES } from '@/data/quizData';
import type { Q6Answer } from '@/data/types';

interface Props {
  value: Q6Answer;
  onChange: (v: Q6Answer) => void;
}

export default function Q6PoliticalPosition({ value, onChange }: Props) {
  const [activeIdx, setActiveIdx] = useState(() => {
    const first = Q6_STATEMENTS.findIndex(s => value[s.id] === undefined);
    return first === -1 ? Q6_STATEMENTS.length - 1 : first;
  });

  const activeStmt = Q6_STATEMENTS[activeIdx];

  const usedByOthers = Q6_STATEMENTS
    .filter((_, i) => i !== activeIdx)
    .map(s => value[s.id])
    .filter(Boolean) as string[];

  function handleSelect(party: string) {
    const next = { ...value };
    // Swap: remove from wherever else this party was assigned
    const existingKey = Object.keys(next).find(k => next[k] === party);
    if (existingKey) delete next[existingKey];
    // Toggle
    if (value[activeStmt.id] === party) {
      delete next[activeStmt.id];
    } else {
      next[activeStmt.id] = party;
      // Auto-advance to next unanswered
      const nextUnanswered = Q6_STATEMENTS.findIndex((s, i) => i > activeIdx && next[s.id] === undefined);
      if (nextUnanswered !== -1) {
        setTimeout(() => setActiveIdx(nextUnanswered), 380);
      }
    }
    onChange(next);
  }

  return (
    <div className="space-y-3">
      {/* Sub-progress strip */}
      <div className="flex gap-1.5">
        {Q6_STATEMENTS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActiveIdx(i)}
            className={`flex-1 h-1.5 rounded-full transition-colors no-select ${
              i === activeIdx
                ? 'bg-ink'
                : value[s.id] !== undefined
                ? 'bg-green border border-ink'
                : 'bg-ink/20'
            }`}
          />
        ))}
      </div>

      {/* Stacked deck */}
      <div className="relative">
        {/* Back cards */}
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

        {/* Active card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="relative z-20 bg-card border-2 border-ink/20 rounded-2xl overflow-hidden shadow-[0_2px_12px_-4px_rgba(26,20,16,0.12)]"
          >
            {/* Card header */}
            <div className="bg-ink px-4 py-3 flex items-center gap-2">
              <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-bone/70">
                Habitatge · Afirmació {activeIdx + 1} de {Q6_STATEMENTS.length}
              </span>
            </div>

            {/* Statement */}
            <div className="px-4 pt-4 pb-3">
              <p className="font-serif text-[15px] text-ink leading-snug">
                {activeStmt.text}
              </p>
            </div>

            {/* Party pills */}
            <div className="px-4 pb-4 flex flex-wrap gap-2">
              {Q6_PARTIES.map(party => {
                const isSelected = value[activeStmt.id] === party;
                const isUsed = !isSelected && usedByOthers.includes(party);
                return (
                  <motion.button
                    key={party}
                    onClick={() => handleSelect(party)}
                    whileTap={isUsed ? {} : { scale: 0.94 }}
                    className={`px-3 py-2 rounded-full border-2 font-sans font-semibold text-[12px] transition-colors no-select ${
                      isSelected
                        ? 'bg-green border-ink text-ink'
                        : isUsed
                        ? 'bg-light border-ink/10 text-ink/25 cursor-not-allowed'
                        : 'bg-light border-ink/30 text-ink hover:border-ink'
                    }`}
                  >
                    {party}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mini-nav */}
      <div className="flex justify-between items-center pt-1">
        <button
          onClick={() => setActiveIdx(Math.max(0, activeIdx - 1))}
          disabled={activeIdx === 0}
          className="font-sans text-xs font-medium text-ink/50 disabled:opacity-30 no-select"
        >
          ← Anterior
        </button>
        <span className="font-sans text-xs font-medium text-ink/40 tabular-nums">
          {activeIdx + 1} / {Q6_STATEMENTS.length}
        </span>
        <button
          onClick={() => setActiveIdx(Math.min(Q6_STATEMENTS.length - 1, activeIdx + 1))}
          disabled={activeIdx === Q6_STATEMENTS.length - 1}
          className="font-sans text-xs font-medium text-ink/50 disabled:opacity-30 no-select"
        >
          Següent →
        </button>
      </div>
    </div>
  );
}
