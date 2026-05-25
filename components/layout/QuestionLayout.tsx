'use client';

import type { ReactNode } from 'react';
import type { Step } from '@/data/types';
import ProgressHeader        from './ProgressHeader';
import NavigationFooter      from './NavigationFooter';
import NarratorBubble        from './NarratorBubble';
import QuestionIllustration  from './QuestionIllustration';
import { QUESTION_TEXTS }    from '@/data/quizData';

const Q_NUMBERS: Record<string, number> = {
  q1: 1, q2: 2, q3: 3, q4: 4, q5: 5, q6: 6, q7: 7, q8: 8,
};

/* Match questions suppress narrator + illustration — the component fills the space itself */
const MATCH_STEPS = new Set(['q1', 'q5']);

interface Props {
  step: Step;
  narratorId: string | null;
  children: ReactNode;
  onNext: () => void;
  onPrev: () => void;
  canGoNext: boolean;
  answered?: number;
  total?: number;
  nextLabel?: string;
}

export default function QuestionLayout({
  step, narratorId, children, onNext, onPrev, canGoNext,
  answered, total, nextLabel,
}: Props) {
  const qNum         = Q_NUMBERS[step];
  const isMatchStep  = MATCH_STEPS.has(step);

  return (
    <div className="flex flex-col h-full bg-bg">

      {/* ── Dark zone ───────────────────────────────── */}
      <ProgressHeader step={step} />

      {!isMatchStep && (
        <>
          <NarratorBubble
            narratorId={narratorId}
            text={QUESTION_TEXTS[step] ?? ''}
          />
          <QuestionIllustration questionNumber={qNum} />
        </>
      )}

      {/* ── Cream zone ──────────────────────────────── */}
      <div className="flex-1 flex flex-col bg-light rounded-t-[28px] overflow-hidden min-h-0 mt-[10px]">
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 pt-5 pb-3">
          {children}
        </div>
        <NavigationFooter
          onPrev={onPrev}
          onNext={onNext}
          canGoBack={true}
          canGoNext={canGoNext}
          answered={answered}
          total={total}
          nextLabel={nextLabel}
        />
      </div>

    </div>
  );
}
