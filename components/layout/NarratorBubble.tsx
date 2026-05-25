'use client';

import { NARRATORS } from '@/data/quizData';

interface Props {
  narratorId: string | null;
  text: string;
}

export default function NarratorBubble({ narratorId, text }: Props) {
  const narrator = NARRATORS.find(n => n.id === narratorId) ?? NARRATORS[0];

  return (
    <div className="flex items-end gap-[14px] px-5 pt-3 pb-5 bg-bg">
      {/* Avatar — 64×64, 10px radius, green border, initials */}
      <div
        className="shrink-0 w-16 h-16 border-2 border-green flex items-center justify-center overflow-hidden"
        style={{ borderRadius: '10px', background: 'rgba(255,255,255,0.04)' }}
      >
        <span className="font-display font-black text-[18px] text-bone tracking-tight">
          {narrator.initials}
        </span>
      </div>

      {/* Speech bubble — tail at bottom-left (border-radius: 12px 12px 12px 4px) */}
      <div
        className="flex-1 px-[14px] py-[11px]"
        style={{
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '12px 12px 12px 4px',
        }}
      >
        {/* Narrator name */}
        <p
          className="font-sans font-bold uppercase text-green mb-1"
          style={{ fontSize: '0.55rem', letterSpacing: '0.1em' }}
        >
          {narrator.name}
        </p>
        {/* Question text */}
        <p
          className="font-serif text-bone"
          style={{ fontSize: 'clamp(0.92rem, 3.8vw, 1.08rem)', lineHeight: 1.5 }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
