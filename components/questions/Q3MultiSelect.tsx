'use client';

import { Q3_OPTIONS } from '@/data/quizData';
import type { Q3Answer } from '@/data/types';

const MAX = 3;

interface Props {
  value: Q3Answer;
  onChange: (v: Q3Answer) => void;
}

export default function Q3MultiSelect({ value, onChange }: Props) {
  function toggle(opt: string) {
    if (value.includes(opt)) {
      onChange(value.filter(o => o !== opt));
    } else if (value.length < MAX) {
      onChange([...value, opt]);
    }
  }

  const done = value.length === MAX;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

      {/* ms-meta */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-sans)',
          fontWeight: 600,
          fontSize: '10px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'rgba(26,20,16,0.5)',
          padding: '0 4px',
        }}
      >
        <span>
          Selecciona{' '}
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: '14px',
              color: '#1a1410',
              letterSpacing: '-0.01em',
              marginRight: '4px',
            }}
          >
            {MAX}
          </span>
        </span>
        <span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: '14px',
              color: done ? '#008f00' : '#1a1410',
              letterSpacing: '-0.01em',
              marginRight: '4px',
            }}
          >
            {value.length}
          </span>
          / {MAX} seleccionats
        </span>
      </div>

      {/* ms-stack — vertical pill list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {Q3_OPTIONS.map(opt => {
          const selected = value.includes(opt);
          const maxed    = !selected && value.length >= MAX;
          return (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              disabled={maxed}
              className="no-select"
              style={{
                background: selected ? '#00ff00' : '#ffffff',
                color: '#1a1410',
                border: 0,
                borderRadius: '999px',
                padding: '12px 18px',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '14px',
                letterSpacing: 0,
                lineHeight: 1.1,
                cursor: maxed ? 'not-allowed' : 'pointer',
                opacity: maxed ? 0.3 : 1,
                minHeight: '46px',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                textAlign: 'left',
                boxShadow: selected
                  ? '0 0 0 2px #1a1410, 0 6px 18px -6px rgba(0,255,0,0.5)'
                  : '0 2px 0 0 rgba(26,20,16,0.06), 0 4px 14px -6px rgba(26,20,16,0.18)',
                transition: 'background 220ms, box-shadow 220ms, opacity 220ms',
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
