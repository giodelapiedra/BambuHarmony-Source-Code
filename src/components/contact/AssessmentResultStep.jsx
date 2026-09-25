import { Info, ShieldCheck } from 'lucide-react';
import {
  ADL_ACTIVITIES,
  RISK_CATEGORIES,
  NURSING_NONE,
  formatPeso,
} from '../../utils/careAssessment';

/**
 * Step 5 — Estimated Care & Accommodation Cost.
 *
 * Shows the care level and indicative monthly rate derived from Step 4 before the
 * inquirer commits to the final step. The internal point values are intentionally
 * not displayed here — only the resulting level, the rate, and a plain-language
 * recap of the answers given. The numeric score stays in the admin dashboard.
 */

function Recap({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <span className="text-xs text-charcoal/50">{label}</span>
      <span className="text-right text-sm font-medium text-charcoal/85">{value}</span>
    </div>
  );
}

const joinAnswers = (rows, values) =>
  rows
    .map(({ key, label }) => (values?.[key] ? `${label}: ${values[key]}` : null))
    .filter(Boolean)
    .join(' · ');

function AssessmentResultStep({ assessment, result }) {
  const { careLevel, estimatedMonthlyRate, behaviorFlag } = result;
  const nursing = assessment.nursing ?? [];
  const nursingText = nursing.length === 0 || nursing.includes(NURSING_NONE) ? 'None' : nursing.join(', ');
  const nutrition = [
    assessment.nutrition?.diet && `Diet: ${assessment.nutrition.diet}`,
    assessment.nutrition?.appetite && `Appetite: ${assessment.nutrition.appetite}`,
    assessment.nutrition?.swallowingDifficulty && `Swallowing difficulty: ${assessment.nutrition.swallowingDifficulty}`,
  ].filter(Boolean).join(' · ');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl text-forest">Estimated Care &amp; Accommodation Cost</h2>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
          Based on the information provided, your assessment has generated an estimated care level and
          monthly service cost.
        </p>
      </div>

      {/* Result card */}
      <div className="overflow-hidden rounded-2xl bg-forest text-white shadow-lg">
        <div className="px-6 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">Your Estimated Result</p>

          <div className="mt-4">
            <p className="text-xs uppercase tracking-wide text-white/50">Estimated Care Level</p>
            <p className="mt-1 font-serif text-xl leading-snug text-white">{careLevel}</p>
          </div>

          <div className="mt-5 border-t border-white/10 pt-4">
            <p className="text-xs uppercase tracking-wide text-white/50">
              Estimated Monthly Service &amp; Accommodation Cost
            </p>
            <p className="mt-1 font-serif text-3xl text-gold sm:text-4xl">{formatPeso(estimatedMonthlyRate)}</p>
            <p className="mt-1 text-xs text-white/45">per month, indicative average</p>
          </div>
        </div>

        {behaviorFlag && (
          <div className="flex items-start gap-2.5 bg-white/[0.07] px-6 py-3.5 text-xs leading-relaxed text-white/70">
            <Info size={14} className="mt-0.5 shrink-0 text-gold" />
            <span>
              You indicated behaviors or supervision needs requiring additional management. Our care team
              will review this with you, as it may affect the final care recommendation.
            </span>
          </div>
        )}
      </div>

      {/* Recap */}
      <div className="rounded-2xl border border-cream bg-ivory p-5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-bamboo">Assessment Summary</p>
        <p className="mt-1.5 text-sm leading-relaxed text-charcoal/70">
          Your assessment indicates the level of support that may be appropriate based on the information
          provided.
        </p>
        <div className="mt-3 divide-y divide-cream">
          <Recap label="Mobility" value={assessment.mobility} />
          <Recap label="Activities of Daily Living" value={joinAnswers(ADL_ACTIVITIES, assessment.adl)} />
          <Recap label="Continence" value={assessment.continence} />
          <Recap label="Cognitive status" value={assessment.cognition} />
          <Recap label="Behavioral / supervision needs" value={assessment.behaviorSupervision} />
          <Recap label="Nursing requirements" value={nursingText} />
          <Recap label="Clinical risk" value={joinAnswers(RISK_CATEGORIES, assessment.risks)} />
          <Recap label="Nutrition & swallowing" value={nutrition} />
        </div>
      </div>

      {/* Continue prompt */}
      <div className="rounded-2xl border border-bamboo/30 bg-bamboo/[0.06] p-5">
        <p className="text-sm font-semibold text-forest">
          Do you wish to submit this assessment to schedule a Care consultation?
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-charcoal/70">
          Continue to the final step to choose how you&apos;d like to proceed — talk to a Care Advisor or
          book a facility visit. A Bambu Harmony care representative may contact you to review your
          assessment and obtain additional information, if necessary.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2.5 rounded-xl bg-cream/40 px-4 py-3.5">
        <ShieldCheck size={15} className="mt-0.5 shrink-0 text-bamboo" />
        <p className="text-xs leading-relaxed text-charcoal/60">
          <strong className="font-semibold text-charcoal/80">Disclaimer.</strong> This online assessment is
          intended for initial screening and cost estimation purposes only. It does not replace a
          professional clinical or care assessment. Final care level, service inclusions, accommodation,
          and applicable rates will be determined by Bambu Harmony based on a complete assessment and
          review of the resident&apos;s needs.
        </p>
      </div>
    </div>
  );
}

export default AssessmentResultStep;
