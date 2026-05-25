'use client';

import { create } from 'zustand';
import type { Step, QuizAnswers, Q1Answer, Q2Answer, Q3Answer, Q4Answer, Q5Answer, Q6Answer, Q7Answer, Q8Answer } from '@/data/types';
import { STEPS } from '@/data/types';

interface QuizStore {
  step: Step;
  narrator: string | null;
  answers: QuizAnswers;

  setNarrator: (id: string) => void;
  goNext: () => void;
  goPrev: () => void;
  goTo: (step: Step) => void;

  setQ1: (v: Q1Answer) => void;
  setQ2: (v: Q2Answer) => void;
  setQ3: (v: Q3Answer) => void;
  setQ4: (v: Q4Answer) => void;
  setQ5: (v: Q5Answer) => void;
  setQ6: (v: Q6Answer) => void;
  setQ7: (v: Q7Answer) => void;
  setQ8: (v: Q8Answer) => void;

  reset: () => void;
}

const initial: Pick<QuizStore, 'step' | 'narrator' | 'answers'> = {
  step: 'landing',
  narrator: null,
  answers: {},
};

export const useQuizStore = create<QuizStore>((set, get) => ({
  ...initial,

  setNarrator: (id) => set({ narrator: id }),

  goNext: () => {
    const idx = STEPS.indexOf(get().step);
    if (idx < STEPS.length - 1) set({ step: STEPS[idx + 1] });
  },

  goPrev: () => {
    const idx = STEPS.indexOf(get().step);
    if (idx > 0) set({ step: STEPS[idx - 1] });
  },

  goTo: (step) => set({ step }),

  setQ1: (v) => set(s => ({ answers: { ...s.answers, q1: v } })),
  setQ2: (v) => set(s => ({ answers: { ...s.answers, q2: v } })),
  setQ3: (v) => set(s => ({ answers: { ...s.answers, q3: v } })),
  setQ4: (v) => set(s => ({ answers: { ...s.answers, q4: v } })),
  setQ5: (v) => set(s => ({ answers: { ...s.answers, q5: v } })),
  setQ6: (v) => set(s => ({ answers: { ...s.answers, q6: v } })),
  setQ7: (v) => set(s => ({ answers: { ...s.answers, q7: v } })),
  setQ8: (v) => set(s => ({ answers: { ...s.answers, q8: v } })),

  reset: () => set(initial),
}));
