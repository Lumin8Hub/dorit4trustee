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
export function ContactCta({ heading = "Questions About Our Schools?" }: { heading?: string }) {
  return (
    <section className="support-cta" aria-labelledby="contact-cta-title">
      <div className="container support-cta__inner">
        <h2 id="contact-cta-title" className="section-heading section-heading--sm">
          {heading}
        </h2>
        <p className="support-cta__lede">I work for every family in King and Vaughan Ward 1.</p>
        <div className="support-cta__buttons">
          <Link to="/contact" className="btn btn--mustard btn--lg">
            Contact Dorit
          </Link>
          <Link to="/updates" className="btn btn--ink btn--lg">
            Read Board Updates
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
