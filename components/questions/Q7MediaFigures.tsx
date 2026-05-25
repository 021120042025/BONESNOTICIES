'use client';

import { motion } from 'framer-motion';
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

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="font-sans text-xs font-medium text-ink/50 uppercase tracking-widest">
          Selecciona fins a {MAX} personatges
        </p>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border-2 transition-colors ${
          value.length === MAX ? 'bg-green border-ink' : 'bg-card border-ink/20'
        }`}>
          <span className="font-display font-black text-sm text-ink tabular-nums">{value.length}</span>
          <span className="font-sans text-ink/40 font-medium text-sm">/{MAX}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {Q7_FIGURES.map((fig, i) => {
          const selected = value.includes(fig.id);
          const maxed    = !selected && value.length >= MAX;
          return (
            <motion.button
              key={fig.id}
              onClick={() => toggle(fig.id)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              whileTap={maxed ? {} : { scale: 0.95 }}
              className={`relative flex flex-col items-center text-center p-4 rounded-2xl border-2 transition-colors no-select ${
                selected
                  ? 'bg-green border-ink'
                  : maxed
                  ? 'bg-card border-ink/10 opacity-40'
                  : 'bg-card border-ink/20 hover:border-ink/50'
              }`}
            >
              <div
                className={`w-14 h-14 border-2 flex items-center justify-center mb-2 ${
                  selected ? 'bg-ink border-ink' : 'bg-light border-ink/15'
                }`}
                style={{ borderRadius: '12px' }}
              >
                <span className={`font-display font-black text-lg leading-none ${
                  selected ? 'text-green' : 'text-ink'
                }`}>
                  {fig.initials}
                </span>
              </div>
              <span className="font-sans font-bold text-[13px] leading-tight text-ink">
                {fig.name}
              </span>
              <span className="font-sans text-[10px] font-medium mt-0.5 text-ink/50">
                {fig.party}
              </span>
              {selected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-ink flex items-center justify-center"
                >
                  <span className="text-[9px] font-black text-green">✓</span>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
