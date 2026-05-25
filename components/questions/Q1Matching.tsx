'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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

// Map politician name → initials for portrait circle
const POL_INITIALS: Record<string, string> = {
  'Ada Colau':       'AC',
  'Laia Estrada':    'LE',
  'Sílvia Orriols':  'SO',
  'Míriam Nogueras': 'MN',
};

interface Props {
  value: Q1Answer;
  onChange: (v: Q1Answer) => void;
}

export default function Q1Matching({ value, onChange }: Props) {
  const [shuffledPols] = useState(() => shuffle(Q1_POLITICIANS));

  const [selParty, setSelParty] = useState<string | null>(null);
  const [selPol,   setSelPol]   = useState<string | null>(null);

  const usedParties = Object.keys(value);
  const usedPols    = Object.values(value);

  const pairs = usedParties.map((party, i) => ({ party, pol: value[party], idx: i }));

  function commit(party: string | null, pol: string | null) {
    if (!party || !pol) return;
    onChange({ ...value, [party]: pol });
    setSelParty(null);
    setSelPol(null);
  }

  function handleParty(party: string) {
    if (usedParties.includes(party)) return;
    if (selParty === party) { setSelParty(null); return; }
    const next = party;
    setSelParty(next);
    commit(next, selPol);
  }

  function handlePol(pol: string) {
    if (usedPols.includes(pol)) return;
    if (selPol === pol) { setSelPol(null); return; }
    const next = pol;
    setSelPol(next);
    commit(selParty, next);
  }

  function removePair(party: string) {
    const next = { ...value };
    delete next[party];
    // Compact
    const remaining = Object.entries(next);
    const compacted: Q1Answer = {};
    remaining.forEach(([p, po]) => { compacted[p] = po; });
    onChange(compacted);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

      {/* Two-column pill grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>

        {/* Left — parties */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {Q1_PARTIES.map(party => {
            const isUsed     = usedParties.includes(party);
            const isSelected = selParty === party && !isUsed;
            return (
              <motion.button
                key={party}
                onClick={() => handleParty(party)}
                whileTap={isUsed ? {} : { scale: 0.97 }}
                disabled={isUsed}
                className="no-select"
                style={{
                  background: isSelected ? '#00ff00' : '#ffffff',
                  color: '#1a1410',
                  border: 0,
                  borderRadius: '999px',
                  padding: '12px 16px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '13.5px',
                  letterSpacing: 0,
                  lineHeight: 1.1,
                  cursor: isUsed ? 'default' : 'pointer',
                  opacity: isUsed ? 0.3 : 1,
                  pointerEvents: isUsed ? 'none' : 'auto',
                  minHeight: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  textAlign: 'left',
                  boxShadow: isSelected
                    ? '0 0 0 2px #1a1410, 0 6px 18px -6px rgba(0,255,0,0.5)'
                    : '0 2px 0 0 rgba(26,20,16,0.06), 0 4px 14px -6px rgba(26,20,16,0.18)',
                  transition: 'background 220ms, box-shadow 220ms, opacity 220ms',
                }}
              >
                {party}
              </motion.button>
            );
          })}
        </div>

        {/* Right — politicians (portrait pill) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {shuffledPols.map(pol => {
            const isUsed     = usedPols.includes(pol);
            const isSelected = selPol === pol && !isUsed;
            return (
              <motion.button
                key={pol}
                onClick={() => handlePol(pol)}
                whileTap={isUsed ? {} : { scale: 0.97 }}
                disabled={isUsed}
                className="no-select"
                style={{
                  background: isSelected ? '#00ff00' : '#ffffff',
                  color: '#1a1410',
                  border: 0,
                  borderRadius: '999px',
                  padding: '6px 6px 6px 16px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '12.5px',
                  letterSpacing: 0,
                  lineHeight: 1.1,
                  cursor: isUsed ? 'default' : 'pointer',
                  opacity: isUsed ? 0.3 : 1,
                  pointerEvents: isUsed ? 'none' : 'auto',
                  minHeight: '52px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  width: '100%',
                  boxShadow: isSelected
                    ? '0 0 0 2px #1a1410, 0 6px 18px -6px rgba(0,255,0,0.5)'
                    : '0 2px 0 0 rgba(26,20,16,0.06), 0 4px 14px -6px rgba(26,20,16,0.18)',
                  transition: 'background 220ms, box-shadow 220ms, opacity 220ms',
                }}
              >
                <span style={{ lineHeight: 1.1 }}>
                  {pol.split(' ').map((word, i) => (
                    <span key={i}>{word}{i === 0 ? <br /> : ''}</span>
                  ))}
                </span>
                {/* Portrait circle */}
                <span
                  style={{
                    flexShrink: 0,
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#b8b3af',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 900,
                      fontSize: '11px',
                      color: '#1a1410',
                    }}
                  >
                    {POL_INITIALS[pol] ?? pol.slice(0, 2)}
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Pair rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
        {Array.from({ length: 4 }).map((_, i) => {
          const pair = pairs[i];
          const isFilled = !!pair;
          return (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '22px 1fr 1fr 22px',
                gap: '6px',
                alignItems: 'center',
              }}
            >
              {/* Badge */}
              <span
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  background: isFilled ? '#00ff00' : 'rgba(26,20,16,0.06)',
                  color: isFilled ? '#1a1410' : 'rgba(26,20,16,0.4)',
                  border: isFilled ? '1px solid #00ff00' : '1px solid rgba(26,20,16,0.15)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '11px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 220ms, color 220ms, border-color 220ms',
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </span>

              {/* Slot: party */}
              <span
                style={{
                  height: '28px',
                  borderRadius: '999px',
                  border: isFilled ? '1px solid rgba(26,20,16,0.2)' : '1px solid rgba(26,20,16,0.15)',
                  background: isFilled ? 'rgba(26,20,16,0.04)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 12px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '10.5px',
                  letterSpacing: '0.08em',
                  color: isFilled ? '#1a1410' : 'rgba(26,20,16,0.4)',
                  textTransform: 'uppercase',
                  minWidth: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  transition: 'background 220ms, color 220ms, border-color 220ms',
                }}
              >
                {pair ? pair.party : 'Partit'}
              </span>

              {/* Slot: politician */}
              <span
                style={{
                  height: '28px',
                  borderRadius: '999px',
                  border: isFilled ? '1px solid rgba(26,20,16,0.2)' : '1px solid rgba(26,20,16,0.15)',
                  background: isFilled ? 'rgba(26,20,16,0.04)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 12px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '10.5px',
                  letterSpacing: '0.08em',
                  color: isFilled ? '#1a1410' : 'rgba(26,20,16,0.4)',
                  textTransform: 'uppercase',
                  minWidth: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  transition: 'background 220ms, color 220ms, border-color 220ms',
                }}
              >
                {pair ? pair.pol : 'Polític'}
              </span>

              {/* Remove button */}
              <button
                onClick={() => pair && removePair(pair.party)}
                disabled={!isFilled}
                aria-label="Treure"
                className="no-select"
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  background: 'transparent',
                  border: '1px solid rgba(26,20,16,0.15)',
                  color: 'rgba(26,20,16,0.5)',
                  fontSize: '12px',
                  lineHeight: 1,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  opacity: isFilled ? 1 : 0,
                  pointerEvents: isFilled ? 'auto' : 'none',
                  transition: 'opacity 180ms',
                  flexShrink: 0,
                }}
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
