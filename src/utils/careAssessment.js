/**
 * Initial Care & Service Assessment — question set + internal scoring matrix.
 *
 * Source of truth: BHLI "Scoring of Care Assessment" matrix (max 50 core points).
 * The API mirrors this file at `api/src/modules/leads/careAssessment.ts` and
 * recomputes the score server-side, so the care team's dashboard figure never
 * depends on the browser. Keep the two in sync — any point value, option label,
 * or tier band changed here must be changed there as well.
 */

// ── 1. Mobility — max 6 ───────────────────────────────────────────────────────
export const MOBILITY_ITEMS = [
  { label: 'Independent',         points: 0 },
  { label: 'Requires Assistance', points: 1 },
  { label: 'Uses Cane',           points: 2 },
  { label: 'Uses Walker',         points: 3 },
  { label: 'Uses Wheelchair',     points: 4 },
  { label: 'Bedbound',            points: 6 },
];

// ── 2. Activities of Daily Living — 6 activities × max 2 = max 12 ─────────────
export const ADL_ACTIVITIES = [
  { key: 'bathing',   label: 'Bathing' },
  { key: 'dressing',  label: 'Dressing' },
  { key: 'grooming',  label: 'Grooming' },
  { key: 'toileting', label: 'Toileting' },
  { key: 'feeding',   label: 'Feeding/Eating' },
  { key: 'transfers', label: 'Transfers & Mobility' },
];

export const ADL_LEVELS = [
  { label: 'Independent / Supervision', points: 0 },
  { label: 'Requires Assistance',       points: 1 },
  { label: 'Dependent',                 points: 2 },
];

// ── 3. Continence — max 4 ─────────────────────────────────────────────────────
export const CONTINENCE_ITEMS = [
  { label: 'Continent',              points: 0 },
  { label: 'Occasionally Incontinent', points: 1 },
  { label: 'Uses Diapers',            points: 2 },
  { label: 'Incontinent',             points: 3 },
  { label: 'Uses Catheter',           points: 4 },
];

// ── 4. Cognitive status — max 8 ───────────────────────────────────────────────
export const COGNITION_ITEMS = [
  { label: 'Normal',              points: 0 },
  { label: 'Mild Forgetfulness',  points: 2 },
  { label: 'Moderate Dementia',   points: 5 },
  { label: 'Severe Dementia',     points: 8 },
];

/**
 * Behavioural / supervision needs carry no point value in the matrix — they are
 * captured as a flag that may still change the care team's final recommendation.
 */
export const BEHAVIOR_ITEMS = ['No', 'Yes'];

// ── 5. Nursing requirements — 1 point each, max 8 ─────────────────────────────
export const NURSING_ITEMS = [
  'Wound Care',
  'Oxygen Therapy',
  'Nebulization',
  'Catheter Care',
  'Tube / PEG Feeding',
  'Suctioning',
  'IV Medication',
  'Frequent RN Monitoring',
];

export const NURSING_NONE = 'None of the above';

// ── 6. Clinical risk — 4 categories × max 3 = max 12 ──────────────────────────
export const RISK_CATEGORIES = [
  { key: 'fall',           label: 'Fall Risk' },
  { key: 'aspiration',     label: 'Aspiration Risk' },
  { key: 'pressureInjury', label: 'Pressure Injury Risk' },
  { key: 'infection',      label: 'Infection Risk' },
];

export const RISK_LEVELS = [
  { label: 'None',     points: 0 },
  { label: 'Low',      points: 1 },
  { label: 'Moderate', points: 2 },
  { label: 'High',     points: 3 },
];

// ── 7. Nutrition & swallowing — collected for care planning, no points ────────
export const DIET_ITEMS = ['Regular', 'Soft', 'Minced', 'Pureed', 'Thickened Fluids'];
export const APPETITE_ITEMS = ['Good', 'Fair', 'Poor'];
export const SWALLOWING_ITEMS = ['No', 'Yes'];

// ── Care level bands ──────────────────────────────────────────────────────────
export const CARE_TIERS = [
  { min: 0,  max: 0,  level: 'Independent',                                        rate: 95000 },
  { min: 1,  max: 10, level: 'Level 1 – Minimal Care Support',                      rate: 117500 },
  { min: 11, max: 20, level: 'Level 2 – Moderate Care Support',                      rate: 133250 },
  { min: 21, max: 30, level: 'Level 3 – Extensive Care Support',                     rate: 150500 },
  { min: 31, max: 40, level: 'Level 4 – Dementia or Comprehensive Care Management',  rate: 162250 },
  { min: 41, max: 50, level: 'Level 5 – Palliative Care',                            rate: 188000 },
];

export const MAX_CORE_SCORE = 50;

export const emptyAssessment = () => ({
  mobility: '',
  adl: Object.fromEntries(ADL_ACTIVITIES.map((a) => [a.key, ''])),
  continence: '',
  cognition: '',
  behaviorSupervision: '',
  nursing: [],
  risks: Object.fromEntries(RISK_CATEGORIES.map((r) => [r.key, ''])),
  nutrition: { diet: '', appetite: '', swallowingDifficulty: '' },
});

const pointsFor = (items, label) => items.find((i) => i.label === label)?.points ?? 0;

/** Sum of a keyed group (ADLs, clinical risks) against its own level table. */
const groupScore = (groupKeys, answers, levels) =>
  groupKeys.reduce((sum, { key }) => sum + pointsFor(levels, answers?.[key]), 0);

export function tierForScore(score) {
  return CARE_TIERS.find((t) => score >= t.min && score <= t.max) ?? CARE_TIERS[CARE_TIERS.length - 1];
}

/**
 * Computes the core score, per-section breakdown, and the resulting care tier.
 * Unanswered questions simply score 0, so this is safe to call on a partially
 * filled form (the live running total during data entry).
 */
export function scoreAssessment(a) {
  const nursing = Array.isArray(a?.nursing) ? a.nursing : [];

  const sections = {
    mobility:   { label: 'Mobility',                   score: pointsFor(MOBILITY_ITEMS, a?.mobility),      max: 6 },
    adl:        { label: 'Activities of Daily Living', score: groupScore(ADL_ACTIVITIES, a?.adl, ADL_LEVELS), max: 12 },
    continence: { label: 'Continence',                 score: pointsFor(CONTINENCE_ITEMS, a?.continence),  max: 4 },
    cognition:  { label: 'Cognitive Status',           score: pointsFor(COGNITION_ITEMS, a?.cognition),    max: 8 },
    nursing:    { label: 'Nursing Requirements',       score: nursing.filter((n) => NURSING_ITEMS.includes(n)).length, max: 8 },
    risks:      { label: 'Clinical Risk',              score: groupScore(RISK_CATEGORIES, a?.risks, RISK_LEVELS), max: 12 },
  };

  const totalScore = Object.values(sections).reduce((sum, s) => sum + s.score, 0);
  const tier = tierForScore(totalScore);

  return {
    sections,
    totalScore,
    maxScore: MAX_CORE_SCORE,
    careLevel: tier.level,
    estimatedMonthlyRate: tier.rate,
    behaviorFlag: a?.behaviorSupervision === 'Yes',
  };
}

/** Questions that must be answered before a score is meaningful. */
export function unansweredQuestions(a) {
  const missing = [];
  if (!a?.mobility) missing.push({ section: 'Mobility', field: 'mobility', label: 'How the resident moves around' });

  ADL_ACTIVITIES.forEach(({ key, label }) => {
    if (!a?.adl?.[key]) missing.push({ section: 'Activities of Daily Living', field: `adl.${key}`, label });
  });

  if (!a?.continence) missing.push({ section: 'Continence', field: 'continence', label: 'Bladder / bowel continence' });
  if (!a?.cognition) missing.push({ section: 'Cognitive Status', field: 'cognition', label: 'Memory and cognitive condition' });
  if (!a?.behaviorSupervision) missing.push({ section: 'Cognitive Status', field: 'behaviorSupervision', label: 'Behavioral / supervision needs' });
  if (!Array.isArray(a?.nursing) || a.nursing.length === 0)
    missing.push({ section: 'Nursing Requirements', field: 'nursing', label: 'Nursing requirements (or “None of the above”)' });

  RISK_CATEGORIES.forEach(({ key, label }) => {
    if (!a?.risks?.[key]) missing.push({ section: 'Clinical Risk Assessment', field: `risks.${key}`, label });
  });

  return missing;
}

export function assessmentProgress(a) {
  // Mobility + 6 ADLs + continence + cognition + behaviour + nursing + 4 risks
  const total = 15;
  const answered = total - unansweredQuestions(a).length;
  return { answered, total, percent: Math.round((answered / total) * 100) };
}

export const formatPeso = (amount) =>
  `₱${Number(amount).toLocaleString('en-PH', { maximumFractionDigits: 0 })}`;
