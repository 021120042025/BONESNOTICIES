'use client';

import { motion } from 'framer-motion';
import { computeScore, CORRECT_Q1, CORRECT_Q2, CORRECT_Q3, CORRECT_Q4, CORRECT_Q5, CORRECT_Q6, CORRECT_Q7, CORRECT_Q8, Q1_PARTIES, Q2_MINI, Q3_OPTIONS, Q4_MINI, Q5_TERMS, Q5_DEFINITIONS, Q6_STATEMENTS, Q7_FIGURES, Q8_MINI } from '@/data/quizData';
import type { QuizAnswers } from '@/data/types';
import ProgressHeader from '../layout/ProgressHeader';

interface Props {
  answers: QuizAnswers;
  onRestart: () => void;
}

const RECOMMENDED = ['Inèdit Diari', 'no m\'importa'];

function ReviewItem({ label, correct, userAnswer, isCorrect }: {
  label: string; correct: string; userAnswer: string; isCorrect: boolean;
}) {
  return (
    <div className={`border-2 rounded-xl px-3 py-2.5 ${isCorrect ? 'border-green bg-green/10' : 'border-ink/20 bg-card'}`}>
      <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-ink/50 mb-1">{label}</p>
      <div className="flex items-start gap-2">
        <span className={`text-base font-black ${isCorrect ? 'text-ink' : 'text-red-500'}`}>
          {isCorrect ? '✓' : '✗'}
        </span>
        <div>
          <p className="font-sans text-[13px] font-semibold text-ink leading-snug">{userAnswer || '(sense resposta)'}</p>
          {!isCorrect && (
            <p className="font-sans text-[12px] text-ink/60 mt-0.5">Correcte: {correct}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResultsScreen({ answers, onRestart }: Props) {
  const score = computeScore(answers);
  const scoreDisplay = score.scoreOutOf10.toFixed(1);

  const reviewItems: { label: string; correct: string; userAnswer: string; isCorrect: boolean }[] = [];

  Q1_PARTIES.forEach(party => {
    const correct = CORRECT_Q1[party];
    const userAnswer = answers.q1?.[party] ?? '';
    reviewItems.push({ label: `P1: ${party}`, correct, userAnswer, isCorrect: userAnswer === correct });
  });

  Q2_MINI.forEach((m, i) => {
    const userAnswer = answers.q2?.[i] ?? '';
    reviewItems.push({ label: `P2.${i+1}: ${m.question.slice(0, 30)}…`, correct: CORRECT_Q2[i], userAnswer, isCorrect: userAnswer === CORRECT_Q2[i] });
  });

  Q3_OPTIONS.forEach(opt => {
    if (CORRECT_Q3.includes(opt)) {
      const selected = (answers.q3 ?? []).includes(opt);
      reviewItems.push({ label: `P3: ${opt}`, correct: 'Seleccionat', userAnswer: selected ? 'Seleccionat' : 'No seleccionat', isCorrect: selected });
    }
  });

  Q4_MINI.forEach((m, i) => {
    const userAnswer = answers.q4?.[i] ?? '';
    reviewItems.push({ label: `P4.${i+1}: ${m.question.slice(0, 30)}…`, correct: CORRECT_Q4[i], userAnswer, isCorrect: userAnswer === CORRECT_Q4[i] });
  });

  Q5_TERMS.forEach(term => {
    const defId = answers.q5?.[term] ?? '';
    const correctId = CORRECT_Q5[term];
    const defText     = (Q5_DEFINITIONS.find(d => d.id === defId)?.text.slice(0, 30) ?? '') + '…';
    const correctText = (Q5_DEFINITIONS.find(d => d.id === correctId)?.text.slice(0, 30) ?? '') + '…';
    reviewItems.push({ label: `P5: ${term}`, correct: correctText, userAnswer: defText || '(sense resposta)', isCorrect: defId === correctId });
  });

  Q6_STATEMENTS.forEach(stmt => {
    const userParty = answers.q6?.[stmt.id] ?? '';
    reviewItems.push({ label: `P6: ${stmt.text.slice(0, 25)}…`, correct: CORRECT_Q6[stmt.id], userAnswer: userParty || '(sense resposta)', isCorrect: userParty === CORRECT_Q6[stmt.id] });
  });

  Q7_FIGURES.forEach(fig => {
    if (CORRECT_Q7.includes(fig.id)) {
      const selected = (answers.q7 ?? []).includes(fig.id);
      reviewItems.push({ label: `P7: ${fig.name}`, correct: 'Seleccionat', userAnswer: selected ? 'Seleccionat' : 'No seleccionat', isCorrect: selected });
    }
  });

  Q8_MINI.forEach((m, i) => {
    const userAnswer = answers.q8?.[i] ?? '';
    reviewItems.push({ label: `P8.${i+1}: ${m.statement.slice(0, 30)}…`, correct: CORRECT_Q8[i], userAnswer: userAnswer || '(sense resposta)', isCorrect: userAnswer === CORRECT_Q8[i] });
  });

  return (
    <div className="flex flex-col h-full bg-bg">
      <ProgressHeader step="results" />

      <div className="flex-1 overflow-y-auto">
        {/* Score hero — dark zone */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="px-6 pt-6 pb-8 bg-bg"
        >
          <div className="flex items-end gap-4 mb-4">
            <div>
              <p className="font-sans text-[10px] font-medium uppercase tracking-widest text-bone-mute mb-1">Puntuació final</p>
              <div className="flex items-baseline gap-1">
                <span className="font-display font-black text-[72px] leading-none tracking-[-0.04em] text-bone">
                  {scoreDisplay}
                </span>
                <span className="font-display font-black text-2xl text-bone-mute">/10</span>
              </div>
            </div>
            <div className="mb-3">
              <div className="w-16 h-16 rounded-full bg-green flex items-center justify-center">
                <span className="font-display font-black text-xl text-ink">{score.percentage}%</span>
              </div>
            </div>
          </div>

          <div className="inline-block bg-bone px-4 py-2 rounded-full mb-3">
            <span className="font-display font-black text-[15px] text-ink uppercase tracking-tight">
              {score.category}
            </span>
          </div>

          <p className="font-serif text-[15px] text-bone-dim italic leading-snug">
            &ldquo;{score.sentence}&rdquo;
          </p>

          <div className="flex gap-5 mt-5">
            <div className="text-center">
              <p className="font-display font-black text-xl text-bone">{score.correct}</p>
              <p className="font-sans text-[10px] font-medium uppercase tracking-wider text-bone-mute">Correctes</p>
            </div>
            <div className="w-px bg-line" />
            <div className="text-center">
              <p className="font-display font-black text-xl text-bone">{score.total - score.correct}</p>
              <p className="font-sans text-[10px] font-medium uppercase tracking-wider text-bone-mute">Incorrectes</p>
            </div>
            <div className="w-px bg-line" />
            <div className="text-center">
              <p className="font-display font-black text-xl text-bone">{score.total}</p>
              <p className="font-sans text-[10px] font-medium uppercase tracking-wider text-bone-mute">Total</p>
            </div>
          </div>
        </motion.div>

        {/* Cream zone */}
        <div className="bg-light rounded-t-[28px]">
          {/* Recommended accounts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="px-6 pt-6 pb-5 border-b border-ink/10"
          >
            <p className="font-sans text-[10px] font-medium uppercase tracking-widest text-ink/40 mb-3">
              Comptes recomanats
            </p>
            <div className="flex gap-2 flex-wrap">
              {RECOMMENDED.map(acc => (
                <div key={acc} className="px-4 py-2 bg-ink rounded-full">
                  <span className="font-sans font-semibold text-[13px] text-bone">@{acc}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Answer review */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="px-4 py-5"
          >
            <p className="font-sans text-[10px] font-medium uppercase tracking-widest text-ink/40 mb-3 px-2">
              Revisió de respostes
            </p>
            <div className="space-y-2">
              {reviewItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.02 }}
                >
                  <ReviewItem {...item} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Restart */}
          <div className="px-6 pb-8">
            <button
              onClick={onRestart}
              className="w-full h-14 border-2 border-ink rounded-2xl font-display font-black text-sm uppercase tracking-widest text-ink hover:bg-card transition-colors no-select"
            >
              Torna a intentar-ho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
