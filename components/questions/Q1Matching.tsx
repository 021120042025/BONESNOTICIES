'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Q1_PARTIES, Q1_POLITICIANS } from '@/data/quizData';
import type { Q1Answer } from '@/data/types';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface Props {
  value: Q1Answer;
  onChange: (v: Q1Answer) => void;
}

export default function Q1Matching({ value, onChange }: Props) {
  const [shuffledPols] = useState(() => shuffle(Q1_POLITICIANS));

  /* Independent left / right selection — either side can be selected first */
  const [leftSel,  setLeftSel]  = useState<string | null>(null);
  const [rightSel, setRightSel] = useState<string | null>(null);

  const pairedParties = Object.keys(value);
  const pairedPols    = Object.values(value);

  function isPairedParty(p: string)  { return pairedParties.includes(p); }
  function isPairedPol(p: string)    { return pairedPols.includes(p); }

  function tryCreatePair(party: string | null, pol: string | null) {
    if (!party || !pol) return;
    onChange({ ...value, [party]: pol });
    setLeftSel(null);
    setRightSel(null);
  }

  function handleLeft(party: string) {
    if (isPairedParty(party)) return;
    if (leftSel === party) { setLeftSel(null); return; }
    setLeftSel(party);
    tryCreatePair(party, rightSel);
  }

  function handleRight(pol: string) {
    if (isPairedPol(pol)) return;
    if (rightSel === pol) { setRightSel(null); return; }
    setRightSel(pol);
    tryCreatePair(leftSel, pol);
  }

  function removeMatch(party: string) {
    const next = { ...value };
    delete next[party];
    onChange(next);
  }

  const pairs = pairedParties.map(party => ({ party, pol: value[party] }));

  return (
    <div className="flex flex-col gap-3">

      {/* Status line */}
      <div className="relative h-[18px] overflow-hidden">
        <AnimatePresence mode="wait">
          {leftSel || rightSel ? (
            <motion.div
              key="sel"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 flex items-center gap-2"
            >
              <div className="w-[7px] h-[7px] rounded-full bg-green shrink-0" />
              {leftSel && (
                <span className="font-display font-[800] text-[12px] text-ink leading-none">
                  &ldquo;{leftSel}&rdquo;
                </span>
              )}
              {leftSel && rightSel && (
                <span className="font-sans text-[11px] text-ink/45">+</span>
              )}
              {rightSel && (
                <span className="font-display font-[800] text-[12px] text-ink leading-none">
                  &ldquo;{rightSel}&rdquo;
                </span>
              )}
              <span className="font-sans text-[11px] text-ink/45 leading-none">
                — ara tria l&rsquo;altre costat
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
              Relaciona cada partit amb la seva representant
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* ── Dark match card ─────────────────────────── */}
      <div className="bg-ink rounded-2xl px-4 pt-4 pb-5 flex flex-col gap-4">

        {/* 2-col grid */}
        <div className="grid grid-cols-2 gap-[5px] items-start">

          {/* Left — parties */}
          <div className="flex flex-col gap-[5px]">
            {Q1_PARTIES.map(party => {
              const paired   = isPairedParty(party);
              const selected = leftSel === party;
              return (
                <motion.button
                  key={party}
                  onClick={() => handleLeft(party)}
                  whileTap={paired ? {} : { scale: 0.95 }}
                  animate={{ opacity: paired ? 0.28 : 1 }}
                  transition={{ duration: 0.2 }}
                  className={`min-h-[66px] rounded-[14px] border-[2.5px] flex items-center justify-center
                    text-center px-2.5 py-3 no-select transition-colors duration-150 ${
                    paired
                      ? 'bg-white/10 border-transparent pointer-events-none'
                      : selected
                      ? 'bg-green/[.13] border-green cursor-pointer'
                      : 'bg-white/10 border-transparent hover:border-white/20 cursor-pointer'
                  }`}
                >
                  <span className="font-display font-[800] text-[15px] leading-snug text-bone">
                    {party}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Right — politicians, offset 8px for asymmetry */}
          <div className="flex flex-col gap-[5px] mt-2">
            {shuffledPols.map(pol => {
              const paired   = isPairedPol(pol);
              const selected = rightSel === pol;
              return (
                <motion.button
                  key={pol}
                  onClick={() => handleRight(pol)}
                  whileTap={paired ? {} : { scale: 0.95 }}
                  animate={{ opacity: paired ? 0.28 : 1 }}
                  transition={{ duration: 0.2 }}
                  className={`min-h-[66px] rounded-[14px] border-[2.5px] flex items-center justify-center
                    text-center px-2.5 py-3 no-select transition-colors duration-150 ${
                    paired
                      ? 'bg-white/10 border-transparent pointer-events-none'
                      : selected
                      ? 'bg-green/[.13] border-green cursor-pointer'
                      : 'bg-white/10 border-transparent hover:border-white/20 cursor-pointer'
                  }`}
                >
                  <span className="font-display font-[800] text-[14px] leading-snug text-bone">
                    {pol}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ── Pairs ─────────────────────────────────── */}
        <AnimatePresence>
          {pairs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="flex flex-col gap-[6px]"
            >
              {/* Label */}
              <div className="flex items-center gap-2 mb-0.5">
                <div className="w-[14px] h-[1.5px] rounded-full bg-green shrink-0" />
                <span
                  className="font-sans font-bold uppercase text-bone/30"
                  style={{ fontSize: '0.55rem', letterSpacing: '0.13em' }}
                >
                  Relacions fetes
                </span>
              </div>

              {pairs.map((pair, idx) => (
                <motion.div
                  key={pair.party}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                  className="flex items-center gap-[6px] rounded-[10px] px-2.5 py-2"
                  style={{ background: 'rgba(255,255,255,0.07)' }}
                >
                  {/* Number */}
                  <div className="w-5 h-5 rounded-full bg-green flex items-center justify-center shrink-0">
                    <span className="font-display font-[900] text-[10px] leading-none text-ink">
                      {idx + 1}
                    </span>
                  </div>

                  {/* Party pill */}
                  <div className="shrink-0 rounded-full px-2.5 py-[3px]" style={{ background: 'rgba(255,255,255,0.12)' }}>
                    <span className="font-display font-[700] text-[11px] text-bone whitespace-nowrap">
                      {pair.party}
                    </span>
                  </div>

                  {/* Pol pill */}
                  <div className="flex-1 min-w-0 rounded-full px-2.5 py-[3px] overflow-hidden" style={{ background: 'rgba(255,255,255,0.12)' }}>
                    <span className="font-display font-[700] text-[11px] text-bone truncate block">
                      {pair.pol}
                    </span>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeMatch(pair.party)}
                    aria-label="Elimina parella"
                    className="w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 text-[13px] font-bold no-select transition-colors duration-150 hover:border-green hover:text-green"
                    style={{ border: '1.5px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.4)', background: 'transparent' }}
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
