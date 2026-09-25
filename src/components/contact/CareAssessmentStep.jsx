import { Check } from 'lucide-react';
import {
  MOBILITY_ITEMS,
  ADL_ACTIVITIES,
  ADL_LEVELS,
  CONTINENCE_ITEMS,
  COGNITION_ITEMS,
  BEHAVIOR_ITEMS,
  NURSING_ITEMS,
  NURSING_NONE,
  RISK_CATEGORIES,
  RISK_LEVELS,
  DIET_ITEMS,
  APPETITE_ITEMS,
  SWALLOWING_ITEMS,
  assessmentProgress,
} from '../../utils/careAssessment';

/**
 * Step 4 — Initial Care & Service Assessment.
 *
 * Presented as a checklist: every answer is a tickable box. Point values are
 * deliberately never shown to the inquirer; scoring happens in the background
 * (see utils/careAssessment) and surfaces only as the estimate on the next step.
 */

// ── Primitives ────────────────────────────────────────────────────────────────

function CheckBox({ checked }) {
  return (
    <span
      aria-hidden="true"
      className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border transition-all ${
        checked ? 'border-bamboo bg-bamboo text-white' : 'border-cream bg-white'
      }`}
    >
      {checked && <Check size={12} strokeWidth={3} />}
    </span>
  );
}

function CheckOption({ checked, label, onSelect, invalid }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onSelect}
      className={`flex w-full items-start gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-sm transition-all ${
        checked
          ? 'border-bamboo bg-bamboo/[0.07] font-medium text-forest'
          : invalid
            ? 'border-red-200 bg-red-50/40 text-charcoal/80 hover:border-bamboo/50'
            : 'border-cream bg-ivory text-charcoal/80 hover:border-bamboo/50 hover:bg-white'
      }`}
    >
      <CheckBox checked={checked} />
      <span className="leading-snug">{label}</span>
    </button>
  );
}

/** Single-answer checklist (styled as boxes per the printed assessment form). */
function OptionList({ options, value, onChange, invalid, columns = 2 }) {
  return (
    <div className={`grid gap-2 ${columns === 1 ? '' : 'sm:grid-cols-2'}`}>
      {options.map((opt) => {
        const label = typeof opt === 'string' ? opt : opt.label;
        return (
          <CheckOption
            key={label}
            label={label}
            checked={value === label}
            invalid={invalid}
            onSelect={() => onChange(value === label ? '' : label)}
          />
        );
      })}
    </div>
  );
}

/**
 * Matrix question — a row per subject, a tick column per level.
 * Renders as a table from `sm` up and as stacked blocks on phones.
 */
function MatrixGroup({ rows, levels, values, onChange, rowLabel, invalidKeys }) {
  return (
    <>
      {/* Desktop / tablet */}
      <div className="hidden overflow-hidden rounded-xl border border-cream sm:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-ivory">
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-forest">
                {rowLabel}
              </th>
              {levels.map((lvl) => (
                <th key={lvl.label} className="px-2 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wide text-forest/70">
                  {lvl.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-cream/60">
            {rows.map((row) => {
              const invalid = invalidKeys?.has(row.key);
              return (
                <tr key={row.key} className={invalid ? 'bg-red-50/40' : 'bg-white'}>
                  <td className="px-4 py-2.5 font-medium text-charcoal/85">{row.label}</td>
                  {levels.map((lvl) => {
                    const checked = values?.[row.key] === lvl.label;
                    return (
                      <td key={lvl.label} className="px-2 py-2.5 text-center">
                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={checked}
                          aria-label={`${row.label} — ${lvl.label}`}
                          onClick={() => onChange(row.key, checked ? '' : lvl.label)}
                          className="inline-flex items-center justify-center p-1"
                        >
                          <CheckBox checked={checked} />
                        </button>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Phone */}
      <div className="space-y-3 sm:hidden">
        {rows.map((row) => (
          <div key={row.key} className={`rounded-xl border p-3 ${invalidKeys?.has(row.key) ? 'border-red-200 bg-red-50/40' : 'border-cream bg-white'}`}>
            <p className="mb-2 text-sm font-medium text-forest">{row.label}</p>
            <div className="grid gap-2">
              {levels.map((lvl) => (
                <CheckOption
                  key={lvl.label}
                  label={lvl.label}
                  checked={values?.[row.key] === lvl.label}
                  onSelect={() => onChange(row.key, values?.[row.key] === lvl.label ? '' : lvl.label)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function QBlock({ number, title, description, children }) {
  return (
    <section className="space-y-4 border-t border-cream pt-6 first:border-0 first:pt-0">
      <div className="flex items-start gap-2.5">
        {number && (
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest text-[11px] font-bold text-white">
            {number}
          </span>
        )}
        <h3 className="font-serif text-lg text-forest">
          {title}
          {description && <span className="ml-2 text-base font-bold text-charcoal">{description}</span>}
        </h3>
      </div>
      {children}
    </section>
  );
}

function Prompt({ children, hint }) {
  return (
    <div>
      <p className="text-sm font-semibold text-charcoal">{children}</p>
      {hint && <p className="mt-0.5 text-xs italic text-charcoal/50">{hint}</p>}
    </div>
  );
}

function SubHeading({ children }) {
  return <p className="text-xs font-bold uppercase tracking-wider text-bamboo">{children}</p>;
}

// ── Step ──────────────────────────────────────────────────────────────────────

function CareAssessmentStep({ assessment, onChange, invalidFields }) {
  const set = (patch) => onChange({ ...assessment, ...patch });
  const setNested = (group, key, value) =>
    onChange({ ...assessment, [group]: { ...assessment[group], [key]: value } });

  const isInvalid = (field) => invalidFields?.has(field) ?? false;
  const nestedInvalid = (prefix, keys) =>
    new Set(keys.filter((k) => isInvalid(`${prefix}.${k}`)));

  /** "None of the above" is mutually exclusive with the individual services. */
  const toggleNursing = (item) => {
    const current = assessment.nursing ?? [];
    if (item === NURSING_NONE) {
      set({ nursing: current.includes(NURSING_NONE) ? [] : [NURSING_NONE] });
      return;
    }
    const withoutNone = current.filter((n) => n !== NURSING_NONE);
    set({
      nursing: withoutNone.includes(item)
        ? withoutNone.filter((n) => n !== item)
        : [...withoutNone, item],
    });
  };

  const { answered, total, percent } = assessmentProgress(assessment);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl text-forest">Initial Care &amp; Service Assessment</h2>
        <p className="mt-2 text-sm font-semibold text-charcoal">
          Help us understand the level of support that may be appropriate for you or your loved one.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
          Please select the answer that best describes the resident. It is important to note that this
          assessment provides an <strong className="font-semibold text-charcoal">initial estimate</strong> of
          care needs and indicative monthly service cost. The final level of care, service requirements
          and fees are subject to review and confirmation by the Bambu Harmony care team.
        </p>
      </div>

      {/* Progress */}
      <div className="rounded-xl border border-cream bg-ivory px-4 py-3">
        <div className="flex items-center justify-between text-xs font-medium text-forest">
          <span>Assessment progress</span>
          <span>{answered} of {total} answered</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-cream">
          <div className="h-full rounded-full bg-bamboo transition-all duration-500" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <QBlock
        number={1}
        title="Mobility"
        description="Refers to a person's ability to move safely and independently."
      >
        <Prompt>How does the resident normally move around?</Prompt>
        <OptionList
          options={MOBILITY_ITEMS}
          value={assessment.mobility}
          onChange={(v) => set({ mobility: v })}
          invalid={isInvalid('mobility')}
        />
      </QBlock>

      <QBlock
        number={2}
        title="Activities of Daily Living"
        description="Basic self-care activities needed for hygiene, health, safety, comfort, and independence."
      >
        <Prompt>Please select the level of assistance required for each activity.</Prompt>
        <MatrixGroup
          rows={ADL_ACTIVITIES}
          levels={ADL_LEVELS}
          values={assessment.adl}
          onChange={(key, value) => setNested('adl', key, value)}
          rowLabel="Activity"
          invalidKeys={nestedInvalid('adl', ADL_ACTIVITIES.map((a) => a.key))}
        />
      </QBlock>

      <QBlock
        number={3}
        title="Continence"
        description="The ability to control bladder and bowel functions without accidental leakage."
      >
        <Prompt>What best describes the resident&apos;s bladder / bowel continence?</Prompt>
        <OptionList
          options={CONTINENCE_ITEMS}
          value={assessment.continence}
          onChange={(v) => set({ continence: v })}
          invalid={isInvalid('continence')}
        />
      </QBlock>

      <QBlock
        number={4}
        title="Cognitive Status"
        description="Ability to think, remember, communicate, and make decisions."
      >
        <Prompt>What best describes the resident&apos;s memory and cognitive condition?</Prompt>
        <OptionList
          options={COGNITION_ITEMS}
          value={assessment.cognition}
          onChange={(v) => set({ cognition: v })}
          invalid={isInvalid('cognition')}
        />

        <div className="space-y-3 rounded-xl bg-ivory p-4">
          <SubHeading>Behavioral / Supervision Needs</SubHeading>
          <Prompt hint="If yes, the care team may request additional information during the assessment process.">
            Does the resident have behaviors or supervision needs that require additional management?
          </Prompt>
          <OptionList
            options={BEHAVIOR_ITEMS}
            value={assessment.behaviorSupervision}
            onChange={(v) => set({ behaviorSupervision: v })}
            invalid={isInvalid('behaviorSupervision')}
          />
        </div>
      </QBlock>

      <QBlock
        number={5}
        title="Nursing Requirements"
        description="Nursing care, health monitoring, treatments, medications, and clinical support needed by a resident."
      >
        <Prompt hint="Select all that apply.">
          Does the resident currently require any of the following?
        </Prompt>
        <div className={`grid gap-2 sm:grid-cols-2 ${isInvalid('nursing') ? 'rounded-xl ring-1 ring-red-200' : ''}`}>
          {[...NURSING_ITEMS, NURSING_NONE].map((item) => (
            <CheckOption
              key={item}
              label={item}
              checked={(assessment.nursing ?? []).includes(item)}
              invalid={isInvalid('nursing')}
              onSelect={() => toggleNursing(item)}
            />
          ))}
        </div>
      </QBlock>

      <QBlock number={6} title="Clinical Risk Assessment">
        <Prompt>How would you describe the resident&apos;s current risk level?</Prompt>
        <MatrixGroup
          rows={RISK_CATEGORIES}
          levels={RISK_LEVELS}
          values={assessment.risks}
          onChange={(key, value) => setNested('risks', key, value)}
          rowLabel="Risk"
          invalidKeys={nestedInvalid('risks', RISK_CATEGORIES.map((r) => r.key))}
        />
      </QBlock>

      <QBlock number={7} title="Nutrition & Swallowing">
        <p className="text-xs italic text-charcoal/50">
          Nutrition information is collected for care planning and may be considered during the final
          clinical assessment.
        </p>

        <div className="space-y-3">
          <SubHeading>Diet</SubHeading>
          <OptionList
            options={DIET_ITEMS}
            value={assessment.nutrition?.diet}
            onChange={(v) => setNested('nutrition', 'diet', v)}
          />
        </div>

        <div className="space-y-3">
          <SubHeading>Appetite</SubHeading>
          <OptionList
            options={APPETITE_ITEMS}
            value={assessment.nutrition?.appetite}
            onChange={(v) => setNested('nutrition', 'appetite', v)}
          />
        </div>

        <div className="space-y-3">
          <SubHeading>Swallowing Difficulty</SubHeading>
          <OptionList
            options={SWALLOWING_ITEMS}
            value={assessment.nutrition?.swallowingDifficulty}
            onChange={(v) => setNested('nutrition', 'swallowingDifficulty', v)}
          />
        </div>
      </QBlock>
    </div>
  );
}

export default CareAssessmentStep;
