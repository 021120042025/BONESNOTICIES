import { supabase } from './supabase';
import { computeScore } from '@/data/quizData';
import type { QuizAnswers } from '@/data/types';

/**
 * Persists a completed quiz session to the Supabase `responses` table.
 * Errors are logged but never re-thrown so callers never need to handle them.
 */
export async function saveResponse(
  answers: QuizAnswers,
  narrator: string,
): Promise<void> {
  const { scoreOutOf10 } = computeScore(answers);

  const { error } = await supabase.from('responses').insert({
    score:    scoreOutOf10,
    narrator,
    answers,             // stored as jsonb
  });

  if (error) {
    console.error('[saveResponse] Failed to save quiz result:', error.message);
  }
}
