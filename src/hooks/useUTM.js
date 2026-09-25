import { useEffect, useState } from 'react';

const SESSION_KEY = 'bh_utm';

export function useUTM() {
  const [utm, setUtm] = useState(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source');
    const utmMedium = params.get('utm_medium');
    const utmCampaign = params.get('utm_campaign');

    if (utmSource || utmMedium || utmCampaign) {
      const captured = {
        ...(utmSource && { utmSource }),
        ...(utmMedium && { utmMedium }),
        ...(utmCampaign && { utmCampaign }),
      };
      try {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(captured));
      } catch {}
      setUtm(captured);
    }
  }, []);

  return utm;
}
