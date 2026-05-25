'use client';

import { useState } from 'react';
import { Q2_MINI } from '@/data/quizData';
import type { Q2Answer } from '@/data/types';

interface Props {
  value: Q2Answer;
  onChange: (v: Q2Answer) => void;
}

const PHOTO_LABELS: Record<string, string> = {
  congres:  'Congrés dels Diputats · Madrid',
  parlament: 'Parlament de Catalunya',
  europeu:  'Parlament Europeu · Brussel·les',
};

export default function Q2TabQuiz({ value, onChange }: Props) {
  const [current, setCurrent] = useState(() => {
    const first = Q2_MINI.findIndex((_, i) => value[i] === undefined);
    return first === -1 ? Q2_MINI.length - 1 : first;
  });

  function handleSelect(option: string) {
    const next = { ...value, [current]: option };
    onChange(next);
    setTimeout(() => {
      if (current < Q2_MINI.length - 1) setCurrent(current + 1);
    }, 380);
  }

  const total = Q2_MINI.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

      {/* Sub-question counter + dots */}
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
        <span><span>{current + 1}</span> / {total} subpreguntes</span>
        <span style={{ display: 'flex', gap: '5px' }}>
          {Q2_MINI.map((_, i) => (
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
          height: '380px',
        }}
      >
        {Q2_MINI.map((mini, i) => {
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
          const isSelected = value[i] !== undefined;

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: '4px', right: '4px',
                top: 0,
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
              {/* Photo placeholder */}
              <div
                style={{
                  width: '100%',
                  height: '110px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  background: 'repeating-linear-gradient(45deg, rgba(26,20,16,0.05) 0 2px, transparent 2px 9px), linear-gradient(180deg, #e2ddd6 0%, #cdc7be 100%)',
                  color: 'rgba(26,20,16,0.45)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '9.5px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '8px',
                }}
              >
                {PHOTO_LABELS[mini.image] ?? ''}
              </div>

              {/* Question */}
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '17.5px',
                  lineHeight: 1.12,
                  letterSpacing: '-0.015em',
                  color: '#1a1410',
                }}
              >
                {mini.question}
              </div>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                {mini.options.map(opt => {
                  const sel = value[i] === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => i === current && handleSelect(opt)}
                      className="no-select"
                      style={{
                        background: sel ? '#00ff00' : 'transparent',
                        color: '#1a1410',
                        border: sel ? '1.5px solid #1a1410' : '1.5px solid rgba(26,20,16,0.18)',
                        borderRadius: '999px',
                        padding: '11px 18px',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '13px',
                        letterSpacing: '-0.005em',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 220ms cubic-bezier(.2,.7,.2,1)',
                        boxShadow: sel ? '0 0 0 2px #1a1410 inset, 0 4px 14px -4px rgba(0,255,0,0.4)' : undefined,
                      }}
                    >
                      {opt}
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
