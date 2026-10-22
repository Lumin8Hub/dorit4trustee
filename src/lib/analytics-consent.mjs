export function createGtag(dataLayer) {
  return function gtag() {
    dataLayer.push(arguments);
  };
}

export function sanitizedReferrer(input) {
  if (!input) return "";
  try {
    const url = new URL(input);
    return `${url.origin}${url.pathname}`;
  } catch {
    return "";
  }
}

const ALLOWED_CAMPAIGN_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_id",
  "utm_content",
];
const MAX_PARAM_LENGTH = 100;

export function sanitizePageUrl(input) {
  const url = new URL(input);
  const safeParams = new URLSearchParams();
  for (const key of ALLOWED_CAMPAIGN_PARAMS) {
    const value = url.searchParams.get(key);
    if (value && value.length <= MAX_PARAM_LENGTH && /^[\w .-]+$/.test(value)) {
      safeParams.set(key, value);
    }
  }
  url.search = safeParams.toString();
  url.hash = "";
  return url.toString();
}
