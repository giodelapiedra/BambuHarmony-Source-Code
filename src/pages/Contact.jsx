import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useUTM } from '../hooks/useUTM';
import { MapPin, Mail, Clock, HeartHandshake, ExternalLink, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import Container from '../components/common/Container';
import Section from '../components/common/Section';
import Button from '../components/common/Button';
import CareAssessmentStep from '../components/contact/CareAssessmentStep';
import AssessmentResultStep from '../components/contact/AssessmentResultStep';
import { submitInquiry } from '../services/contactService';
import { emptyAssessment, scoreAssessment, unansweredQuestions } from '../utils/careAssessment';
import {
  BRAND,
  CONTACT_PREFERENCES,
  RESIDENT_LOCATIONS,
  CITIZENSHIP_OPTIONS,
  SENIOR_ID_OPTIONS,
  TIMELINE_OPTIONS,
  BUDGET_OPTIONS,
  PREFERRED_ACTION_OPTIONS,
} from '../utils/constants';

const contactDetails = [
  { icon: MapPin,         label: 'Estate Address',        lines: [BRAND.address] },
  { icon: Mail,           label: 'Admissions Email',       lines: [BRAND.email], href: `mailto:${BRAND.email}` },
  { icon: Clock,          label: 'Business Hours',         lines: ['Mon – Sun, 10:00 AM – 5:00 PM'] },
  { icon: HeartHandshake, label: 'Operated By',            lines: [BRAND.operator] },
];

const STEPS = [
  { id: 1, label: 'Your Info' },
  { id: 2, label: 'Resident' },
  { id: 3, label: 'Timeline' },
  { id: 4, label: 'Assessment' },
  { id: 5, label: 'Your Estimate' },
  { id: 6, label: 'Next Steps' },
];

const ASSESSMENT_STEP = 4;
const RESULT_STEP = 5;

const initialForm = {
  firstName: '', lastName: '', email: '', phone: '',
  contactPreference: CONTACT_PREFERENCES[0],
  relationship: '', residentAge: '',
  residentLocation: RESIDENT_LOCATIONS[0],
  residentCity: '', residentCountry: '', residentCityAbroad: '',
  citizenship: CITIZENSHIP_OPTIONS[0], citizenshipOther: '',
  seniorId: SENIOR_ID_OPTIONS[2],
  timeline: TIMELINE_OPTIONS[1],
  budget: BUDGET_OPTIONS[3],
  preferredAction: PREFERRED_ACTION_OPTIONS[0],
  preferredDate: '', message: '',
};

const inputCls = 'w-full rounded-xl border border-cream bg-ivory px-4 py-3 text-sm outline-none focus:border-bamboo transition-colors';
const labelCls = 'mb-1.5 block text-sm font-medium text-forest';

function Field({ label, required, children }) {
  return (
    <div>
      <label className={labelCls}>
        {label}{required && <span className="ml-0.5 text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, required }) {
  return (
    <Field label={label} required={required}>
      <select name={name} value={value} onChange={onChange} className={inputCls}>
        {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </Field>
  );
}

function StepIndicator({ current }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {STEPS.map((step, i) => {
          const done = step.id < current;
          const active = step.id === current;
          return (
            <div key={step.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300 ${
                  done   ? 'bg-bamboo text-white' :
                  active ? 'bg-forest text-white ring-4 ring-forest/20' :
                           'bg-cream text-forest/40'
                }`}>
                  {done ? <Check size={14} strokeWidth={2.5} /> : step.id}
                </div>
                <span className={`mt-1.5 hidden text-[10px] font-medium sm:block ${
                  active ? 'text-forest' : done ? 'text-bamboo' : 'text-stone-400'
                }`}>
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`mx-1 h-px flex-1 transition-colors duration-300 ${
                  done ? 'bg-bamboo' : 'bg-cream'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Contact() {
  const [searchParams] = useSearchParams();
  const requestedStep = Number(searchParams.get('step'));
  const initialStep = requestedStep >= 1 && requestedStep <= STEPS.length ? requestedStep : 1;

  const [form, setForm] = useState(initialForm);
  const [assessment, setAssessment] = useState(emptyAssessment);
  const [step, setStep] = useState(initialStep);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [error, setError] = useState('');
  const [invalidFields, setInvalidFields] = useState(() => new Set());
  const utm = useUTM();

  // Recomputed on every tick — the score is what drives Step 5 and, once
  // submitted, is recalculated server-side before it reaches the care team.
  const result = useMemo(() => scoreAssessment(assessment), [assessment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleAssessmentChange = (next) => {
    setAssessment(next);
    setError('');
    if (invalidFields.size) setInvalidFields(new Set());
  };

  const validateStep = () => {
    if (step === ASSESSMENT_STEP) {
      const missing = unansweredQuestions(assessment);
      if (missing.length > 0) {
        setInvalidFields(new Set(missing.map((m) => m.field)));
        const [first] = missing;
        return missing.length === 1
          ? `Please answer “${first.label}” under ${first.section}.`
          : `Please answer all ${missing.length} remaining questions — starting with “${first.label}” under ${first.section}.`;
      }
    }
    if (step === 1) {
      if (!form.firstName.trim()) return 'First name is required.';
      if (!form.lastName.trim()) return 'Last name is required.';
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) return 'A valid email is required.';
      if (!form.phone.trim()) return 'Phone number is required.';
    }
    if (step === 2) {
      if (!form.relationship.trim()) return 'Your relationship to the resident is required.';
      if (!form.residentAge.trim()) return 'Age of the prospective resident is required.';
      if (form.residentLocation === 'In the Philippines' && !form.residentCity.trim())
        return 'City or municipality is required.';
      if (form.residentLocation === 'Outside the Philippines' && !form.residentCountry.trim())
        return 'Country is required.';
      if (form.citizenship === 'Foreign National' && !form.citizenshipOther.trim())
        return 'Please specify the citizenship.';
    }
    return null;
  };

  const handleNext = () => {
    const err = validateStep();
    if (err) { setError(err); return; }
    setError('');
    setInvalidFields(new Set());
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setError('');
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('loading');
    setError('');
    try {
      await submitInquiry({ ...form, assessment, source: 'contact-form', ...utm });
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('idle');
      setError('Something went wrong. Please try again later.');
    }
  };

  if (submitStatus === 'success') {
    return (
      <Section>
        <Container>
          <div className="mx-auto max-w-lg py-20 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-bamboo/10">
              <Check size={36} className="text-bamboo" strokeWidth={2.5} />
            </div>
            <h2 className="font-serif text-3xl text-forest">Assessment Received</h2>
            <p className="mt-4 text-stone-500">
              Thank you for reaching out. Our care team will review your assessment
              {result.careLevel ? ` (${result.careLevel})` : ''} and contact you shortly via your
              preferred channel to confirm the final level of care, service requirements and fees.
            </p>
            <button
              onClick={() => {
                setForm(initialForm);
                setAssessment(emptyAssessment());
                setInvalidFields(new Set());
                setStep(1);
                setSubmitStatus('idle');
              }}
              className="mt-8 text-sm font-medium text-bamboo underline-offset-2 hover:underline"
            >
              Submit another inquiry
            </button>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block rounded-full bg-gold/15 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
            Contact Us
          </span>
          <h1 className="font-serif text-4xl text-forest">We're Here to Help</h1>
          <p className="mt-3 text-stone-500">
            Whether you're planning your own retirement or looking for the right community for
            someone you love, our team is ready to assist you.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
          {/* Sidebar */}
          <aside className="lg:col-span-2">
            <div className="flex flex-col overflow-hidden rounded-3xl bg-forest text-white shadow-lg">
              <div className="p-8">
                <h3 className="font-serif text-xl text-white">Estate Contact</h3>
                <p className="mb-6 mt-1 text-sm text-white/50">Verified admissions channels.</p>
                <ul className="space-y-5 text-sm">
                  {contactDetails.map(({ icon: Icon, label, lines, href }) => (
                    <li key={label} className="flex gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                        <Icon size={16} strokeWidth={1.75} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wide text-white/40">{label}</p>
                        {href ? (
                          <a href={href} className="break-words text-white/80 hover:text-gold transition-colors">
                            {lines[0]}
                          </a>
                        ) : (
                          lines.map((l) => <p key={l} className="text-white/80">{l}</p>)
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative mt-auto aspect-[4/3] w-full border-t border-white/10">
                <iframe
                  title={`${BRAND.name} estate location map`}
                  src={BRAND.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full grayscale-[15%]"
                />
                <a
                  href={BRAND.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-forest shadow backdrop-blur hover:bg-white transition-colors"
                >
                  <MapPin size={13} className="text-gold" />
                  Open in Google Maps
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </aside>

          {/* Form */}
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-cream lg:col-span-3">
            <StepIndicator current={step} />

            <form onSubmit={handleSubmit} noValidate>

              {/* ── Step 1: Your Info ── */}
              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="font-serif text-xl text-forest">Your Contact Information</h2>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="First Name" required>
                      <input name="firstName" type="text" value={form.firstName} onChange={handleChange} className={inputCls} />
                    </Field>
                    <Field label="Last Name" required>
                      <input name="lastName" type="text" value={form.lastName} onChange={handleChange} className={inputCls} />
                    </Field>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Email Address" required>
                      <input name="email" type="email" value={form.email} onChange={handleChange} className={inputCls} />
                    </Field>
                    <Field label="Phone Number" required>
                      <input name="phone" type="tel" value={form.phone} onChange={handleChange} className={inputCls} />
                    </Field>
                  </div>
                  <SelectField
                    label="How would you like us to contact you?"
                    name="contactPreference"
                    value={form.contactPreference}
                    onChange={handleChange}
                    options={CONTACT_PREFERENCES}
                  />
                </div>
              )}

              {/* ── Step 2: Resident ── */}
              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="font-serif text-xl text-forest">About the Prospective Resident</h2>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Your relationship to the resident" required>
                      <input name="relationship" type="text" value={form.relationship} onChange={handleChange} placeholder="e.g., Son, Daughter, Self" className={inputCls} />
                    </Field>
                    <Field label="Age of the prospective resident" required>
                      <input name="residentAge" type="text" value={form.residentAge} onChange={handleChange} placeholder="e.g., 78" className={inputCls} />
                    </Field>
                  </div>

                  <SelectField label="Where is the resident currently residing?" name="residentLocation" value={form.residentLocation} onChange={handleChange} options={RESIDENT_LOCATIONS} />

                  {form.residentLocation === 'In the Philippines' && (
                    <Field label="City or municipality" required>
                      <input name="residentCity" type="text" value={form.residentCity} onChange={handleChange} placeholder="e.g., Tanauan City" className={inputCls} />
                    </Field>
                  )}

                  {form.residentLocation === 'Outside the Philippines' && (
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Country" required>
                        <input name="residentCountry" type="text" value={form.residentCountry} onChange={handleChange} placeholder="e.g., United States" className={inputCls} />
                      </Field>
                      <Field label="City (optional)">
                        <input name="residentCityAbroad" type="text" value={form.residentCityAbroad} onChange={handleChange} placeholder="e.g., Los Angeles" className={inputCls} />
                      </Field>
                    </div>
                  )}

                  <SelectField label="Resident's citizenship" name="citizenship" value={form.citizenship} onChange={handleChange} options={CITIZENSHIP_OPTIONS} />

                  {form.citizenship === 'Foreign National' && (
                    <Field label="Please specify citizenship" required>
                      <input name="citizenshipOther" type="text" value={form.citizenshipOther} onChange={handleChange} placeholder="e.g., American, Japanese" className={inputCls} />
                    </Field>
                  )}

                  <SelectField label="Does the resident hold any of the following IDs?" name="seniorId" value={form.seniorId} onChange={handleChange} options={SENIOR_ID_OPTIONS} />
                </div>
              )}

              {/* ── Step 3: Timeline & Budget ── */}
              {step === 3 && (
                <div className="space-y-5">
                  <h2 className="font-serif text-xl text-forest">Care Timeline</h2>
                  <p className="text-sm text-stone-500">Help us prioritize your inquiry by letting us know your expected timeframe.</p>
                  <SelectField label="How soon are you planning to avail of our services?" name="timeline" value={form.timeline} onChange={handleChange} options={TIMELINE_OPTIONS} />
                  <SelectField label="Estimated monthly budget for care" name="budget" value={form.budget} onChange={handleChange} options={BUDGET_OPTIONS} />
                </div>
              )}

              {/* ── Step 4: Initial Care & Service Assessment ── */}
              {step === ASSESSMENT_STEP && (
                <CareAssessmentStep
                  assessment={assessment}
                  onChange={handleAssessmentChange}
                  invalidFields={invalidFields}
                />
              )}

              {/* ── Step 5: Estimated Care & Accommodation Cost ── */}
              {step === RESULT_STEP && (
                <AssessmentResultStep assessment={assessment} result={result} />
              )}

              {/* ── Step 6: Next Steps ── */}
              {step === 6 && (
                <div className="space-y-5">
                  <h2 className="font-serif text-xl text-forest">Next Steps</h2>
                  <SelectField label="How would you like to proceed?" name="preferredAction" value={form.preferredAction} onChange={handleChange} options={PREFERRED_ACTION_OPTIONS} />

                  <Field label="Preferred Date">
                    <input name="preferredDate" type="date" value={form.preferredDate} onChange={handleChange} className={inputCls} />
                  </Field>

                  <Field label="Additional message or notes">
                    <textarea name="message" rows={4} value={form.message} onChange={handleChange} placeholder="Anything else you'd like us to know..." className={inputCls} />
                  </Field>
                </div>
              )}

              {/* Error */}
              {error && (
                <p role="alert" className="mt-4 text-sm text-red-600">{error}</p>
              )}

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 rounded-xl border border-cream px-5 py-3 text-sm font-medium text-forest transition-colors hover:bg-cream"
                  >
                    <ChevronLeft size={16} />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < STEPS.length ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 rounded-xl bg-forest px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest/90"
                  >
                    {step === ASSESSMENT_STEP
                      ? 'See My Estimate'
                      : step === RESULT_STEP
                        ? 'Continue to Final Step'
                        : 'Next'}
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <Button type="submit" disabled={submitStatus === 'loading'}>
                    {submitStatus === 'loading' ? 'Submitting...' : 'Submit Assessment'}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default Contact;
