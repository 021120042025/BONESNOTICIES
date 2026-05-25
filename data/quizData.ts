import type { Narrator, QuizAnswers, ScoreResult } from './types';

// ─── Narrators ───────────────────────────────────────────────────────────────

export const NARRATORS: Narrator[] = [
  { id: 'marc-giro',       name: 'Marc Giró',       initials: 'MG', bgClass: 'bg-near-black', role: 'Periodista · TV3' },
  { id: 'jordi-evole',     name: 'Jordi Évole',     initials: 'JÉ', bgClass: 'bg-near-black', role: 'Periodista · laSexta' },
  { id: 'juana-dolores',   name: 'Juana Dolores',   initials: 'JD', bgClass: 'bg-near-black', role: 'Periodista · El Monde' },
  { id: 'alba-riera',      name: 'Alba Riera',      initials: 'AR', bgClass: 'bg-near-black', role: 'Periodista · VilaWeb' },
  { id: 'samantha-hudson', name: 'Samantha Hudson', initials: 'SH', bgClass: 'bg-near-black', role: 'Artista · Comunicadora' },
  { id: 'roma-gallardo',   name: 'Roma Gallardo',   initials: 'RG', bgClass: 'bg-near-black', role: 'Periodista · Betevé' },
];

// ─── Question 1 ──────────────────────────────────────────────────────────────

export const Q1_PARTIES    = ['En Comú Podem', 'CUP', 'Aliança Catalana', 'Junts'];
export const Q1_POLITICIANS = ['Ada Colau', 'Laia Estrada', 'Sílvia Orriols', 'Míriam Nogueras'];

export const CORRECT_Q1: Record<string, string> = {
  'En Comú Podem':   'Ada Colau',
  'CUP':             'Laia Estrada',
  'Aliança Catalana':'Sílvia Orriols',
  'Junts':           'Míriam Nogueras',
};

// ─── Question 2 ──────────────────────────────────────────────────────────────

export const Q2_MINI = [
  {
    question: 'La Míriam Nogueras és diputada al:',
    options:  ['Parlament de Catalunya', 'Congrés dels Diputats', 'Parlament Europeu'],
    correct:  'Congrés dels Diputats',
    image:    'congres',
  },
  {
    question: "On es discuteixen coses com la sequera, Rodalies o el preu del lloguer a Catalunya?",
    options:  ['Parlament Europeu', 'Parlament de Catalunya', 'Senat'],
    correct:  'Parlament de Catalunya',
    image:    'parlament',
  },
  {
    question: "On es decideixen normes que afecten des dels carregadors USB-C fins a la intel·ligència artificial?",
    options:  ['Parlament Europeu', 'Parlament de Catalunya', 'ONU'],
    correct:  'Parlament Europeu',
    image:    'europeu',
  },
];

export const CORRECT_Q2: Record<number, string> = {
  0: 'Congrés dels Diputats',
  1: 'Parlament de Catalunya',
  2: 'Parlament Europeu',
};

// ─── Question 3 ──────────────────────────────────────────────────────────────

export const Q3_OPTIONS = [
  'Rodalies',
  'Regulació dels pisos turístics',
  'Servei militar obligatori',
  'Regulació de criptomonedes',
  'Política lingüística a les escoles',
  'Limitació de TikTok per menors',
];

export const CORRECT_Q3 = ['Rodalies', 'Regulació dels pisos turístics', 'Política lingüística a les escoles'];

// ─── Question 4 ──────────────────────────────────────────────────────────────

export const Q4_MINI = [
  {
    question: 'Quin és el sistema per repartir els escons utilitzat a Espanya?',
    options:  ["Llei D'Hondt", 'Sistema Sainte-Laguë', 'Model Westminster'],
    correct:  "Llei D'Hondt",
  },
  {
    question: 'A quines zones afavoreix aquest sistema?',
    options:  ['Zones rurals (menor densitat de població)', 'Nuclis urbans massius', "Zones de l'interior de la península"],
    correct:  'Zones rurals (menor densitat de població)',
  },
  {
    question: 'Quin és el percentatge mínim de vots perquè un partit pugui tenir representació al congrés?',
    options:  ['1%', '3%', '7%'],
    correct:  '3%',
  },
];

export const CORRECT_Q4: Record<number, string> = {
  0: "Llei D'Hondt",
  1: 'Zones rurals (menor densitat de població)',
  2: '3%',
};

// ─── Question 5 ──────────────────────────────────────────────────────────────

export const Q5_TERMS = ['Vot nul', 'Vot en blanc', 'Abstenció'];

export const Q5_DEFINITIONS = [
  { id: 'vot-nul',    text: "Aquell vot que s'emet amb irregularitats i, per tant, es considera invàlid i no es computa." },
  { id: 'vot-blanc',  text: "Vot vàlid que s'emet utilitzant un sobre buit." },
  { id: 'abstencio',  text: "No-participació voluntària dels ciutadans amb dret a vot." },
];

export const CORRECT_Q5: Record<string, string> = {
  'Vot nul':    'vot-nul',
  'Vot en blanc':'vot-blanc',
  'Abstenció':  'abstencio',
};

// ─── Question 6 ──────────────────────────────────────────────────────────────

export const Q6_STATEMENTS = [
  {
    id: 'ac',
    text: "Relaciona la crisi de l'habitatge amb l'augment de població estrangera, defensa prioritzar residents locals en ajuts públics, endureix mesures antiocupació i rebutja limitar els preus del lloguer.",
    correct: 'Aliança Catalana',
  },
  {
    id: 'psoe',
    text: "Aposta per combinar habitatge públic i col·laboració privada, impulsant ajudes al lloguer, regulació de preus en zones tensionades i incentius per augmentar l'oferta d'habitatge assequible.",
    correct: 'PSOE',
  },
  {
    id: 'er',
    text: "Defensa crear més habitatge públic, regular els preus del lloguer i limitar l'especulació immobiliària.",
    correct: 'Esquerra Republicana',
  },
  {
    id: 'vox',
    text: "Defensa reduir impostos i eliminar regulacions del mercat immobiliari, rebutjant el control dels lloguers i prioritzant mesures contra l'ocupació il·legal.",
    correct: 'VOX',
  },
];

export const Q6_PARTIES = ['Aliança Catalana', 'PSOE', 'Esquerra Republicana', 'VOX'];

export const CORRECT_Q6: Record<string, string> = {
  ac:   'Aliança Catalana',
  psoe: 'PSOE',
  er:   'Esquerra Republicana',
  vox:  'VOX',
};

// ─── Question 7 ──────────────────────────────────────────────────────────────

export const Q7_FIGURES = [
  { id: 'rufian',      name: 'Gabriel Rufián',     initials: 'GR', party: 'ERC' },
  { id: 'ayuso',       name: 'Isabel Díaz Ayuso',  initials: 'IA', party: "PP · Madrid" },
  { id: 'yolanda',     name: 'Yolanda Díaz',       initials: 'YD', party: 'Sumar' },
  { id: 'rivera',      name: 'Albert Rivera',      initials: 'AR', party: "Cs (retirat)" },
  { id: 'artur-mas',   name: 'Artur Mas',          initials: 'AM', party: "CDC (retirat)" },
  { id: 'jordi-pujol', name: 'Jordi Pujol',        initials: 'JP', party: "CDC (retirat)" },
];

export const CORRECT_Q7 = ['rufian', 'ayuso', 'yolanda'];

// ─── Question 8 ──────────────────────────────────────────────────────────────

export const Q8_MINI = [
  {
    statement: "Els diputats del Congrés cobren un sou vitalici només per haver ocupat el càrrec una vegada.",
    correct:   'FALS',
  },
  {
    statement: "Els vots en blanc beneficien els partits més grans en el repartiment d'escons.",
    correct:   'VERITAT',
  },
  {
    statement: "Els partits polítics reben diners públics segons els seus resultats electorals.",
    correct:   'VERITAT',
  },
];

export const CORRECT_Q8: Record<number, string> = { 0: 'FALS', 1: 'VERITAT', 2: 'VERITAT' };

// ─── Scoring ─────────────────────────────────────────────────────────────────

export const TOTAL_POINTS = 26;

export const RESULT_CATEGORIES = [
  { min: 0,   max: 2.9,  category: 'Modo scroll infinit',          sentence: "Potser has esquivat massa titulars últimament." },
  { min: 3,   max: 4.9,  category: 'Et sonen les coses',           sentence: "Tens els titulars, però falta context." },
  { min: 5,   max: 6.9,  category: 'Bastant connectat',            sentence: "No fas scroll tan ràpid quan surt política." },
  { min: 7,   max: 10,   category: 'Polititzat professionalment',  sentence: "Probablement discuteixes sobre Rodalies sense que ningú t'ho demani." },
];

export function computeScore(answers: QuizAnswers): ScoreResult {
  const q1 = Object.entries(answers.q1 ?? {}).filter(([p, pol]) => CORRECT_Q1[p] === pol).length;
  const q2 = [0, 1, 2].filter(i => answers.q2?.[i] === CORRECT_Q2[i]).length;
  const q3 = (answers.q3 ?? []).filter(o => CORRECT_Q3.includes(o)).length;
  const q4 = [0, 1, 2].filter(i => answers.q4?.[i] === CORRECT_Q4[i]).length;
  const q5 = Object.entries(answers.q5 ?? {}).filter(([t, d]) => CORRECT_Q5[t] === d).length;
  const q6 = Object.entries(answers.q6 ?? {}).filter(([s, p]) => CORRECT_Q6[s] === p).length;
  const q7 = (answers.q7 ?? []).filter(id => CORRECT_Q7.includes(id)).length;
  const q8 = [0, 1, 2].filter(i => answers.q8?.[i] === CORRECT_Q8[i]).length;

  const correct = q1 + q2 + q3 + q4 + q5 + q6 + q7 + q8;
  const scoreOutOf10 = parseFloat(((correct / TOTAL_POINTS) * 10).toFixed(1));
  const percentage = Math.round((correct / TOTAL_POINTS) * 100);
  const cat = RESULT_CATEGORIES.find(c => scoreOutOf10 >= c.min && scoreOutOf10 <= c.max)
    ?? RESULT_CATEGORIES[RESULT_CATEGORIES.length - 1];

  return {
    correct,
    total: TOTAL_POINTS,
    scoreOutOf10,
    percentage,
    byQuestion: { q1, q2, q3, q4, q5, q6, q7, q8 },
    category: cat.category,
    sentence: cat.sentence,
  };
}

// Question text used by NarratorBubble
export const QUESTION_TEXTS: Record<string, string> = {
  q1: "Relaciona els següents polítics amb el partit del qual formen part.",
  q2: "On para cadascú? Identifica les institucions on actuen aquestes coses.",
  q3: "Quins dels següents temes ocupen actualment el debat al Parlament de Catalunya?",
  q4: "Com s'organitza el repartiment d'escons?",
  q5: "Reordena les següents definicions amb el seu terme corresponent.",
  q6: "Quin partit polític defensa cada una d'aquestes postures sobre l'habitatge?",
  q7: "Quins dels següents personatges polítics ocupen actualment el debat mediàtic?",
  q8: "Veritat o fals? Tria sense pensar-ho gaire.",
};
