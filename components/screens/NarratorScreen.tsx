'use client';

import { motion } from 'framer-motion';
import { NARRATORS } from '@/data/quizData';
import ProgressHeader from '../layout/ProgressHeader';

const NARRATOR_IMAGES: Record<string, string> = {
  'marc-giro':       '/images/narrators/marc-giro.png',
  'jordi-evole':     '/images/narrators/jordi-evole.png',
  'juana-dolores':   '/images/narrators/juana-dolores.png',
  'alba-riera':      '/images/narrators/alba-riera.png',
  'samantha-hudson': '/images/narrators/samantha-hudson.png',
  'roma-gallardo':   '/images/narrators/roma-gallardo.png',
};

interface Props {
  selected: string | null;
  onSelect: (id: string) => void;
  onContinue: () => void;
}

export default function NarratorScreen({ selected, onSelect, onContinue }: Props) {
  return (
    <div className="flex flex-col h-full bg-bg">
      <ProgressHeader step="narrator" />

      {/* Cream zone */}
      <div className="flex-1 flex flex-col bg-light rounded-t-[28px] overflow-hidden min-h-0">
        <div className="flex-1 overflow-y-auto px-4 pt-5 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-5"
          >
            <h2 className="font-display font-black text-2xl tracking-tight text-ink leading-tight">
              Qui t&apos;acompanya?
            </h2>
            <p className="font-sans text-sm font-medium text-ink/60 mt-1">
              Tria el teu narrador o narradora.
            </p>
          </motion.div>

          {/* Narrator grid */}
          <div className="grid grid-cols-2 gap-3">
            {NARRATORS.map((narrator, i) => {
              const isSelected = selected === narrator.id;
              return (
                <motion.button
                  key={narrator.id}
                  onClick={() => onSelect(narrator.id)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  whileTap={{ scale: 0.96 }}
                  className={`relative flex flex-col items-center text-center p-4 rounded-2xl border-2 transition-colors no-select
                    ${isSelected
                      ? 'bg-ink border-ink'
                      : 'bg-card border-ink/15 hover:border-ink/30'
                    }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-16 h-16 border-2 mb-2.5 ${
                      isSelected ? 'border-green' : 'border-ink/15'
                    }`}
                    style={{ borderRadius: '12px', overflow: 'hidden' }}
                  >
                    {NARRATOR_IMAGES[narrator.id] ? (
                      <img
                        src={NARRATOR_IMAGES[narrator.id]}
                        alt={narrator.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    ) : (
                      <span className="font-display font-black text-xl leading-none tracking-tight text-ink">
                        {narrator.initials}
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <span className={`font-sans font-bold text-[13px] leading-tight ${
                    isSelected ? 'text-bone' : 'text-ink'
                  }`}>
                    {narrator.name}
                  </span>

                  {/* Role */}
                  <span className={`font-sans text-[10px] font-medium mt-0.5 leading-tight ${
                    isSelected ? 'text-bone/60' : 'text-ink/50'
                  }`}>
                    {narrator.role}
                  </span>

                  {/* Selected indicator */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-green flex items-center justify-center"
                    >
                      <span className="text-[10px] font-black text-ink">✓</span>
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Continue */}
        <div className="shrink-0 px-4 py-3 bg-light border-t border-ink/10">
          <motion.button
            onClick={selected ? onContinue : undefined}
            whileTap={selected ? { scale: 0.97 } : {}}
            className={`w-full h-14 rounded-2xl font-display font-black text-base uppercase tracking-widest transition-all no-select ${
              selected
                ? 'bg-green text-ink'
                : 'bg-ink/10 text-ink/30 cursor-default'
            }`}
          >
            {selected ? 'Endavant →' : 'Tria un narrador'}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
