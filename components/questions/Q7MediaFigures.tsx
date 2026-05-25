'use client';

import { Q7_FIGURES } from '@/data/quizData';
import type { Q7Answer } from '@/data/types';

const MAX = 3;

interface Props {
  value: Q7Answer;
  onChange: (v: Q7Answer) => void;
}

export default function Q7MediaFigures({ value, onChange }: Props) {
  function toggle(id: string) {
    if (value.includes(id)) {
      onChange(value.filter(v => v !== id));
    } else if (value.length < MAX) {
      onChange([...value, id]);
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

      {/* media-grid — 2×3 card grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: 'repeat(3, 1fr)',
          gap: '10px',
          flex: '1 1 auto',
          minHeight: 0,
        }}
      >
        {Q7_FIGURES.map(fig => {
          const selected = value.includes(fig.id);
          const maxed    = !selected && value.length >= MAX;
          return (
            <button
              key={fig.id}
              onClick={() => toggle(fig.id)}
              disabled={maxed}
              className="no-select"
              style={{
                background: selected ? '#00ff00' : '#ffffff',
                border: 0,
                borderRadius: '16px',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                cursor: maxed ? 'not-allowed' : 'pointer',
                opacity: maxed ? 0.3 : 1,
                boxShadow: selected
                  ? '0 0 0 2px #1a1410, 0 6px 18px -6px rgba(0,255,0,0.5)'
                  : '0 2px 0 0 rgba(26,20,16,0.06), 0 4px 14px -6px rgba(26,20,16,0.15)',
                transition: 'all 220ms cubic-bezier(.2,.7,.2,1)',
              }}
            >
              {/* Portrait area */}
              <div
                style={{
                  flex: 1,
                  background: '#e0dbd5',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  minHeight: '72px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: '22px',
                    color: selected ? '#1a1410' : '#6a6360',
                    paddingBottom: '8px',
                  }}
                >
                  {fig.initials}
                </span>
              </div>
              {/* Name */}
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '10.5px',
                  letterSpacing: '0.04em',
                  textAlign: 'center',
                  marginTop: '6px',
                  color: '#1a1410',
                  textTransform: 'uppercase',
                  lineHeight: 1.15,
                }}
              >
                {fig.name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
