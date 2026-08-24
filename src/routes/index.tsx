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
import { PhotoCarousel } from "@/components/PhotoCarousel";

const HERO_DESKTOP_OG = "https://dorit4trustee.com/images/hero-desktop.png";

const PILLARS = [
  {
    icon: HandHelping,
    variant: "mustard" as const,
    title: "Volunteer",
    body: "Join the movement and help elect a trustee who puts kids first. Your time and energy can make a real difference in our schools.",
    cta: { label: "Get Involved", to: "/get-involved" },
  },
  {
    icon: Heart,
    variant: "turquoise" as const,
    title: "Donate to the Campaign",
    body: "Every contribution helps us reach more families across King-Vaughan Ward 1. Support the campaign for better schools.",
    cta: { label: "Donate Now", to: "/donate" },
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

const COMMUNITY_PHOTOS = [
  {
    src: "/images/community/dorit-nomination.jpg",
    alt: "Dorit and her husband filing her trustee nomination package for the 2026 King municipal election",
  },
  {
    src: "/images/community/dorit-police.jpg",
    alt: "Dorit and her daughter with York Regional Police officers at a community festival",
  },
  {
    src: "/images/community/dorit-michelle-cooper.jpg",
    alt: "Dorit on stage with MPP Michelle Cooper at the Volunteer Service Awards",
  },
  {
    src: "/images/community/dorit-roman-baber.jpg",
    alt: "Dorit with MP Roman Baber at the UJA Walk with Israel",
  },
  {
    src: "/images/community/dorit-family.jpg",
    alt: "Dorit and her family at a community event",
  },
  {
    src: "/images/community/dorit-king-city.jpg",
    alt: "Dorit visiting a local artisan booth at a community market",
  },
  {
    src: "/images/community/dorit-del-duca.jpg",
    alt: "Dorit with Vaughan Mayor Steven Del Duca at an evening reception",
  },
  {
    src: "/images/community/dorit-indigenous.jpg",
    alt: "Dorit at a community gathering with Indigenous leaders and neighbours",
  },
  {
    src: "/images/community/dorit-anna.jpg",
    alt: "Dorit with a community member at a local art exhibition",
  },
  {
    src: "/images/community/dorit-vincent-ho.jpg",
    alt: "Dorit with MP Vincent Ho at an evening conference reception",
  },
];

const ENDORSEMENTS = [
  {
    name: "Anna Roberts",
    role: "Member of Parliament",
    riding: "King—Vaughan",
    photo: "/images/endorsers/anna-roberts.jpg",
  },
  {
    name: "Roman Baber",
    role: "Member of Parliament",
    riding: "York Centre",
    photo: "/images/endorsers/roman-baber.jpg",
    quote: [
      "Dorit Smali will make a great School Board Trustee! She is involved in her community, passionate about education and determined to get back to basics, instead of pushing political ideology in the classroom. I look forward to her success as YRDSB Trustee!",
    ],
  },
  {
    name: "Melissa Lantsman",
    role: "Deputy Leader of His Majesty's Loyal Opposition",
    riding: "Member of Parliament for Thornhill",
    photo: "/images/endorsers/melissa-lantsman.jpg",
    quote: [
      "The strength of our community is tied directly to the strength of our schools. That's why I am proud to endorse Dorit Smali for YRDSB Trustee.",
      "As a mother, business leader, and dedicated advocate, Dorit brings the experience, integrity, and common sense our school board needs. She is focused on the issues that truly matter to families: putting funding into the classroom, supporting special education, and ensuring political transparency.",
      "Dorit understands that a trustee must be accountable to parents, not the institution. She will keep the focus entirely on educational excellence, and I encourage our community to support her campaign.",
    ],
  },
  {
    name: "Costas Menegakis",
    role: "Member of Parliament",
    riding: "Aurora-Oak Ridges",
    photo: "/images/endorsers/costas-menegakis.jpg",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dorit Smali for YRDSB Trustee 2026 — Make Our Schools Work for Our Kids" },
      {
        name: "description",
        content:
          "A fresh voice for King-Vaughan Ward 1 families. Join the campaign for strong, caring, practical leadership in our YRDSB schools.",
      },
      { property: "og:title", content: "Make Our Schools Work for Our Kids" },
      {
        property: "og:description",
        content: "A fresh voice for King-Vaughan Ward 1 families.",
      },
      { property: "og:image", content: HERO_DESKTOP_OG },
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
            <div className="hero__panel">
              <div className="hero__copy">
                <p className="t-eyebrow hero__eyebrow">Make Our Schools Work For</p>
                <h1 className="hero__headline">
                  Our Kids
                  <span className="hero__underline" aria-hidden="true" />
                </h1>
                <p className="hero__subtitle">Back to Basics. Back to Learning.</p>
              </div>

              <div className="hero__mobile-ctas">
                <a href="#hero-join-section" className="btn btn--turquoise btn--lg">
                  Volunteer
                </a>
                <Link to="/donate" className="btn btn--mustard btn--lg">
                  Donate
                </Link>
              </div>

              <div className="hero__form">
                <JoinForm id="hero-join" source="homepage" />
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
                {"cta" in p && p.cta && (
                  <Link to={p.cta.to} className="btn btn--ink btn--sm pillar__cta">
                    {p.cta.label}
                  </Link>
                )}
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

        <section className="endorsements" aria-label="Endorsements">
          <div className="endorsements__inner">
            <p className="t-eyebrow endorsements__eyebrow">Endorsements</p>
            <h2 className="endorsements__heading t-section">Endorsed By Community Leaders</h2>
            <div className="endorsements__grid">
              {ENDORSEMENTS.map((e) => (
                <article key={e.name} className="endorsement-card">
                  <div className="endorsement-card__header">
                    <img
                      className="endorsement-card__photo"
                      src={e.photo}
                      alt={`Portrait of ${e.name}`}
                      loading="lazy"
                      width={112}
                      height={112}
                    />
                    <div className="endorsement-card__text">
                      <h3 className="endorsement-card__name">{e.name}</h3>
                      <p className="endorsement-card__role">{e.role}</p>
                      <p className="endorsement-card__riding">{e.riding}</p>
                    </div>
                  </div>
                  {e.quote && (
                    <blockquote className="endorsement-card__quote">
                      {e.quote.map((paragraph) => (
                        <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                      ))}
                    </blockquote>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="photo-carousel" aria-label="Dorit in the community">
          <div className="photo-carousel__inner">
            <p className="t-eyebrow photo-carousel__eyebrow">On the Campaign Trail</p>
            <h2 className="photo-carousel__heading t-section">Out in the Community</h2>
          </div>
          <PhotoCarousel photos={COMMUNITY_PHOTOS} />
        </section>

        <section id="hero-join-section" className="mobile-join">
          <JoinForm id="mobile-join-form" source="homepage-mobile" />
        </section>
      </main>
      <Footer />
    </div>
  );
}
