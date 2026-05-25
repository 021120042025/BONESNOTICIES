'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Q1_PARTIES, Q1_POLITICIANS } from '@/data/quizData';
import type { Q1Answer } from '@/data/types';

interface Props {
  value: Q1Answer;
  onChange: (v: Q1Answer) => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Q1Matching({ value, onChange }: Props) {
  const [shuffledPols] = useState(() => shuffle(Q1_POLITICIANS));
  const [pendingParty, setPendingParty] = useState<string | null>(null);

  const matchedParties  = Object.keys(value);
  const matchedPols     = Object.values(value);
  const availableParties = Q1_PARTIES.filter(p => !matchedParties.includes(p));
  const availablePols    = shuffledPols.filter(p => !matchedPols.includes(p));

  function handleParty(party: string) {
    if (pendingParty === party) { setPendingParty(null); return; }
    setPendingParty(party);
  }

  function handlePol(pol: string) {
    if (!pendingParty) return;
    onChange({ ...value, [pendingParty]: pol });
    setPendingParty(null);
  }

  function removeMatch(party: string) {
    const next = { ...value };
    delete next[party];
    onChange(next);
  }

  return (
    <div className="space-y-4">
      <p className="font-sans text-xs font-medium text-ink/50 uppercase tracking-widest">
        {pendingParty
          ? `"${pendingParty}" — ara tria una política`
          : 'Selecciona un partit, després una política'}
      </p>

      <div className="grid grid-cols-2 gap-2">
        {/* Left: parties */}
        <div className="space-y-2">
          <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-ink/40 mb-1">Partits</p>
          {availableParties.map(party => (
            <motion.button
              key={party}
              onClick={() => handleParty(party)}
              whileTap={{ scale: 0.95 }}
              className={`w-full text-left px-3 py-2.5 rounded-xl border-2 font-sans font-semibold text-[13px] leading-tight transition-colors no-select ${
                pendingParty === party
                  ? 'bg-green border-ink text-ink'
                  : 'bg-card border-ink/20 text-ink hover:border-ink/50'
              }`}
            >
              {party}
            </motion.button>
          ))}
        </div>

        {/* Right: politicians */}
        <div className="space-y-2">
          <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-ink/40 mb-1">Polítiques</p>
          {availablePols.map(pol => (
            <motion.button
              key={pol}
              onClick={() => handlePol(pol)}
              whileTap={{ scale: 0.95 }}
              className={`w-full text-left px-3 py-2.5 rounded-xl border-2 font-sans font-semibold text-[13px] leading-tight transition-colors no-select ${
                pendingParty
                  ? 'bg-card border-ink/20 text-ink hover:border-ink'
                  : 'bg-card border-ink/10 text-ink/40 cursor-default'
              }`}
            >
              {pol}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Matches */}
      <AnimatePresence>
        {matchedParties.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-1.5"
          >
            <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-ink/40">Parelles creades</p>
            {matchedParties.map(party => (
              <motion.div
                key={party}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center gap-2 bg-green border-2 border-ink rounded-full px-3 py-2"
              >
                <span className="font-sans text-[13px] font-bold text-ink flex-1">
                  {party} → {value[party]}
                </span>
                <button
                  onClick={() => removeMatch(party)}
                  className="text-ink/50 font-bold text-base w-5 h-5 flex items-center justify-center hover:text-ink"
                  aria-label="Elimina"
                >
                  ×
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
