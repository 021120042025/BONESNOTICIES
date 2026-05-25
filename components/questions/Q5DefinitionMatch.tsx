'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Q5_TERMS, Q5_DEFINITIONS } from '@/data/quizData';
import type { Q5Answer } from '@/data/types';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface Props {
  value: Q5Answer;
  onChange: (v: Q5Answer) => void;
}

export default function Q5DefinitionMatch({ value, onChange }: Props) {
  const [shuffledDefs] = useState(() => shuffle(Q5_DEFINITIONS));
  const [pendingTerm, setPendingTerm] = useState<string | null>(null);

  const matchedTerms  = Object.keys(value);
  const matchedDefIds = Object.values(value);
  const pairs         = matchedTerms.map(term => ({ term, defId: value[term] }));

  function handleTerm(term: string) {
    if (matchedTerms.includes(term)) return;
    if (pendingTerm === term) { setPendingTerm(null); return; }
    setPendingTerm(term);
  }

  function handleDef(defId: string) {
    if (matchedDefIds.includes(defId)) return;
    if (!pendingTerm) return;
    onChange({ ...value, [pendingTerm]: defId });
    setPendingTerm(null);
  }

  function removeMatch(term: string) {
    const next = { ...value };
    delete next[term];
    onChange(next);
  }

  const getDefText = (id: string) =>
    Q5_DEFINITIONS.find(d => d.id === id)?.text ?? '';

  return (
    <div className="flex flex-col gap-3">

      {/* ── Status hint ────────────────────────────────────────────── */}
      <div className="relative h-[18px] overflow-hidden">
        <AnimatePresence mode="wait">
          {pendingTerm ? (
            <motion.div
              key="pending"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 flex items-center gap-2"
            >
              <div className="w-[7px] h-[7px] rounded-full bg-green shrink-0" />
              <span className="font-display font-[800] text-[12px] text-ink leading-none">
                &ldquo;{pendingTerm}&rdquo;
              </span>
              <span className="font-sans text-[11px] text-ink/45 leading-none">
                — ara tria la definició
              </span>
            </motion.div>
          ) : (
            <motion.p
              key="idle"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 flex items-center font-sans text-[10.5px] font-medium uppercase tracking-[0.12em] text-ink/35"
            >
              Tria un terme, desprès la seva definició
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* ── Dark match card ─────────────────────────────────────────── */}
      <div className="bg-ink rounded-2xl px-4 pt-4 pb-5 flex flex-col gap-4">

        {/* 2-col grid: terms (left) · definitions (right) */}
        <div className="grid grid-cols-2 gap-[5px] items-start">

          {/* Left column — terms */}
          <div className="flex flex-col gap-[5px]">
            {Q5_TERMS.map(term => {
              const isPaired   = matchedTerms.includes(term);
              const isSelected = pendingTerm === term;
              return (
                <motion.button
                  key={term}
                  onClick={() => handleTerm(term)}
                  whileTap={isPaired ? {} : { scale: 0.95 }}
                  animate={{ opacity: isPaired ? 0.25 : 1 }}
                  transition={{ duration: 0.2 }}
                  className={`min-h-[66px] rounded-[14px] border-[2.5px] flex items-center justify-center text-center
                    px-2.5 py-3 no-select transition-colors duration-150 ${
                    isPaired
                      ? 'bg-white/10 border-transparent pointer-events-none'
                      : isSelected
                      ? 'bg-green/[.13] border-green cursor-pointer'
                      : 'bg-white/10 border-transparent hover:border-white/20 cursor-pointer'
                  }`}
                >
                  <span className="font-display font-[800] text-[15px] leading-snug text-bone">
                    {term}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Right column — definitions, offset for editorial asymmetry */}
          <div className="flex flex-col gap-[5px] mt-2">
            {shuffledDefs.map(def => {
              const isPaired    = matchedDefIds.includes(def.id);
              const isClickable = !!pendingTerm && !isPaired;
              return (
                <motion.button
                  key={def.id}
                  onClick={() => handleDef(def.id)}
                  whileTap={isClickable ? { scale: 0.97 } : {}}
                  animate={{ opacity: isPaired ? 0.25 : isClickable ? 1 : 0.48 }}
                  transition={{ duration: 0.2 }}
                  className={`min-h-[66px] rounded-[14px] border-[2.5px] flex items-start text-left
                    px-2.5 py-3 no-select transition-colors duration-150 ${
                    isPaired
                      ? 'bg-white/[.08] border-transparent pointer-events-none'
                      : isClickable
                      ? 'bg-white/[.14] border-white/20 cursor-pointer'
                      : 'bg-white/10 border-transparent cursor-default'
                  }`}
                >
                  <span className="font-serif italic text-[11.5px] leading-[1.42] text-bone/90">
                    {def.text}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ── Matched pairs ─────────────────────────────────────────── */}
        <AnimatePresence>
          {pairs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.22 }}
              className="flex flex-col gap-[6px]"
            >
              {/* Section label */}
              <div className="flex items-center gap-2 mb-0.5">
                <div className="w-[14px] h-[1.5px] rounded-full bg-green shrink-0" />
                <span className="font-sans text-[9px] font-bold uppercase tracking-[0.13em] text-bone/30">
                  Relacions fetes
                </span>
              </div>

              {/* Pair rows */}
              {pairs.map((pair, idx) => (
                <motion.div
                  key={pair.term}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                  className="flex items-center gap-[6px] bg-white/[.07] rounded-[10px] px-2.5 py-2"
                >
                  {/* Numbered circle */}
                  <div className="w-5 h-5 rounded-full bg-green flex items-center justify-center shrink-0">
                    <span className="font-display font-[900] text-[10px] leading-none text-ink">
                      {idx + 1}
                    </span>
                  </div>

                  {/* Term pill */}
                  <div className="bg-white/[.12] rounded-full px-2.5 py-[3px] shrink-0">
                    <span className="font-display font-[700] text-[11px] text-bone whitespace-nowrap">
                      {pair.term}
                    </span>
                  </div>

                  {/* Definition pill */}
                  <div className="flex-1 bg-white/[.12] rounded-full px-2.5 py-[3px] min-w-0 overflow-hidden">
                    <span className="font-serif text-[10px] text-bone/80 truncate block leading-snug">
                      {getDefText(pair.defId)}
                    </span>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => removeMatch(pair.term)}
                    aria-label="Elimina parella"
                    className="w-[22px] h-[22px] rounded-full border border-white/25 flex items-center justify-center shrink-0
                      text-white/40 text-[13px] font-bold no-select transition-colors duration-150
                      hover:border-green hover:text-green"
                  >
                    ×
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
