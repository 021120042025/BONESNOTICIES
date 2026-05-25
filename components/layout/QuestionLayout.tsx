'use client';

import type { ReactNode } from 'react';
import type { Step } from '@/data/types';
import ProgressHeader from './ProgressHeader';
import NavigationFooter from './NavigationFooter';
import NarratorBubble from './NarratorBubble';
import { QUESTION_TEXTS } from '@/data/quizData';

const Q_NUMBERS: Record<string, number> = {
  q1: 1, q2: 2, q3: 3, q4: 4, q5: 5, q6: 6, q7: 7, q8: 8,
};

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
  const qNum = Q_NUMBERS[step];

  return (
    <div className="flex flex-col h-full bg-bg">
      {/* Dark zone */}
      <ProgressHeader step={step} />
      <NarratorBubble
        narratorId={narratorId}
        text={QUESTION_TEXTS[step] ?? ''}
        questionNumber={qNum}
      />

      {/* Cream zone — rises over dark */}
      <div className="flex-1 flex flex-col bg-light rounded-t-[28px] overflow-hidden min-h-0">
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 pt-5 pb-4">
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
