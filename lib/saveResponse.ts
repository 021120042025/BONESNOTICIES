import { supabase } from './supabase';
import { computeScore } from '@/data/quizData';
import type { QuizAnswers } from '@/data/types';

/**
 * Persists a completed quiz session to the Supabase `responses` table.
 * Errors are logged but never re-thrown so callers never need to handle them.
 */
export async function saveResponse(
  answers: QuizAnswers,
  narrator: string | null,
): Promise<void> {
  const { scoreOutOf10 } = computeScore(answers);

  console.log('TRYING TO INSERT');

const { data, error } = await supabase
  .from('responses')
  .insert({
    score: scoreOutOf10,
    narrator,
    answers,
  })
  .select();

console.log('SUPABASE RESPONSE:', { data, error });