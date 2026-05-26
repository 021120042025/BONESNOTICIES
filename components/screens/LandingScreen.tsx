'use client';

import { motion } from 'framer-motion';

interface Props {
  onStart: () => void;
}

export default function LandingScreen({ onStart }: Props) {
  return (
    <div className="flex flex-col min-h-full bg-bg px-6 py-8 select-none">
      {/* Masthead */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-line pb-4 mb-6"
      >
        <div className="flex items-start justify-between gap-4">
          <h1 className="font-display font-black text-[52px] leading-[0.9] tracking-[-0.04em] text-bone">
            BonesNotices
          </h1>
          <div className="flex flex-col items-end gap-1 pt-1">
            <div className="w-5 h-5 rounded-full bg-green border-2 border-bg-soft" />
            <span className="font-sans text-[10px] font-medium tracking-widest uppercase text-bone-mute">
              Vol. 01
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-3">
          <div className="h-px flex-1 bg-line" />
          <span className="font-sans text-[10px] font-medium tracking-widest uppercase text-bone-mute">
            Qüestionari polític
          </span>
          <div className="h-px flex-1 bg-line" />
        </div>
      </motion.div>

      {/* Illustration block */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative mb-6"
      >
        <div className="aspect-[4/3] bg-bg-soft rounded-2xl border border-line overflow-hidden relative">
          <img
            src="/images/home/main.jpg"
            alt="Bones Notícies"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-green flex items-center justify-center">
            <span className="font-sans text-[10px] font-bold text-ink">CAT</span>
          </div>
        </div>
      </motion.div>

      {/* Intro text */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mb-8 flex-1"
      >
        <p className="font-serif text-[15px] leading-relaxed text-bone-dim">
          La política et genera curiositat o ja fas scroll quan surt una notícia?{' '}
          <em className="not-italic font-serif text-bone">Bones Notícies</em>{' '}és un qüestionari interactiu que posa a prova
          el teu nivell de coneixement sobre l&apos;actualitat política i mediàtica.
        </p>

        <div className="mt-5 flex gap-4">
          <div className="text-center">
            <p className="font-display font-black text-2xl text-bone leading-none">8</p>
            <p className="font-sans text-[10px] font-medium uppercase tracking-wider text-bone-mute mt-0.5">Preguntes</p>
          </div>
          <div className="w-px bg-line" />
          <div className="text-center">
            <p className="font-display font-black text-2xl text-bone leading-none">~5</p>
            <p className="font-sans text-[10px] font-medium uppercase tracking-wider text-bone-mute mt-0.5">Minuts</p>
          </div>
          <div className="w-px bg-line" />
          <div className="text-center">
            <p className="font-display font-black text-2xl text-bone leading-none">26</p>
            <p className="font-sans text-[10px] font-medium uppercase tracking-wider text-bone-mute mt-0.5">Punts</p>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <button
          onClick={onStart}
          className="w-full h-14 bg-green text-ink font-display font-black text-lg uppercase tracking-widest rounded-2xl active:scale-[0.98] transition-transform no-select"
        >
          Comença
        </button>
      </motion.div>
    </div>
  );
}
