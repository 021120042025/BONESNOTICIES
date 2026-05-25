'use client';

import { useState } from 'react';
import { Q8_MINI } from '@/data/quizData';
import type { Q8Answer } from '@/data/types';

interface Props {
  value: Q8Answer;
  onChange: (v: Q8Answer) => void;
}

export default function Q8TrueOrFalse({ value, onChange }: Props) {
  const [current, setCurrent] = useState(() => {
    const first = Q8_MINI.findIndex((_, i) => value[i] === undefined);
    return first === -1 ? Q8_MINI.length - 1 : first;
  });

  function handleVerdict(verdict: string) {
    const next = { ...value, [current]: verdict };
    onChange(next);
    setTimeout(() => {
      if (current < Q8_MINI.length - 1) setCurrent(current + 1);
    }, 380);
  }

  const total = Q8_MINI.length;

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
        <span><span>{current + 1}</span> / {total} afirmacions</span>
        <span style={{ display: 'flex', gap: '5px' }}>
          {Q8_MINI.map((_, i) => (
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
          height: '340px',
        }}
      >
        {Q8_MINI.map((mini, i) => {
          const depth = i - current;
          const clamped = depth < 0 ? -1 : depth > 2 ? 3 : depth;
          const transforms: Record<number, { translateY: string; scale: number; opacity: number; zIndex: number; pointerEvents: 'none' | 'auto' }> = {
            0:  { translateY: '0px',   scale: 1,    opacity: 1,    zIndex: 3, pointerEvents: 'auto' },
            1:  { translateY: '10px',  scale: 0.96, opacity: 0.6,  zIndex: 2, pointerEvents: 'none' },
            2:  { translateY: '20px',  scale: 0.92, opacity: 0.32, zIndex: 1, pointerEvents: 'none' },
            [-1]: { translateY: '-30px', scale: 0.94, opacity: 0,    zIndex: 0, pointerEvents: 'none' },
            3:  { translateY: '-30px', scale: 0.94, opacity: 0,    zIndex: 0, pointerEvents: 'none' },
          };
          const t = transforms[clamped] ?? transforms[3];

          return (
            <div
              key={i}
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
              {/* tf-quote */}
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '13px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(26,20,16,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: '56px',
                    lineHeight: 0,
                    color: '#00ff00',
                    marginTop: '12px',
                    display: 'inline-block',
                  }}
                >
                  &ldquo;
                </span>
                Afirmació {i + 1}
              </div>

              {/* tf-statement */}
              <div
                style={{
                  flex: '1 1 auto',
                  minHeight: 0,
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '18px',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: '#1a1410',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {mini.statement}
              </div>

              {/* tf-buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {(['VERITAT', 'FALS'] as const).map(verdict => {
                  const sel = value[i] === verdict;
                  const isVeritat = verdict === 'VERITAT';
                  return (
                    <button
                      key={verdict}
                      onClick={() => i === current && handleVerdict(verdict)}
                      className="no-select"
                      style={{
                        border: 0,
                        borderRadius: '14px',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 900,
                        fontSize: '16px',
                        letterSpacing: '0.04em',
                        padding: '22px 14px',
                        cursor: 'pointer',
                        transition: 'all 220ms cubic-bezier(.2,.7,.2,1)',
                        boxShadow: sel
                          ? '0 0 0 2px #1a1410 inset, 0 4px 14px -4px rgba(0,255,0,0.45)'
                          : '0 2px 0 0 rgba(26,20,16,0.06), 0 4px 14px -6px rgba(26,20,16,0.15)',
                        background: sel
                          ? '#00ff00'
                          : isVeritat
                          ? '#1a1410'
                          : '#ffffff',
                        color: sel
                          ? '#1a1410'
                          : isVeritat
                          ? '#ece9e9'
                          : '#1a1410',
                        borderColor: sel ? '#1a1410' : undefined,
                      }}
                    >
                      {verdict}
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
