'use client';

import { useEffect, useMemo, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useQuizStore } from '@/store/useQuizStore';
import { STEPS } from '@/data/types';
import type { QuizAnswers } from '@/data/types';
import { saveResponse } from '@/lib/saveResponse';

import LandingScreen     from '@/components/screens/LandingScreen';
import NarratorScreen    from '@/components/screens/NarratorScreen';
import ResultsScreen     from '@/components/screens/ResultsScreen';
import QuestionLayout    from '@/components/layout/QuestionLayout';

import Q1Matching          from '@/components/questions/Q1Matching';
import Q2TabQuiz           from '@/components/questions/Q2TabQuiz';
import Q3MultiSelect       from '@/components/questions/Q3MultiSelect';
import Q4TabQuiz           from '@/components/questions/Q4TabQuiz';
import Q5DefinitionMatch   from '@/components/questions/Q5DefinitionMatch';
import Q6PoliticalPosition from '@/components/questions/Q6PoliticalPosition';
import Q7MediaFigures      from '@/components/questions/Q7MediaFigures';
import Q8TrueOrFalse       from '@/components/questions/Q8TrueOrFalse';

function useIsComplete(step: string, answers: QuizAnswers) {
  return useMemo(() => {
    switch (step) {
      case 'q1': return Object.keys(answers.q1 ?? {}).length === 4;
      case 'q2': return [0, 1, 2].every(i => (answers.q2 ?? {})[i] !== undefined);
      case 'q3': return (answers.q3 ?? []).length === 3;
      case 'q4': return [0, 1, 2].every(i => (answers.q4 ?? {})[i] !== undefined);
      case 'q5': return Object.keys(answers.q5 ?? {}).length === 3; // set on first drag
      case 'q6': return Object.keys(answers.q6 ?? {}).length === 4;
      case 'q7': return (answers.q7 ?? []).length === 3;
      case 'q8': return [0, 1, 2].every(i => (answers.q8 ?? {})[i] !== undefined);
      default:   return true;
    }
  }, [step, answers]);
}

function useCounts(step: string, answers: QuizAnswers): [number | undefined, number | undefined] {
  return useMemo((): [number | undefined, number | undefined] => {
    switch (step) {
      case 'q1': return [Object.keys(answers.q1 ?? {}).length, 4];
      case 'q2': return [[0,1,2].filter(i => (answers.q2 ?? {})[i] !== undefined).length, 3];
      case 'q3': return [(answers.q3 ?? []).length, 3];
      case 'q4': return [[0,1,2].filter(i => (answers.q4 ?? {})[i] !== undefined).length, 3];
      case 'q5': return [Object.keys(answers.q5 ?? {}).length > 0 ? 1 : 0, 1];
      case 'q6': return [Object.keys(answers.q6 ?? {}).length, 4];
      case 'q7': return [(answers.q7 ?? []).length, 3];
      case 'q8': return [[0,1,2].filter(i => (answers.q8 ?? {})[i] !== undefined).length, 3];
      default:   return [undefined, undefined];
    }
  }, [step, answers]);
}

const variants = {
  enter:  (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir: number) => ({ x: dir > 0 ? '-40%' : '40%', opacity: 0 }),
};

const Q_STEPS = ['q1','q2','q3','q4','q5','q6','q7','q8'];

export default function Home() {
  const store = useQuizStore();
  const { step, narrator, answers, goNext, goPrev, setNarrator, reset } = store;

  const prevStepIdx  = useRef(STEPS.indexOf(step));
  const savedRef     = useRef(false);
  const currIdx      = STEPS.indexOf(step);
  const direction    = currIdx >= prevStepIdx.current ? 1 : -1;

  // Persist result exactly once when the results screen is entered.
  // savedRef guards against double-fires on re-render; reset on restart.
  useEffect(() => {
    if (step === 'results' && !savedRef.current) {
      savedRef.current = true;
      saveResponse(answers, narrator);
    }
    if (step === 'landing') {
      savedRef.current = false; // allow saving again after a restart
    }
  }, [step, answers, narrator]);


  
  function handleGoNext() {
    prevStepIdx.current = currIdx;
    goNext();
  }
  function handleGoPrev() {
    prevStepIdx.current = currIdx;
    goPrev();
  }

  const isComplete = useIsComplete(step, answers);
  const [answered, total] = useCounts(step, answers);

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg">
      <div className="w-full max-w-[393px] min-h-screen flex flex-col bg-bg overflow-hidden relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0 flex flex-col overflow-hidden"
          >
            {step === 'landing' && (
              <LandingScreen onStart={handleGoNext} />
            )}

            {step === 'narrator' && (
              <NarratorScreen
                selected={narrator}
                onSelect={setNarrator}
                onContinue={handleGoNext}
              />
            )}

            {Q_STEPS.includes(step) && (
              <QuestionLayout
                step={step as never}
                narratorId={narrator}
                onNext={handleGoNext}
                onPrev={handleGoPrev}
                canGoNext={isComplete}
                answered={answered}
                total={total}
              >
                {step === 'q1' && <Q1Matching value={answers.q1 ?? {}}  onChange={store.setQ1} />}
                {step === 'q2' && <Q2TabQuiz  value={answers.q2 ?? {}}  onChange={store.setQ2} />}
                {step === 'q3' && <Q3MultiSelect value={answers.q3 ?? []} onChange={store.setQ3} />}
                {step === 'q4' && <Q4TabQuiz  value={answers.q4 ?? {}}  onChange={store.setQ4} />}
                {step === 'q5' && <Q5DefinitionMatch value={answers.q5 ?? {}} onChange={store.setQ5} />}
                {step === 'q6' && <Q6PoliticalPosition value={answers.q6 ?? {}} onChange={store.setQ6} />}
                {step === 'q7' && <Q7MediaFigures value={answers.q7 ?? []} onChange={store.setQ7} />}
                {step === 'q8' && <Q8TrueOrFalse value={answers.q8 ?? {}} onChange={store.setQ8} />}
              </QuestionLayout>
            )}

            {step === 'results' && (
              <ResultsScreen answers={answers} onRestart={reset} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
