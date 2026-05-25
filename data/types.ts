export type Step = 'landing' | 'narrator' | 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'q6' | 'q7' | 'q8' | 'results';

export const STEPS: Step[] = ['landing', 'narrator', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'results'];

export interface Narrator {
  id: string;
  name: string;
  initials: string;
  bgClass: string;
  role: string;
}

export type Q1Answer = Record<string, string>;   // party -> politician
export type Q2Answer = Record<number, string>;   // miniIdx -> option
export type Q3Answer = string[];
export type Q4Answer = Record<number, string>;
export type Q5Answer = Record<string, string>;   // term -> definitionId
export type Q6Answer = Record<string, string>;   // statementId -> party
export type Q7Answer = string[];
export type Q8Answer = Record<number, string>;   // miniIdx -> 'VERITAT'|'FALS'

export interface QuizAnswers {
  q1?: Q1Answer;
  q2?: Q2Answer;
  q3?: Q3Answer;
  q4?: Q4Answer;
  q5?: Q5Answer;
  q6?: Q6Answer;
  q7?: Q7Answer;
  q8?: Q8Answer;
}

export interface ScoreResult {
  correct: number;
  total: number;
  scoreOutOf10: number;
  percentage: number;
  byQuestion: Record<string, number>;
  category: string;
  sentence: string;
}
