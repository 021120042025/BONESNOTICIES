'use client';

import { useState } from 'react';
import { Q6_STATEMENTS, Q6_PARTIES } from '@/data/quizData';
import type { Q6Answer } from '@/data/types';

interface Props {
  value: Q6Answer;
  onChange: (v: Q6Answer) => void;
}

export default function Q6PoliticalPosition({ value, onChange }: Props) {
  const [current, setCurrent] = useState(() => {
    const first = Q6_STATEMENTS.findIndex(s => value[s.id] === undefined);
    return first === -1 ? Q6_STATEMENTS.length - 1 : first;
  });

  const total = Q6_STATEMENTS.length;
  const usedParties = Object.values(value);

  function handleSelect(party: string) {
    const stmt = Q6_STATEMENTS[current];
    const next = { ...value };
    // Remove this party from wherever it was
    const existingKey = Object.keys(next).find(k => next[k] === party);
    if (existingKey) delete next[existingKey];
    // Toggle
    if (value[stmt.id] === party) {
      delete next[stmt.id];
    } else {
      next[stmt.id] = party;
      setTimeout(() => {
        if (current < total - 1) setCurrent(current + 1);
      }, 380);
    }
    onChange(next);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

      {/* Sub counter + dots */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          fontFamily: 'var(--font-sans)',
          fontWeight: 600,
          fontSize: '10px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(26,20,16,0.5)',
        }}
      >
        <span><span>{current + 1}</span> / {total} postures</span>
        <span style={{ display: 'flex', gap: '5px' }}>
          {Q6_STATEMENTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="no-select"
              style={{
                width: '7px', height: '7px',
                borderRadius: '50%',
                background: i < current
                  ? 'rgba(26,20,16,0.55)'
                  : i === current
                  ? '#00ff00'
                  : 'rgba(26,20,16,0.18)',
                transform: i === current ? 'scale(1.2)' : 'scale(1)',
                transition: 'background 220ms, transform 220ms',
                border: 0,
                cursor: 'pointer',
                padding: 0,
              }}
            />
          ))}
        </span>
      </div>

      {/* Stacked deck */}
      <div
        style={{
          position: 'relative',
          flex: '1 1 auto',
          minHeight: 0,
          margin: '0 -4px',
          padding: '0 4px 8px',
          height: '400px',
        }}
      >
        {Q6_STATEMENTS.map((stmt, i) => {
          const depth = i - current;
          const clamped = depth < 0 ? -1 : depth > 3 ? 4 : depth;
          const transforms: Record<number, { translateY: string; scale: number; opacity: number; zIndex: number; pointerEvents: 'none' | 'auto' }> = {
            0:  { translateY: '0px',   scale: 1,    opacity: 1,    zIndex: 4, pointerEvents: 'auto' },
            1:  { translateY: '10px',  scale: 0.96, opacity: 0.6,  zIndex: 3, pointerEvents: 'none' },
            2:  { translateY: '20px',  scale: 0.92, opacity: 0.32, zIndex: 2, pointerEvents: 'none' },
            3:  { translateY: '30px',  scale: 0.88, opacity: 0.12, zIndex: 1, pointerEvents: 'none' },
            [-1]: { translateY: '-30px', scale: 0.94, opacity: 0,    zIndex: 0, pointerEvents: 'none' },
            4:  { translateY: '-30px', scale: 0.94, opacity: 0,    zIndex: 0, pointerEvents: 'none' },
          };
          const t = transforms[clamped] ?? transforms[4];

          return (
            <div
              key={stmt.id}
              style={{
                position: 'absolute',
                left: '4px', right: '4px',
                top: 0, bottom: 0,
                background: '#ffffff',
                borderRadius: '22px',
                padding: '18px',
                boxShadow: '0 2px 0 0 rgba(26,20,16,0.06), 0 12px 30px -10px rgba(26,20,16,0.22), 0 1px 2px rgba(26,20,16,0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                transform: `translateY(${t.translateY}) scale(${t.scale})`,
                opacity: t.opacity,
                zIndex: t.zIndex,
                pointerEvents: t.pointerEvents,
                transition: 'transform 360ms cubic-bezier(.2,.7,.2,1), opacity 360ms cubic-bezier(.2,.7,.2,1)',
              }}
            >
              {/* Card kicker */}
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: '10px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(26,20,16,0.4)',
                }}
              >
                Postura {i + 1} · Habitatge
              </div>

              {/* Statement */}
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '14px',
                  lineHeight: 1.4,
                  color: '#1a1410',
                  flex: '1 1 auto',
                }}
              >
                {stmt.text}
              </div>

              {/* Party options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                {Q6_PARTIES.map(party => {
                  const sel = value[stmt.id] === party;
                  const isUsed = !sel && usedParties.includes(party);
                  return (
                    <button
                      key={party}
                      onClick={() => i === current && !isUsed && handleSelect(party)}
                      disabled={isUsed}
                      className="no-select"
                      style={{
                        background: sel ? '#00ff00' : 'transparent',
                        color: isUsed ? 'rgba(26,20,16,0.25)' : '#1a1410',
                        border: sel
                          ? '1.5px solid #1a1410'
                          : isUsed
                          ? '1.5px solid rgba(26,20,16,0.08)'
                          : '1.5px solid rgba(26,20,16,0.18)',
                        borderRadius: '999px',
                        padding: '11px 18px',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '13px',
                        letterSpacing: '-0.005em',
                        textAlign: 'left',
                        cursor: isUsed ? 'not-allowed' : 'pointer',
                        opacity: isUsed ? 0.4 : 1,
                        transition: 'all 220ms cubic-bezier(.2,.7,.2,1)',
                        boxShadow: sel ? '0 0 0 2px #1a1410 inset, 0 4px 14px -4px rgba(0,255,0,0.4)' : undefined,
                      }}
                    >
                      {party}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
