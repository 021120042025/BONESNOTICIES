'use client';

import type { ReactNode } from 'react';
import type { Step } from '@/data/types';
import ProgressHeader   from './ProgressHeader';
import NavigationFooter from './NavigationFooter';
import NarratorBubble   from './NarratorBubble';
import { QUESTION_TEXTS } from '@/data/quizData';

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
  return (
    <div className="flex flex-col h-full bg-bg">

      {/* ── Dark zone ───────────────────────────────── */}
      <ProgressHeader step={step} />

      <NarratorBubble
        narratorId={narratorId}
        text={QUESTION_TEXTS[step] ?? ''}
      />

      {/* ── Cream zone ──────────────────────────────── */}
      <div
        className="flex-1 flex flex-col bg-light overflow-hidden min-h-0"
        style={{
          borderRadius: '28px 28px 0 0',
          position: 'relative',
        }}
      >
        {/* Subtle separator line between zones */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, height: '1px',
            background: 'rgba(26,20,16,0.08)',
          }}
        />
        <div
          className="flex-1 overflow-y-auto overscroll-contain"
          style={{ padding: '22px 18px 0' }}
        >
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
