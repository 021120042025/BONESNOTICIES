'use client';

import { motion } from 'framer-motion';
import { NARRATORS } from '@/data/quizData';

interface Props {
  narratorId: string | null;
  text: string;
  questionNumber?: number;
}

export default function NarratorBubble({ narratorId, text }: Props) {
  const narrator = NARRATORS.find(n => n.id === narratorId) ?? NARRATORS[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.05 }}
      className="flex items-start gap-3 px-4 pt-3 pb-5 bg-bg"
    >
      {/* Avatar + name */}
      <div className="shrink-0 flex flex-col items-center gap-1.5">
        <div
          className="w-[72px] h-[72px] bg-bg-soft border border-bone/10 flex items-center justify-center"
          style={{ borderRadius: '14px' }}
        >
          <span className="font-display font-black text-xl text-bone tracking-tight">
            {narrator.initials}
          </span>
        </div>
        <span className="font-sans font-bold text-[11px] uppercase tracking-[0.16em] text-green text-center leading-tight max-w-[72px]">
          {narrator.name.split(' ')[0]}
        </span>
      </div>

      {/* Speech bubble */}
      <div className="bubble-tail relative flex-1 bg-bg-soft border border-bone/[0.06] rounded-2xl rounded-tl-sm px-4 py-3">
        <p className="font-serif text-[14.5px] leading-[1.32] text-bone">
          {text}
        </p>
      </div>
    </motion.div>
  );
}
