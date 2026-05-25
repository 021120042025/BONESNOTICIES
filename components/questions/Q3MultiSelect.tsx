'use client';

import { motion } from 'framer-motion';
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

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="font-sans text-xs font-medium text-ink/50 uppercase tracking-widest">
          Selecciona fins a {MAX} temes
        </p>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border-2 transition-colors ${
          value.length === MAX ? 'bg-green border-ink' : 'bg-card border-ink/20'
        }`}>
          <span className="font-display font-black text-sm text-ink tabular-nums">{value.length}</span>
          <span className="font-sans text-ink/40 font-medium text-sm">/{MAX}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {Q3_OPTIONS.map((opt, i) => {
          const selected = value.includes(opt);
          const maxed    = !selected && value.length >= MAX;
          return (
            <motion.button
              key={opt}
              onClick={() => toggle(opt)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileTap={maxed ? {} : { scale: 0.94 }}
              className={`px-4 py-2.5 rounded-full border-2 font-sans font-semibold text-[13px] transition-colors no-select ${
                selected
                  ? 'bg-green border-ink text-ink'
                  : maxed
                  ? 'bg-card border-ink/10 text-ink/25 cursor-not-allowed'
                  : 'bg-card border-ink/20 text-ink hover:border-ink/50'
              }`}
            >
              {opt}
            </motion.button>
          );
        })}
      </div>

      {value.length === MAX && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-sans text-xs font-medium text-ink/50 text-center pt-1"
        >
          Has seleccionat {MAX} temes. Pots avançar.
        </motion.p>
      )}
    </div>
  );
}
