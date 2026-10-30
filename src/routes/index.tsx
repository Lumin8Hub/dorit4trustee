import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpenCheck, CalendarDays, Mail, School } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PriorityCard } from "@/components/PriorityCard";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { PRIORITIES } from "@/data/priorities";
import { ELEMENTARY, SECONDARY } from "@/data/schools";
import { ELECTION_RESULT, SITE } from "@/data/site";
import { UPDATES, formatDate } from "@/data/updates";
import { COMMUNITY_PHOTOS } from "@/data/communityPhotos";

const OG_IMAGE = "https://dorit4trustee.com/images/hero-desktop.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dorit Smali | YRDSB Trustee, King & Vaughan Ward 1" },
      {
        name: "description",
        content:
          "Dorit Smali is the York Region District School Board trustee for King Township and Vaughan Ward 1. Schools, board updates, commitments and how to reach her.",
      },
      { property: "og:title", content: "Dorit Smali, YRDSB Trustee" },
      {
        property: "og:description",
        content: "Working for our kids in King Township and Vaughan Ward 1.",
      },
      { property: "og:image", content: OG_IMAGE },
    ],
  }),
  component: HomePage,
});

const QUICK_LINKS = [
  { icon: Mail, label: "Contact Dorit", text: "Questions, concerns and invitations.", to: "/contact" },
  {
    icon: School,
    label: "Our Schools",
    text: `${ELEMENTARY.length} elementary and ${SECONDARY.length} secondary schools.`,
    to: "/schools",
  },
  {
    icon: CalendarDays,
    label: "The Board & You",
    text: "Meetings, committees and how to have your say.",
    to: "/the-board",
  },
  {
    icon: BookOpenCheck,
    label: "Board Updates",
    text: "What the board decided and what it means for your child.",
    to: "/updates",
  },
] as const;

function HomePage() {
  const latest = UPDATES.slice(0, 3);
  return (
    <div className="page">
      <Header variant="overlay" />
      <main>
        <section className="hero">
          <div className="hero__scrim" aria-hidden="true" />
          <div className="hero__inner">
            <div className="hero__panel">
              <div className="hero__copy">
                <h1 className="hero__title">
                  <span className="t-eyebrow hero__eyebrow">
                    YRDSB Trustee · {SITE.areaShort}
                  </span>{" "}
                  <span className="hero__headline">
                    Working for Our Kids
                    <span className="hero__underline" aria-hidden="true" />
                  </span>
                </h1>
                <p className="hero__subtitle">Back to Basics. Back to Learning.</p>
                <p className="hero__kicker">
                  Dorit Smali, your public school trustee for King Township and Vaughan Ward 1
                </p>
              </div>
              <div className="hero__ctas">
                <Link to="/contact" className="btn btn--mustard">
                  Contact Dorit
                </Link>
                <Link to="/schools" className="btn btn--turquoise">
                  Find Your School
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="letter" aria-labelledby="letter-title">
          <div className="container letter__inner">
            <img
              src="/images/dorit-portrait.webp"
              className="letter__portrait"
              alt="Portrait of Dorit Smali"
              loading="lazy"
            />
            <div className="letter__body">
              <p className="t-eyebrow">A Letter to Residents</p>
              <h2 id="letter-title" className="section-heading">
                Dear Neighbours,
                <span className="accent-bar" aria-hidden="true" />
              </h2>
              <p>
                Thank you. On October 26, families across King Township and Vaughan Ward 1 elected
                me as your York Region District School Board trustee, with{" "}
                {ELECTION_RESULT.votes.toLocaleString("en-CA")} votes (
                <a href={ELECTION_RESULT.certificateUrl}>certified results</a>). I am honoured by
                your trust, and I take the responsibility seriously.
              </p>
              <p>
                To everyone who voted, whoever you supported: I work for every family in our ward.
                That includes the parents I met at your doors, at markets and community events in
                King and Vaughan, and the ones I haven't met yet.
              </p>
              <p>
                I made five commitments: excellence through merit, unity and equality, keeping
                politics out of the classroom, real support for special education, and safe
                schools. This website tracks each one, and I will report back on what the board
                decides and how I vote.
              </p>
              <p>
                My term begins on {SITE.termStart}. I look forward to working with families,
                teachers and staff in all {ELEMENTARY.length + SECONDARY.length} of our schools.
              </p>
              <p className="letter__signoff">
                Sincerely,
                <span className="letter__signature">Dorit Smali</span>
              </p>
              <p className="letter__ps">
                P.S. This is my personal website. For YRDSB matters, see the{" "}
                <Link to="/contact">Contact page</Link> for how to reach me.
              </p>
            </div>
          </div>
        </section>

        <section className="quick-links" aria-label="Quick links">
          <div className="container quick-links__grid">
            {QUICK_LINKS.map((q) => {
              const Icon = q.icon;
              return (
                <Link key={q.to} to={q.to} className="quick-link">
                  <Icon size={28} strokeWidth={1.75} aria-hidden="true" />
                  <span className="quick-link__label">{q.label}</span>
                  <span className="quick-link__text">{q.text}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <section id="commitments" className="priorities--home" aria-labelledby="commitments-title">
          <div className="priorities__inner">
            <p className="t-eyebrow priorities__eyebrow">My Commitments</p>
            <h2 id="commitments-title" className="priorities__heading t-section">
              Five Promises. Tracked in Public.
            </h2>
            <p className="priorities__intro">
              I am one of 12 elected trustees, so I can't deliver any of these alone. Here is where
              each one stands.
            </p>
            <div className="promises-grid">
              {PRIORITIES.map((p, i) => (
                <PriorityCard key={p.id} priority={p} number={i + 1} />
              ))}
              <aside className="promise-card promise-card--cta">
                <h3 className="promise-card__title">See the Progress</h3>
                <p className="promise-card__body">
                  Each commitment has a status, a record of what has happened, and the next
                  decision to watch.
                </p>
                <Link to="/commitments" className="btn btn--mustard promise-card__cta">
                  Track My Commitments
                </Link>
              </aside>
            </div>
          </div>
        </section>

        <section className="home-updates" aria-labelledby="updates-title">
          <div className="container">
            <p className="t-eyebrow">Board Updates</p>
            <h2 id="updates-title" className="section-heading">
              Latest from the Board
              <span className="accent-bar" aria-hidden="true" />
            </h2>
            <div className="update-grid">
              {latest.map((u) => (
                <article key={u.slug} className="update-card">
                  <p className="update-card__meta">
                    {u.category} · <time dateTime={u.date}>{formatDate(u.date)}</time>
                  </p>
                  <h3 className="update-card__title">
                    <Link to="/updates/$slug" params={{ slug: u.slug }}>
                      {u.title}
                    </Link>
                  </h3>
                  <p className="update-card__summary">{u.summary}</p>
                </article>
              ))}
            </div>
            <Link to="/updates" className="btn btn--ink">
              All Updates
            </Link>
          </div>
        </section>

        <section className="home-schools" aria-labelledby="schools-title">
          <div className="container home-schools__inner">
            <div>
              <p className="t-eyebrow">Our Schools</p>
              <h2 id="schools-title" className="section-heading">
                {ELEMENTARY.length + SECONDARY.length} Schools. One Community.
                <span className="accent-bar" aria-hidden="true" />
              </h2>
              <p>
                I represent {ELEMENTARY.length} elementary and {SECONDARY.length} secondary YRDSB
                schools across King Township and Vaughan Ward 1, from Schomberg and Nobleton to
                Kleinburg and Maple.
              </p>
              <Link to="/schools" className="btn btn--ink">
                See All Schools and the Ward Map
              </Link>
            </div>
            <img
              src="/images/ward_1_map.webp"
              alt="Map of the King and Vaughan Ward 1 trustee area with school locations"
              className="home-schools__map"
              width={1196}
              height={1550}
              loading="lazy"
            />
          </div>
        </section>

        <section className="photo-carousel" aria-labelledby="community-title">
          <div className="photo-carousel__inner">
            <p className="t-eyebrow photo-carousel__eyebrow">In the Community</p>
            <h2 id="community-title" className="photo-carousel__heading t-section">
              Showing Up for Our Community
            </h2>
          </div>
          <PhotoCarousel photos={COMMUNITY_PHOTOS} />
        </section>

        <section className="support-cta" aria-labelledby="home-cta-title">
          <div className="container support-cta__inner">
            <h2 id="home-cta-title" className="section-heading section-heading--sm">
              Have a Question About Our Schools?
            </h2>
            <p className="support-cta__lede">
              Dorit reads every message. For a classroom concern, start with your child's teacher
              or principal.
            </p>
            <div className="support-cta__buttons">
              <Link to="/contact" className="btn btn--mustard btn--lg">
                Contact Dorit
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
