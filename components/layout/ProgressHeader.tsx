'use client';

import type { Step } from '@/data/types';

const Q_STEPS: Step[] = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'];

interface Props {
  step: Step;
}

export default function ProgressHeader({ step }: Props) {
  const qIdx       = Q_STEPS.indexOf(step);
  const isQuestion = qIdx >= 0;
  const isResults  = step === 'results';

  const counterText = isResults
    ? 'RESULTATS'
    : isQuestion
    ? `${qIdx + 1} / 8`
    : '— / 8';

  const kickerText = isResults
    ? 'Edició final · Llegit i puntuat'
    : isQuestion
    ? `Pregunta ${qIdx + 1} de 8`
    : null;

  return (
    <header
      className="bg-bg shrink-0 flex flex-col"
      style={{ padding: '54px 22px 20px', gap: '16px' }}
    >
      {/* qhead: title + counter row + progress strip */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Row: brand title | counter */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px' }}>
          <div
            className="text-bone whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: '22px',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            Bones Notícies
          </div>
          <div
            className="whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 500,
              fontSize: '12px',
              letterSpacing: '0.06em',
              color: 'rgba(236,233,233,0.6)',
            }}
          >
            {counterText}
          </div>
        </div>

        {/* 8-segment progress strip */}
        <div
          style={{
            display: 'grid',
            gridAutoFlow: 'column',
            gridAutoColumns: '1fr',
            gap: '6px',
            alignItems: 'center',
          }}
        >
          {Q_STEPS.map((_, i) => {
            const isDone   = isResults || i < qIdx;
            const isActive = isQuestion && i === qIdx;
            return (
              <div
                key={i}
                style={{
                  height: isActive ? '5px' : '4px',
                  background: isActive
                    ? '#00ff00'
                    : isDone
                    ? 'rgba(236,233,233,0.45)'
                    : 'rgba(236,233,233,0.18)',
                  borderRadius: '999px',
                  transition: 'background 260ms, height 260ms',
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Kicker: green dash + label */}
      {kickerText && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            fontSize: '10.5px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(236,233,233,0.55)',
            paddingTop: '4px',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '18px',
              height: '2px',
              background: '#00ff00',
              borderRadius: '999px',
              flexShrink: 0,
            }}
          />
          {kickerText}
        </div>
      )}
    </header>
  );
}
