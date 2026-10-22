import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { sanitizePageUrl, createGtag, sanitizedReferrer } from "@/lib/analytics-consent.mjs";

const STORAGE_KEY = "dorit-analytics-consent";
const MEASUREMENT_ID = "G-4N2W4DS8SJ";

type Consent = "accepted" | "declined" | null;
type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

function clearAnalyticsCookies() {
  const names = document.cookie.split(";").map((cookie) => cookie.split("=")[0].trim());
  const domains = ["", window.location.hostname, `.${window.location.hostname}`];
  const paths = [
    "/",
    window.location.pathname,
    ...window.location.pathname
      .split("/")
      .slice(0, -1)
      .map((_, i, a) => `/${a.slice(0, i + 1).join("/")}`),
  ];
  for (const name of names) {
    if (!name.startsWith("_ga")) continue;
    for (const domain of domains) {
      for (const path of paths) {
        document.cookie = `${name}=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path || "/"}${domain ? `; domain=${domain}` : ""}; SameSite=Lax`;
      }
    }
  }
}

function loadAnalytics() {
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname.endsWith(".localhost") ||
    window.location.hostname === "127.0.0.1"
  )
    return;
  if (document.getElementById("dorit-ga-script")) {
    window.gtag?.("consent", "update", { analytics_storage: "granted" });
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = createGtag(window.dataLayer);
  window.gtag("js", new Date());
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });
  window.gtag("set", "allow_google_signals", false);
  window.gtag("set", "allow_ad_personalization_signals", false);
  window.gtag("config", MEASUREMENT_ID, {
    send_page_view: false,
    page_location: sanitizePageUrl(window.location.href),
    page_referrer: sanitizedReferrer(document.referrer),
  });

  const script = document.createElement("script");
  script.id = "dorit-ga-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

export function AnalyticsConsent() {
  const location = useLocation();
  const [consent, setConsent] = useState<Consent>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let saved: Consent = null;
    try {
      const value = window.localStorage.getItem(STORAGE_KEY);
      if (value === "accepted" || value === "declined") saved = value;
    } catch {
      // If storage is unavailable, ask again on the next page view and avoid tracking.
    }
    setConsent(saved);
    setVisible(saved === null);
    if (saved === "accepted") loadAnalytics();

    const showPreferences = () => setVisible(true);
    window.addEventListener("dorit:analytics-preferences", showPreferences);
    return () => window.removeEventListener("dorit:analytics-preferences", showPreferences);
  }, []);

  useEffect(() => {
    if (
      consent !== "accepted" ||
      !window.gtag ||
      window.location.hostname === "localhost" ||
      window.location.hostname.endsWith(".localhost") ||
      window.location.hostname === "127.0.0.1"
    )
      return;
    const url = sanitizePageUrl(
      `${window.location.origin}${location.pathname}${window.location.search}`,
    );
    window.gtag("event", "page_view", {
      page_location: url,
      page_path: location.pathname,
      page_title: document.title,
      page_referrer: sanitizedReferrer(document.referrer),
    });
  }, [consent, location.pathname, location.search]);

  const choose = (value: Exclude<Consent, null>) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Keep the in-memory choice for this visit when persistence is unavailable.
    }
    setConsent(value);
    setVisible(false);
    if (value === "accepted") {
      window[`ga-disable-${MEASUREMENT_ID}`] = false;
      loadAnalytics();
    } else {
      const wasAccepted = consent === "accepted";
      window[`ga-disable-${MEASUREMENT_ID}`] = true;
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
      clearAnalyticsCookies();
      if (wasAccepted) {
        document.getElementById("dorit-ga-script")?.remove();
        window.location.reload();
      }
    }
  };

  if (!visible) return null;
  return (
    <aside className="analytics-consent" aria-label="Analytics preferences" aria-live="polite">
      <p>
        Optional analytics help us understand how people use this campaign website. No analytics are
        used unless you opt in.
      </p>
      <div className="analytics-consent__actions">
        <button type="button" className="btn btn--mustard" onClick={() => choose("accepted")}>
          Accept analytics
        </button>
        <button type="button" className="btn btn--turquoise" onClick={() => choose("declined")}>
          Decline
        </button>
      </div>
    </aside>
  );
}
