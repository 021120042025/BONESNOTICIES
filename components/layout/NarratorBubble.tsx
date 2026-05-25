'use client';

import { NARRATORS } from '@/data/quizData';

interface Props {
  narratorId: string | null;
  text: string;
}

export default function NarratorBubble({ narratorId, text }: Props) {
  const narrator = NARRATORS.find(n => n.id === narratorId) ?? NARRATORS[0];

  return (
    <div
      className="flex items-start gap-3 px-[22px] pb-5 bg-bg"
      style={{ marginTop: '4px' }}
    >
      {/* Avatar — 72×72, 14px radius, no green border, bg-soft */}
      <div
        className="shrink-0 flex items-end justify-center overflow-hidden"
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '14px',
          background: '#2b231d',
          position: 'relative',
        }}
      >
        <span
          className="font-display font-black text-bone"
          style={{ fontSize: '20px', letterSpacing: '-0.02em', paddingBottom: '8px' }}
        >
          {narrator.initials}
        </span>
      </div>

      {/* Speech bubble — 20px radius, bg-soft, faint border */}
      <div
        className="flex-1 min-w-0"
        style={{
          background: '#2b231d',
          borderRadius: '20px',
          padding: '12px 16px 14px',
          border: '1px solid rgba(236,233,233,0.06)',
        }}
      >
        {/* Narrator name */}
        <div
          className="text-green"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: '11px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            lineHeight: 1,
            marginBottom: '8px',
          }}
        >
          {narrator.name.toUpperCase()}
        </div>
        {/* Question text */}
        <div
          className="text-bone"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '14.5px',
            lineHeight: 1.32,
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}
