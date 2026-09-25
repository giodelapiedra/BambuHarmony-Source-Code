import api from './api';

export async function submitInquiry(payload) {
  const {
    firstName, lastName, email, phone,
    contactPreference, relationship, residentAge,
    residentLocation, residentCity, residentCountry, residentCityAbroad,
    citizenship, citizenshipOther, seniorId,
    timeline,
    adlAssistance, eatingIndependence, mobility, continence,
    cognition, communication, behavior, budget,
    preferredAction, preferredDate,
    assessment,
    message, source, utmSource, utmMedium, utmCampaign,
  } = payload;

  // Accept either firstName/lastName (Contact form) or a single fullName (pop-up).
  const combinedName = [firstName, lastName].filter(Boolean).join(' ').trim();
  const fullName = combinedName || payload.fullName?.trim() || 'Unknown';

  // When only a combined name was provided, split it so first/last are populated too.
  let resolvedFirstName = firstName;
  let resolvedLastName = lastName;
  if (!combinedName && payload.fullName?.trim()) {
    const parts = payload.fullName.trim().split(/\s+/);
    resolvedFirstName = parts.shift();
    resolvedLastName = parts.join(' ') || undefined;
  }

  const response = await api.post('/leads', {
    name: fullName,
    firstName: resolvedFirstName,
    lastName: resolvedLastName,
    email,
    phone,
    contactPreference,
    relationship,
    residentAge,
    residentLocation,
    residentCity,
    residentCountry,
    residentCityAbroad,
    citizenship,
    citizenshipOther,
    seniorId,
    timeline,
    adlAssistance,
    eatingIndependence,
    mobility,
    continence,
    cognition,
    communication,
    behavior,
    budget,
    preferredAction,
    // Raw answers only — the API scores them itself, so the care team's figures
    // can never be influenced by what the browser sends.
    assessment: assessment || undefined,
    datePreference1: preferredDate || undefined,
    message: message?.trim() || undefined,
    source: source || 'contact_form',
    ...(utmSource && { utmSource }),
    ...(utmMedium && { utmMedium }),
    ...(utmCampaign && { utmCampaign }),
  });

  return {
    ...response.data,
    message: 'Inquiry received. Our team will contact you soon.',
  };
}
