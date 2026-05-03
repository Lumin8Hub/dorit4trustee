import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, Megaphone, Sprout, HeartHandshake } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JoinForm } from "@/components/JoinForm";

const HERO_DESKTOP = "/images/hero-desktop.png";

const PILLARS = [
  {
    icon: Megaphone,
    variant: "mustard" as const,
    title: "A Fresh Voice for Every Family",
    body:
      "Dorit Smali is a Vaughan-and-King mom, community builder, and lifelong public-school advocate running to bring real visibility, real accountability, and real results to our YRDSB schools.",
  },
  {
    icon: Sprout,
    variant: "turquoise" as const,
    title: "Rooted in Our Communities",
    body:
      "From Kleinburg to Schomberg, from Maple to King City — every family deserves a trustee who listens, shows up, and puts kids first.",
  },
  {
    icon: HeartHandshake,
    variant: "taupe" as const,
    title: "Together, We Can Build Better Schools",
    body:
      "Strong schools start with strong communities. Join the campaign and help create inclusive, safe, and inspiring places for every student to learn and grow.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dorit Smali for YRDSB Trustee 2026 — Make Our Schools Work for Our Kids" },
      {
        name: "description",
        content:
          "A fresh voice for King and Vaughan Ward 1 families. Join the campaign for strong, caring, practical leadership in our YRDSB schools.",
      },
      { property: "og:title", content: "Make Our Schools Work for Our Kids" },
      {
        property: "og:description",
        content: "A fresh voice for King and Vaughan Ward 1 families.",
      },
      { property: "og:image", content: HERO_DESKTOP },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="page">
      <Header variant="overlay" />
      <main>
        <section className="hero">
          <div className="hero__scrim" aria-hidden="true" />
          <div className="hero__inner">
            <div className="hero__copy">
              <p className="t-eyebrow hero__eyebrow">Make Our Schools Work For</p>
              <h1 className="hero__headline">
                Our Kids
                <span className="hero__underline" aria-hidden="true" />
              </h1>
              <p className="hero__subtitle">
                A fresh voice for King and Vaughan Ward 1 families.
              </p>

              <div className="hero__mobile-ctas">
                <Link to="/get-involved" className="btn btn--turquoise btn--lg">
                  Volunteer
                </Link>
                <Link to="/get-involved" className="btn btn--mustard btn--lg">
                  Donate
                </Link>
              </div>
            </div>

            <div className="hero__form">
              <JoinForm id="hero-join" />
            </div>
          </div>

          <a href="#pillars" className="hero__scroll" aria-label="Scroll to next section">
            <ChevronDown size={32} strokeWidth={2.5} />
          </a>
        </section>

        <section id="pillars" className="pillars" aria-label="Campaign values">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <article key={p.title} className={`pillar pillar--${p.variant}`}>
                <div className="pillar__icon">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="pillar__title t-pillar">{p.title}</h3>
                <p className="pillar__body">{p.body}</p>
              </article>
            );
          })}
        </section>

        <section className="mobile-join">
          <JoinForm id="mobile-join-form" />
        </section>
      </main>
      <Footer />
    </div>
  );
}
