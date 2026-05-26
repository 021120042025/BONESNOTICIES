'use client';

import { motion } from 'framer-motion';

interface Props {
  onStart: () => void;
}

export default function LandingScreen({ onStart }: Props) {
  return (
    <div className="flex flex-col h-full bg-bg px-6 pt-8 pb-6 select-none">

      {/* ── Top label ───────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="font-sans text-[11px] font-semibold tracking-[0.18em] uppercase text-green mb-4"
      >
        ↳ Qüestionari · 8 Preguntes
      </motion.p>

      {/* ── Title ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="mb-5"
      >
        <h1
          className="font-display font-black text-bone"
          style={{ fontSize: '64px', lineHeight: 0.88, letterSpacing: '-0.04em' }}
        >
          Bones<br />
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            Notícies
            <span
              style={{
                display: 'inline-block',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#00ff00',
                flexShrink: 0,
              }}
            />
          </span>
        </h1>
      </motion.div>

      {/* ── Image (grows to fill remaining space) ───── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex-1 relative mb-5"
        style={{ minHeight: '200px' }}
      >
        <div
          className="w-full h-full overflow-hidden relative"
          style={{ borderRadius: '18px' }}
        >
          <img
            src="/images/home/main.jpg"
            alt="Bones Notícies"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {/* Green CAT overlay — kept exactly as-is */}
          <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-green flex items-center justify-center">
            <span className="font-sans text-[10px] font-bold text-ink">CAT</span>
          </div>
        </div>
      </motion.div>

      {/* ── Tagline ─────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="font-serif mb-6 text-bone-dim"
        style={{ fontSize: '15px', lineHeight: 1.45, fontStyle: 'italic' }}
      >
        ¿Saps qui mana realment al Congrés? Posa&apos;t a prova.
      </motion.p>

      {/* ── CTA ─────────────────────────────────────── */}
      <motion.button
        onClick={onStart}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        whileTap={{ scale: 0.98 }}
        className="no-select w-full bg-green text-ink font-display font-black uppercase tracking-widest rounded-full flex items-center justify-between"
        style={{ height: '56px', fontSize: '17px', paddingLeft: '28px', paddingRight: '28px' }}
      >
        <span>Comença</span>
        <span style={{ fontSize: '20px', lineHeight: 1 }}>→</span>
      </motion.button>

    </div>
  );
}
