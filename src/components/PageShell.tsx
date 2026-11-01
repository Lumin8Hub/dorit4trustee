import type { ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

/** Solid-header page with a centred title block. */
export function PageShell({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="page">
      <Header variant="solid" />
      <main>
        <section className="page-hero">
          <div className="page-hero__inner">
            <p className="t-eyebrow">{eyebrow}</p>
            <h1 className="section-heading">
              {title}
              <span className="accent-bar" aria-hidden="true" />
            </h1>
            {lede && <p className="page-hero__lede">{lede}</p>}
          </div>
        </section>
        {children}
      </main>
      <Footer />
    </div>
  );
}

/** Closing call to action used at the bottom of most pages. */
export function ContactCta({ heading = "Stay Connected with Dorit" }: { heading?: string }) {
  return (
    <section className="support-cta" aria-labelledby="contact-cta-title">
      <div className="container support-cta__inner">
        <h2 id="contact-cta-title" className="section-heading section-heading--sm">
          {heading}
        </h2>
        <p className="support-cta__lede">
          Join Team Dorit to hear about community events and how to help in the next campaign.
        </p>
        <div className="support-cta__buttons">
          <Link to="/get-involved" className="btn btn--mustard btn--lg">
            Join Team Dorit
          </Link>
          <Link to="/contact" className="btn btn--ink btn--lg">
            Contact Dorit
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * Retired campaign URL. Prerendered with a meta refresh (works without JS) and noindex,
 * then redirected client-side, so links on old flyers, QR codes and posts still land.
 */
export function redirectHead(to: string) {
  return {
    meta: [
      { title: "Redirecting — Dorit Smali, YRDSB Trustee" },
      { name: "robots", content: "noindex" },
      { httpEquiv: "refresh", content: `0; url=${to}` },
    ],
  };
}

/** Retired page whose content now lives on an external site (e.g. the YRDSB newsroom). */
export function ExternalRedirectPage({ href, label }: { href: string; label: string }) {
  useEffect(() => {
    window.location.replace(href);
  }, [href]);
  return (
    <main style={{ padding: "120px 24px", textAlign: "center" }}>
      <p>
        This page has moved to <a href={href}>{label}</a>.
      </p>
    </main>
  );
}

export function RedirectPage({ to }: { to: string }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to, replace: true });
  }, [navigate, to]);
  return (
    <main style={{ padding: "120px 24px", textAlign: "center" }}>
      <p>
        This page has moved. <a href={to}>Continue</a>
      </p>
    </main>
  );
}
