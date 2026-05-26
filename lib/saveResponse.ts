import { getSupabaseClient } from './supabase';
import { computeScore } from '@/data/quizData';
import type { QuizAnswers } from '@/data/types';

/**
 * Persists a completed quiz session to the Supabase `responses` table.
 *
 * No-ops silently when called during SSR / static prerender (getSupabaseClient
 * returns null). Errors are logged but never re-thrown so the caller is
 * never interrupted by a network failure.
 */
export async function saveResponse(
  answers: QuizAnswers,
  narrator: string | null,
): Promise<void> {
  const client = getSupabaseClient();
  if (!client) return; // SSR, prerender, or env vars not set — skip

  const { scoreOutOf10 } = computeScore(answers);

  const { error } = await client
    .from('responses')
    .insert({
      score:    scoreOutOf10,
      narrator,
      answers,             // serialised as jsonb by Supabase
    });

  if (error) {
    console.error(
      '[saveResponse] Insert failed:',
      error.message,
      '| code:', error.code,
      '| details:', error.details,
      '| hint:', error.hint,
    );
  }
}
