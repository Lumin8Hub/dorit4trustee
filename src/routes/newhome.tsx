import { useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronDown,
  HandHelping,
  Heart,
  Target,
  Award,
  Users,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JoinForm } from "@/components/JoinForm";
import { HeroMotes } from "@/components/HeroMotes";
import { openDonateModal } from "@/lib/donateModal";

import newhomeCss from "../styles/newhome.css?url";

/* Content mirrors the live homepage (src/routes/index.tsx) verbatim — this
   preview only re-skins the presentation, never the message. */
const PILLARS = [
  {
    icon: HandHelping,
    variant: "mustard" as const,
    title: "Volunteer",
    body: "Join the movement and help elect a trustee who puts kids first. Your time and energy can make a real difference in our schools.",
    cta: { label: "Get Involved", to: "/get-involved" as const },
  },
  {
    icon: Heart,
    variant: "turquoise" as const,
    title: "Donate to the Campaign",
    body: "Every contribution helps us reach more families across King-Vaughan Ward 1. Support the campaign for better schools.",
    cta: { label: "Donate Now", action: "donate" as const },
  },
  {
    icon: Target,
    variant: "taupe" as const,
    title: "Our Mission",
    body: "To bring merit-based excellence, genuine inclusivity, and focused academics back to our YRDSB schools — putting students first in every decision.",
  },
];

const PRIORITIES = [
  {
    icon: Award,
    title: "Excellence Through Merit",
    body: "I believe that every child deserves the highest quality of instruction. I will advocate to hire all teachers based on merit, ensuring that the most qualified, capable, and passionate educators are at the front of our classrooms. Our focus should always be on professional excellence to drive student success.",
  },
  {
    icon: Users,
    title: "Unity and Equality for All",
    body: "Our schools should be places that bring us together, not pull us apart. I will work to promote unity and oppose all forms of discrimination, division, and segregation. Every student must be treated as an individual with unique potential, ensuring a school environment that is genuinely inclusive and respectful of all backgrounds without creating new barriers.",
  },
  {
    icon: BookOpen,
    title: "Neutral Learning Environments",
    body: "The classroom should be a sanctuary for academic growth, skill-building, and critical thinking. I promise to keep politics out of schools, ensuring that the curriculum remains focused on core academic subjects. By removing political activism from the learning environment, we allow students to focus on what matters most: their education and their future.",
  },
  {
    icon: GraduationCap,
    title: "Enhancing Special Education and Individualized Support",
    body: "I am committed to ensuring that every exceptional student in our region has the resources necessary to reach their full potential. I will advocate for increased funding and targeted resources for Special Education.",
    bullets: [
      {
        label: "Targeted Interventions",
        text: "Expanding access to specialized staff and smaller, focused learning groups to provide the intensive support students with learning challenges require.",
      },
      {
        label: "Resource Alignment",
        text: "Ensuring that Individual Education Plans (IEPs) are backed by the actual personnel and specialists needed to drive measurable developmental progress.",
      },
      {
        label: "Early & Consistent Support",
        text: "Working to reduce wait times for assessments so that students receive early, expert intervention that sets them up for lifelong success.",
      },
    ],
  },
];

const WHY_THIS_MATTERS = [
  { label: "Academic Integrity", text: "Putting the focus back on learning." },
  { label: "True Inclusivity", text: "Treating everyone fairly without forced categorization." },
  {
    label: "Professional Standards",
    text: "Ensuring our tax dollars go toward the best possible educators.",
  },
  {
    label: "Ensuring No Child is Left Behind",
    text: "Proper funding for Special Education means students with learning challenges get the expert, small-group attention they need to actually progress.",
  },
];

export const Route = createFileRoute("/newhome")({
  head: () => ({
    meta: [
      { title: "Preview — Dynamic Homepage · Dorit Smali for YRDSB Trustee 2026" },
      // Unlisted preview: keep it out of search indexes.
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "stylesheet", href: newhomeCss }],
  }),
  component: NewHomePage,
});

// "Our Kids" → per-character spans so GSAP can stagger them up into view.
function SplitWord({ text }: { text: string }) {
  return (
    <span className="nh-word">
      {text.split("").map((ch, i) => (
        <span className="nh-char" key={i}>
          {ch}
        </span>
      ))}
    </span>
  );
}

function NewHomePage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let ctx: { revert: () => void } | undefined;
    let disposed = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        ctx = gsap.context(() => {
          // Opacity reveals use fromTo: CSS (scripting-enabled) pre-hides these
          // to prevent FOUC, so the tween must drive an explicit *visible*
          // end-state — a plain .from() would resolve "to" as the already-hidden
          // computed value and animate 0 → 0. The headline chars instead let
          // GSAP own the transform end-to-end (no competing CSS base), so .from()
          // animates each letter up from below its clipped word into place.
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.fromTo(
            '[data-nh-hero="eyebrow"]',
            { y: 22, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 },
            0.1,
          )
            .from(
              ".nh-char",
              { yPercent: 115, duration: 0.8, stagger: 0.045, ease: "power4.out" },
              0.25,
            )
            .fromTo(
              '[data-nh-hero="underline"]',
              { scaleX: 0, transformOrigin: "left", opacity: 1 },
              { scaleX: 1, duration: 0.5 },
              0.8,
            )
            .fromTo(
              '[data-nh-hero="subtitle"]',
              { y: 18, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6 },
              0.9,
            )
            .fromTo(
              '[data-nh-hero="form"]',
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7 },
              1.0,
            )
            .fromTo(
              '[data-nh-hero="ctas"]',
              { y: 18, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6 },
              1.0,
            );

          // --- Hero photo: slow Ken Burns + scroll parallax ----------------
          gsap.fromTo(
            ".hero--dynamic .hero__photo",
            { scale: 1 },
            { scale: 1.07, duration: 26, ease: "sine.inOut", yoyo: true, repeat: -1 },
          );
          gsap.to(".hero--dynamic .hero__photo", {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero--dynamic",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });

          // --- Section reveals --------------------------------------------
          gsap.fromTo(
            ".pillar",
            { y: 46, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.14,
              ease: "power3.out",
              scrollTrigger: { trigger: ".pillars", start: "top 80%" },
            },
          );
          gsap.fromTo(
            ".priorities--home .priority-card",
            { y: 42, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: { trigger: ".priorities--home .priorities__grid", start: "top 82%" },
            },
          );
        }, root);

        return () => ctx?.revert();
      });

      ctx = { revert: () => mm.revert() };
    })();

    return () => {
      disposed = true;
      ctx?.revert();
    };
  }, []);

  return (
    <div className="page nh" ref={rootRef}>
      <Header variant="overlay" />
      <main>
        <section className="hero hero--dynamic">
          <div className="hero__photo" aria-hidden="true" />
          <div className="hero__scrim" aria-hidden="true" />
          <HeroMotes />
          <div className="hero__inner">
            <div className="hero__panel">
              <div className="hero__copy">
                <p className="t-eyebrow hero__eyebrow" data-nh-hero="eyebrow">
                  Make Our Schools Work For
                </p>
                <h1 className="hero__headline">
                  <SplitWord text="Our" /> <SplitWord text="Kids" />
                  <span className="hero__underline" aria-hidden="true" data-nh-hero="underline" />
                </h1>
                <p className="hero__subtitle" data-nh-hero="subtitle">
                  Raising the Bar, Removing the Noise.
                </p>
              </div>

              <div className="hero__mobile-ctas" data-nh-hero="ctas">
                <a href="#hero-join-section" className="btn btn--turquoise btn--lg">
                  Volunteer
                </a>
                <button
                  type="button"
                  className="btn btn--mustard btn--lg"
                  onClick={() => openDonateModal()}
                >
                  Donate
                </button>
              </div>

              <div className="hero__form" data-nh-hero="form">
                <JoinForm id="newhome-hero-join" source="newhome" />
              </div>
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
                {"cta" in p &&
                  p.cta &&
                  ("action" in p.cta && p.cta.action === "donate" ? (
                    <button
                      type="button"
                      className="btn btn--ink btn--sm pillar__cta"
                      onClick={() => openDonateModal()}
                    >
                      {p.cta.label}
                    </button>
                  ) : (
                    "to" in p.cta && (
                      <Link to={p.cta.to} className="btn btn--ink btn--sm pillar__cta">
                        {p.cta.label}
                      </Link>
                    )
                  ))}
              </article>
            );
          })}
        </section>

        <section className="priorities--home" aria-label="Priorities for Our Schools">
          <div className="priorities__inner">
            <p className="t-eyebrow priorities__eyebrow">Priorities for Our Schools</p>
            <h2 className="priorities__heading t-section">A "Back to Basics" Approach</h2>
            <p className="priorities__intro">
              As your future trustee, I am committed to a "back to basics" approach that prioritizes
              student achievement and community harmony. My platform is built on the following core
              promises:
            </p>

            <div className="priorities__grid">
              {PRIORITIES.map((p, i) => {
                const Icon = p.icon;
                return (
                  <article key={p.title} className="priority-card">
                    <span className="priority-card__number">{i + 1}</span>
                    <div className="priority-card__icon">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <h3 className="priority-card__title">{p.title}</h3>
                    <p className="priority-card__body">{p.body}</p>
                    {"bullets" in p && p.bullets && (
                      <ul className="priority-card__bullets">
                        {p.bullets.map((b) => (
                          <li key={b.label}>
                            <strong>{b.label}:</strong> {b.text}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                );
              })}
            </div>

            <div className="why-matters">
              <h3 className="why-matters__title t-pillar">Why This Matters</h3>
              <p className="why-matters__intro">
                By reframing these issues, we move the conversation away from divisive labels and
                back to the fundamental values that most parents share:
              </p>
              <ul className="why-matters__list">
                {WHY_THIS_MATTERS.map((item) => (
                  <li key={item.label}>
                    <strong>{item.label}:</strong> {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="hero-join-section" className="mobile-join">
          <JoinForm id="newhome-mobile-join" source="newhome-mobile" />
        </section>
      </main>
      <Footer />
    </div>
  );
}
